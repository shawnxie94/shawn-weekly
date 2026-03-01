#!/usr/bin/env python3
"""Generate weekly markdown draft from Lumina list API (base draft only)."""

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
            "User-Agent": "weekly-draft-bot/3.0",
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
    return re.sub(r"\s+", " ", str(value).strip())


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


def render_markdown(
    issue: int,
    title_topic: str,
    grouped: Dict[str, List[Dict[str, str]]],
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
    lines.append("## 开篇（由 weekly-lumina-draft skill 生成）")
    lines.append("<!-- OPENING_START -->")
    lines.append("_待生成：请运行 weekly-lumina-draft skill 填充 500-1000 字开篇内容。_")
    lines.append("<!-- OPENING_END -->")
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
    parser = argparse.ArgumentParser(description="Generate weekly base draft markdown from Lumina list API")
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
    now_cn = datetime.now(SHANGHAI_TZ)

    issue = args.issue if args.issue > 0 else get_next_issue(content_dir)
    year = args.year if args.year > 0 else now_cn.year
    output = Path(args.output).resolve() if args.output else (content_dir / str(year) / f"{issue}.md")

    topic = args.title.strip() if args.title.strip() else suggest_topic(rows)
    markdown = render_markdown(
        issue=issue,
        title_topic=topic,
        grouped=grouped,
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
        "opening_placeholder": True,
        "dry_run": bool(args.dry_run),
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
