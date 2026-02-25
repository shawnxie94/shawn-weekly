#!/usr/bin/env python3
"""Generate weekly markdown draft from Lumina list API."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Dict, Iterable, List

SHANGHAI_TZ = timezone(timedelta(hours=8))
DEFAULT_BASE_URL = "https://lumina.shawnxie.top"
DEFAULT_HERO_IMAGE = "https://cdn.jsdelivr.net/gh/shawnxie94/images/images/20241117233731.png"
DEFAULT_DIGEST_DIR = "/home/shawn/.openclaw/workspace/scripts/digest/archive"
DEFAULT_IDEAS_FILE = "/tmp/idea_today.json"

SECTION_ORDER = ["业界资讯", "佳文共赏", "技术博客", "开源项目", "工具推荐", "网站推荐", "资源推荐"]
CATEGORY_MAP = {
    "业界资讯": "业界资讯",
    "佳文共赏": "佳文共赏",
    "技术博客": "技术博客",
    "开源项目": "开源项目",
    "工具推荐": "工具推荐",
    "网站推荐": "网站推荐",
    "资源推荐": "资源推荐",
    "学习资源": "资源推荐",
    "随便看看": "佳文共赏",
    "其他周刊": "佳文共赏",
}


@dataclass
class WeeklyWindow:
    start: datetime
    end: datetime
    label: str


@dataclass
class OpeningSeed:
    topic: str
    source: str
    search_query: str


@dataclass
class OpeningOption:
    topic: str
    source: str
    search_query: str
    body: str
    evidence: List[Dict[str, str]]


def normalize_base_url(base_url: str) -> str:
    value = (base_url or "").strip()
    if not value:
        value = DEFAULT_BASE_URL
    if not value.startswith(("http://", "https://")):
        value = f"https://{value}"
    parsed = urllib.parse.urlparse(value)
    path = parsed.path.rstrip("/")
    if not path:
        path = "/backend"
    if not path.endswith("/backend"):
        path = f"{path}/backend" if path else "/backend"
    normalized = parsed._replace(path=path)
    return urllib.parse.urlunparse(normalized).rstrip("/")


def api_get(base_url: str, token: str, path: str, query: Dict[str, object]) -> Dict[str, object]:
    encoded_query = urllib.parse.urlencode({k: v for k, v in query.items() if v is not None})
    url = f"{base_url}{path}"
    if encoded_query:
        url = f"{url}?{encoded_query}"

    req = urllib.request.Request(
        url,
        headers={
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": "weekly-draft-bot/2.0",
            "X-Internal-Token": token,
        },
        method="GET",
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            payload = resp.read().decode("utf-8")
            return json.loads(payload) if payload else {}
    except urllib.error.HTTPError as err:
        raw = err.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Lumina API HTTP {err.code}: {raw}") from err
    except urllib.error.URLError as err:
        raise RuntimeError(f"Lumina API request failed: {err}") from err


def parse_day(day_str: str) -> datetime:
    return datetime.strptime(day_str, "%Y-%m-%d").replace(tzinfo=SHANGHAI_TZ)


def monday_of(dt: datetime) -> datetime:
    return (dt - timedelta(days=dt.weekday())).replace(hour=0, minute=0, second=0, microsecond=0)


def resolve_window(week_mode: str, start_date: str, end_date: str) -> WeeklyWindow:
    if start_date and end_date:
        start = parse_day(start_date)
        end = parse_day(end_date)
        if end <= start:
            raise ValueError("--end-date must be later than --start-date")
        label = f"{start_date} ~ {(end - timedelta(days=1)).date()}"
        return WeeklyWindow(start=start, end=end, label=label)

    now_cn = datetime.now(SHANGHAI_TZ)
    this_monday = monday_of(now_cn)

    if week_mode == "previous":
        start = this_monday - timedelta(days=7)
        end = this_monday
        label = f"{start.date()} ~ {(end - timedelta(days=1)).date()}"
    else:
        start = this_monday
        end = now_cn
        label = f"{start.date()} ~ {now_cn.date()}"

    return WeeklyWindow(start=start, end=end, label=label)


def fetch_articles(base_url: str, token: str, window: WeeklyWindow, include_hidden: bool) -> List[Dict[str, object]]:
    page = 1
    size = 100
    all_rows: List[Dict[str, object]] = []

    while True:
        query = {
            "page": page,
            "size": size,
            "created_at_start": window.start.isoformat(),
            "created_at_end": window.end.isoformat(),
            "sort_by": "created_at_desc",
        }
        if not include_hidden:
            query["is_visible"] = "true"

        result = api_get(base_url, token, "/api/articles", query)
        rows = result.get("data") or []
        if not isinstance(rows, list):
            rows = []
        all_rows.extend([row for row in rows if isinstance(row, dict)])

        pagination = result.get("pagination") if isinstance(result, dict) else {}
        total_pages = 1
        if isinstance(pagination, dict):
            try:
                total_pages = int(pagination.get("total_pages") or 1)
            except (TypeError, ValueError):
                total_pages = 1

        if page >= total_pages:
            break
        page += 1

    return all_rows


def normalize_url(path_or_url: str, origin: str) -> str:
    if not path_or_url:
        return ""
    if path_or_url.startswith(("http://", "https://")):
        return path_or_url
    if path_or_url.startswith("/"):
        return f"{origin}{path_or_url}"
    return path_or_url


def article_url(slug: str) -> str:
    return f"https://lumina.shawnxie.top/article/{slug}" if slug else ""


def safe_text(value: object) -> str:
    if value is None:
        return ""
    text = str(value).strip()
    return re.sub(r"\s+", " ", text)


def classify_category(raw_name: str) -> str:
    name = safe_text(raw_name)
    if not name:
        return "佳文共赏"
    return CATEGORY_MAP.get(name, "佳文共赏")


def group_articles(rows: Iterable[Dict[str, object]], origin: str, max_per_section: int) -> Dict[str, List[Dict[str, str]]]:
    grouped: Dict[str, List[Dict[str, str]]] = {key: [] for key in SECTION_ORDER}

    for row in rows:
        category = row.get("category") if isinstance(row.get("category"), dict) else {}
        category_name = category.get("name") if isinstance(category, dict) else ""
        section = classify_category(str(category_name or ""))

        slug = safe_text(row.get("slug"))
        title = safe_text(row.get("title")) or "未命名文章"
        summary = safe_text(row.get("summary")) or "（暂无摘要，可后续补充）"
        image = normalize_url(safe_text(row.get("top_image")), origin)
        created_at = safe_text(row.get("created_at"))

        grouped[section].append(
            {
                "title": title,
                "url": article_url(slug),
                "summary": summary,
                "image": image,
                "created_at": created_at,
            }
        )

    for section in SECTION_ORDER:
        grouped[section] = grouped[section][:max_per_section]

    return grouped


def get_next_issue(content_dir: Path) -> int:
    max_issue = 0
    for year_dir in content_dir.iterdir():
        if not year_dir.is_dir() or not year_dir.name.isdigit():
            continue
        for md_file in year_dir.glob("*.md"):
            try:
                issue_num = int(md_file.stem)
            except ValueError:
                continue
            max_issue = max(max_issue, issue_num)
    return max_issue + 1


def short_text(text: str, limit: int = 26) -> str:
    cleaned = re.sub(r"\s+", " ", safe_text(text))
    if len(cleaned) <= limit:
        return cleaned
    return cleaned[: limit - 3].rstrip() + "..."


def suggest_topic(rows: List[Dict[str, object]]) -> str:
    if not rows:
        return "本周技术观察"
    top_title = safe_text(rows[0].get("title"))
    if not top_title:
        return "本周技术观察"
    top_title = re.sub(r"[：:｜|].*", "", top_title).strip()
    if 4 <= len(top_title) <= 18:
        return top_title
    return "本周技术观察"


def _extract_digest_topic(line: str) -> str:
    text = safe_text(line)
    if not text.startswith("- "):
        return ""
    text = text[2:].strip()
    if "链接:" in text:
        return ""
    text = re.sub(r"（[^）]*）$", "", text).strip()
    text = re.sub(r"\([^)]*\)$", "", text).strip()
    text = re.sub(r"[:：].*", "", text).strip()
    return short_text(text, 32)


def load_digest_topics(files: List[Path], max_topics: int = 12) -> List[str]:
    topics: List[str] = []
    for path in files:
        if not path.exists() or not path.is_file():
            continue
        try:
            content = path.read_text(encoding="utf-8")
        except Exception:
            continue
        for line in content.splitlines():
            topic = _extract_digest_topic(line)
            if not topic:
                continue
            if topic not in topics:
                topics.append(topic)
            if len(topics) >= max_topics:
                return topics
    return topics


def _extract_idea_texts(payload: object) -> List[str]:
    if isinstance(payload, list):
        out: List[str] = []
        for item in payload:
            if isinstance(item, str):
                out.append(item)
            elif isinstance(item, dict):
                out.append(safe_text(item.get("text") or item.get("idea") or ""))
        return out

    if isinstance(payload, dict):
        entries = payload.get("entries")
        if isinstance(entries, list):
            out = []
            for item in entries:
                if isinstance(item, dict):
                    out.append(safe_text(item.get("text") or item.get("idea") or ""))
                elif isinstance(item, str):
                    out.append(item)
            return out

        ideas = payload.get("ideas")
        if isinstance(ideas, list):
            return [safe_text(item) for item in ideas if safe_text(item)]

    return []


def load_idea_topics(ideas_file: Path, max_topics: int = 8) -> List[str]:
    if not ideas_file.exists() or not ideas_file.is_file():
        return []

    try:
        data = json.loads(ideas_file.read_text(encoding="utf-8"))
    except Exception:
        return []

    texts = _extract_idea_texts(data)
    topics: List[str] = []
    for text in texts:
        if not text:
            continue
        first_sentence = re.split(r"[。！？\n]", text, maxsplit=1)[0].strip()
        if len(first_sentence) < 6:
            continue
        topic = short_text(first_sentence, 28)
        if topic and topic not in topics:
            topics.append(topic)
        if len(topics) >= max_topics:
            break
    return topics


def load_web_notes(path: Path) -> Dict[str, Dict[str, object]]:
    if not path.exists() or not path.is_file():
        return {}

    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return {}

    raw_topics = []
    if isinstance(data, dict):
        if isinstance(data.get("topics"), list):
            raw_topics = data["topics"]
        elif isinstance(data.get("items"), list):
            raw_topics = data["items"]
    elif isinstance(data, list):
        raw_topics = data

    out: Dict[str, Dict[str, object]] = {}
    for item in raw_topics:
        if not isinstance(item, dict):
            continue
        topic = safe_text(item.get("topic") or item.get("title"))
        if not topic:
            continue
        query = safe_text(item.get("query"))
        snippets_raw = item.get("snippets") or item.get("results") or []
        snippets: List[Dict[str, str]] = []
        if isinstance(snippets_raw, list):
            for row in snippets_raw:
                if not isinstance(row, dict):
                    continue
                title = short_text(safe_text(row.get("title")), 38)
                url = safe_text(row.get("url"))
                snippet = short_text(safe_text(row.get("snippet") or row.get("description") or row.get("text")), 90)
                if title or snippet:
                    snippets.append({"title": title, "url": url, "snippet": snippet})
        out[topic] = {"query": query, "snippets": snippets}
    return out


def resolve_digest_files(explicit_files: List[str], digest_dir: str) -> List[Path]:
    files: List[Path] = []

    for file_path in explicit_files:
        path = Path(file_path).expanduser().resolve()
        if path.exists() and path.is_file():
            files.append(path)

    if files:
        return files

    archive_dir = Path(digest_dir).expanduser()
    if not archive_dir.exists() or not archive_dir.is_dir():
        return []

    md_files = sorted(archive_dir.glob("*.md"), reverse=True)
    return md_files[:3]


def build_opening_seeds(
    grouped: Dict[str, List[Dict[str, str]]],
    digest_topics: List[str],
    idea_topics: List[str],
) -> List[OpeningSeed]:
    seeds: List[OpeningSeed] = []

    def add_seed(topic: str, source: str):
        topic_clean = short_text(topic, 30)
        if not topic_clean:
            return
        if any(seed.topic == topic_clean for seed in seeds):
            return
        query = f"{topic_clean} 2026 技术趋势 影响 分析"
        seeds.append(OpeningSeed(topic=topic_clean, source=source, search_query=query))

    for topic in digest_topics[:3]:
        add_seed(topic, "digest")

    for topic in idea_topics[:3]:
        add_seed(topic, "ideas")

    # Blend one cross-topic seed to encourage deeper opening angle.
    if digest_topics and idea_topics:
        add_seed(f"{short_text(digest_topics[0], 14)} 与 {short_text(idea_topics[0], 14)}", "digest+ideas")

    # Fallback: derive from top weekly article titles.
    ordered = [article for section in SECTION_ORDER for article in grouped.get(section, [])]
    for article in ordered[:3]:
        add_seed(article.get("title", "本周技术观察"), "lumina")

    return seeds[:3]


def _match_web_note(topic: str, web_notes: Dict[str, Dict[str, object]]) -> Dict[str, object]:
    if topic in web_notes:
        return web_notes[topic]

    for key, note in web_notes.items():
        if topic in key or key in topic:
            return note
    return {}


def _compose_evidence_sentence(snippets: List[Dict[str, str]]) -> str:
    picked = [item for item in snippets if item.get("snippet")][:2]
    if not picked:
        return ""
    if len(picked) == 1:
        return f"检索线索显示：{picked[0]['snippet']}"
    return f"检索线索显示：{picked[0]['snippet']}；同时，{picked[1]['snippet']}"


def build_opening_options(
    seeds: List[OpeningSeed],
    web_notes: Dict[str, Dict[str, object]],
    grouped: Dict[str, List[Dict[str, str]]],
) -> List[OpeningOption]:
    options: List[OpeningOption] = []

    # Use one article title as anchor for each opening paragraph.
    ordered_titles = [article.get("title", "") for section in SECTION_ORDER for article in grouped.get(section, [])]
    if not ordered_titles:
        ordered_titles = ["本周重点议题"]

    for idx, seed in enumerate(seeds, start=1):
        note = _match_web_note(seed.topic, web_notes)
        snippets = note.get("snippets") if isinstance(note.get("snippets"), list) else []
        snippets = [row for row in snippets if isinstance(row, dict)]
        evidence_sentence = _compose_evidence_sentence(snippets)
        anchor = short_text(ordered_titles[min(idx - 1, len(ordered_titles) - 1)], 24)

        if seed.source == "digest+ideas":
            source_sentence = "这个主题同时出现在 digest 高优先级条目和我的碎片想法记录里，属于值得持续跟踪的交叉信号。"
        elif seed.source == "ideas":
            source_sentence = "这个主题来自本周碎片想法记录，我想把它和本周资讯交叉验证后再做判断。"
        elif seed.source == "digest":
            source_sentence = "这个主题来自 digest 的高优先级条目，已经体现出连续性趋势，不只是单点热点。"
        else:
            source_sentence = "这个主题来自本周周刊主条目，我会把它作为开篇主线来展开。"

        if evidence_sentence:
            body = (
                f"这周我想从「{seed.topic}」切入，核心原因是它和 {anchor} 这类信号在同一时间窗口内持续共振。"
                f"{evidence_sentence}。"
                "我的判断是，接下来真正拉开差距的不只是模型能力本身，而是把能力稳定嵌入工程流程与业务闭环的速度。"
                "所以这期会重点看哪些变化值得立即跟进，哪些变化还需要继续观察。"
            )
        else:
            body = (
                f"这周我想重点聊「{seed.topic}」。"
                f"{source_sentence}"
                "这期我会围绕‘发生了什么 -> 为什么重要 -> 对实践有什么影响’来展开，尽量把可执行结论说清楚。"
            )

        options.append(
            OpeningOption(
                topic=seed.topic,
                source=seed.source,
                search_query=safe_text(note.get("query") or seed.search_query),
                body=re.sub(r"\s+", " ", body).strip(),
                evidence=snippets[:3],
            )
        )

    return options[:3]


def render_markdown(
    issue: int,
    title_topic: str,
    grouped: Dict[str, List[Dict[str, str]]],
    opening_options: List[OpeningOption],
    date_text: str,
    window_label: str,
) -> str:
    lines: List[str] = []
    lines.append("---")
    lines.append(f"date: {date_text}")
    lines.append("---")
    lines.append(f"# 肖恩技术周刊（第 {issue} 期）：{title_topic}")
    lines.append("> 对周内阅读的技术内容精品（个人向）进行总结。觉得不错可点击上方订阅，第一时间获取更新通知。")
    lines.append("")
    lines.append(f"![]({DEFAULT_HERO_IMAGE})")
    lines.append("")
    lines.append(f"_周数据窗口：{window_label}_")
    lines.append("")
    lines.append("## 开篇备选（基于 digest + 想法记录）")
    lines.append("_说明：以下 3 段为草稿备选。建议选 1 段并按你的语气做最终改写。_")
    lines.append("")

    for idx, option in enumerate(opening_options, start=1):
        lines.append(f"### 备选 {idx}（主题：{option.topic}）")
        lines.append(f"_来源：{option.source} | 检索词：`{option.search_query}`_")
        lines.append(option.body)
        lines.append("")
        if option.evidence:
            lines.append("参考线索：")
            for evidence in option.evidence:
                title = evidence.get("title") or "检索结果"
                url = evidence.get("url") or ""
                snippet = evidence.get("snippet") or ""
                if url:
                    lines.append(f"- [{title}]({url})：{snippet}")
                else:
                    lines.append(f"- {title}：{snippet}")
            lines.append("")

    for section in SECTION_ORDER:
        lines.append(f"## {section}")
        section_items = grouped.get(section, [])
        if not section_items:
            lines.append("_本周该分类暂无可用条目，可手动补充。_")
            lines.append("")
            continue

        for item in section_items:
            lines.append(f"### [{item['title']}]({item['url']})")
            if item.get("image"):
                lines.append(f"![]({item['image']})")
            lines.append("")
            lines.append(item["summary"])
            lines.append("")

    total = sum(len(grouped.get(section, [])) for section in SECTION_ORDER)
    lines.append("## 本周收录统计")
    lines.append(f"- 总计：{total} 篇")
    for section in SECTION_ORDER:
        lines.append(f"- {section}：{len(grouped.get(section, []))} 篇")

    return "\n".join(lines).strip() + "\n"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate weekly draft markdown from Lumina list API")
    parser.add_argument("--repo", default=".", help="Path to shawn-weekly repo")
    parser.add_argument("--base-url", default=os.getenv("LUMINA_BASE_URL", DEFAULT_BASE_URL))
    parser.add_argument("--internal-token", default=os.getenv("INTERNAL_API_TOKEN", ""))
    parser.add_argument("--week-mode", choices=["current", "previous"], default="current")
    parser.add_argument("--start-date", default="", help="Custom range start date, e.g. 2026-02-23")
    parser.add_argument("--end-date", default="", help="Custom range end date (exclusive), e.g. 2026-03-02")
    parser.add_argument("--include-hidden", action="store_true", help="Include is_visible=false articles")
    parser.add_argument("--max-per-section", type=int, default=8)
    parser.add_argument("--year", type=int, default=0, help="Target year folder for output markdown")
    parser.add_argument("--issue", type=int, default=0, help="Explicit issue number; default auto-detect max+1")
    parser.add_argument("--title", default="", help="Weekly title topic override")
    parser.add_argument("--output", default="", help="Custom output markdown file path")
    parser.add_argument("--digest-dir", default=DEFAULT_DIGEST_DIR, help="Digest archive directory")
    parser.add_argument("--digest-file", action="append", default=[], help="Digest markdown file (repeatable)")
    parser.add_argument("--ideas-file", default=DEFAULT_IDEAS_FILE, help="Ideas json file from idea journal")
    parser.add_argument("--opening-web-notes", default="", help="Optional web-search notes json for richer openings")
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if not args.internal_token:
        print("ERROR: missing INTERNAL_API_TOKEN (set env var or pass --internal-token)", file=sys.stderr)
        return 2

    repo = Path(args.repo).resolve()
    content_dir = repo / "docs" / "content"
    if not content_dir.exists():
        print(f"ERROR: content directory not found: {content_dir}", file=sys.stderr)
        return 2

    if args.start_date and not args.end_date:
        print("ERROR: --start-date requires --end-date", file=sys.stderr)
        return 2
    if args.end_date and not args.start_date:
        print("ERROR: --end-date requires --start-date", file=sys.stderr)
        return 2

    try:
        window = resolve_window(args.week_mode, args.start_date, args.end_date)
    except ValueError as err:
        print(f"ERROR: {err}", file=sys.stderr)
        return 2

    base_url = normalize_base_url(args.base_url)
    parsed_base = urllib.parse.urlparse(base_url)
    origin = f"{parsed_base.scheme}://{parsed_base.netloc}"

    try:
        rows = fetch_articles(base_url, args.internal_token, window, args.include_hidden)
    except RuntimeError as err:
        print(f"ERROR: {err}", file=sys.stderr)
        return 1

    grouped = group_articles(rows, origin=origin, max_per_section=max(1, args.max_per_section))
    digest_files = resolve_digest_files(args.digest_file, args.digest_dir)
    digest_topics = load_digest_topics(digest_files)
    idea_topics = load_idea_topics(Path(args.ideas_file).expanduser().resolve()) if args.ideas_file else []
    web_notes = load_web_notes(Path(args.opening_web_notes).expanduser().resolve()) if args.opening_web_notes else {}

    opening_seeds = build_opening_seeds(grouped, digest_topics, idea_topics)
    opening_options = build_opening_options(opening_seeds, web_notes, grouped)

    now_cn = datetime.now(SHANGHAI_TZ)
    issue = args.issue if args.issue > 0 else get_next_issue(content_dir)
    year = args.year if args.year > 0 else now_cn.year
    output = Path(args.output).resolve() if args.output else (content_dir / str(year) / f"{issue}.md")

    topic = args.title.strip() if args.title.strip() else suggest_topic(rows)
    markdown = render_markdown(
        issue=issue,
        title_topic=topic,
        grouped=grouped,
        opening_options=opening_options,
        date_text=now_cn.strftime("%Y-%m-%d"),
        window_label=window.label,
    )

    if not args.dry_run:
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(markdown, encoding="utf-8")

    summary = {
        "ok": True,
        "base_url": base_url,
        "window": {
            "start": window.start.isoformat(),
            "end": window.end.isoformat(),
            "label": window.label,
        },
        "issue": issue,
        "year": year,
        "output": str(output),
        "article_count": len(rows),
        "section_counts": {section: len(grouped.get(section, [])) for section in SECTION_ORDER},
        "digest_files": [str(path) for path in digest_files],
        "digest_topics": digest_topics[:5],
        "idea_topics": idea_topics[:5],
        "opening_plan": [
            {
                "topic": option.topic,
                "source": option.source,
                "search_query": option.search_query,
                "evidence_count": len(option.evidence),
            }
            for option in opening_options
        ],
        "needs_web_notes": bool(opening_options and not any(option.evidence for option in opening_options)),
        "dry_run": bool(args.dry_run),
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
