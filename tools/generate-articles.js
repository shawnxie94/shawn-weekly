const fs = require('fs')
const path = require('path')

const contentDir = path.resolve(__dirname, '../docs/content')
const outputFile = path.resolve(__dirname, '../docs/.vuepress/articles.json')
const componentFile = path.resolve(__dirname, '../docs/.vuepress/components/RecentArticles.vue')

const articleMatcher = /(\d+)\/(\d+)\.md$/

function getArticleData(filePath, stats) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const relativePath = path.relative(contentDir, filePath)

  const match = relativePath.match(articleMatcher)
  if (!match) return null

  const year = match[1]
  const issue = match[2]

  let title = `第 ${issue} 期`
  let image = null

  const lines = content.split('\n')
  let inFrontmatter = false
  let afterFrontmatter = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed === '---') {
      if (inFrontmatter) {
        afterFrontmatter = true
      }
      inFrontmatter = !inFrontmatter
      continue
    }

    if (!trimmed || inFrontmatter) continue

    if (trimmed.startsWith('# ')) {
      title = trimmed.slice(2).trim().replace(/^肖恩技术周刊（.*）：/, '')
      continue
    }

    const imageMatch = trimmed.match(/!\[(.*?)\]\((.*?)\)/)
    if (imageMatch) {
      image = imageMatch[2]
      break
    }

    if (!trimmed.startsWith('>') && !trimmed.startsWith('-') && !trimmed.startsWith('*') && !trimmed.startsWith('1.')) {
      break
    }
  }

  return {
    year,
    issue,
    link: `/content/${year}/${issue}.html`,
    title,
    image
  }
}

function generateArticles() {
  if (!fs.existsSync(contentDir)) {
    console.log('Content directory does not exist')
    fs.writeFileSync(outputFile, JSON.stringify([], null, 2))
    return
  }

  const articles = []

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        scanDir(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const stats = fs.statSync(fullPath)
        const article = getArticleData(fullPath, stats)
        if (article) {
          articles.push(article)
        }
      }
    }
  }

  scanDir(contentDir)

  const sorted = articles
    .sort((a, b) => {
      const yearCompare = parseInt(b.year) - parseInt(a.year)
      if (yearCompare !== 0) return yearCompare
      return parseInt(b.issue) - parseInt(a.issue)
    })
    .slice(0, 3)

  fs.writeFileSync(outputFile, JSON.stringify(sorted, null, 2))

  const componentContent = `<template>
  <div class="recent-articles">
    <div class="articles-grid">
      <a
        v-for="article in articles"
        :key="article.link"
        :href="article.link"
        class="article-card"
      >
        <div v-if="article.image" class="article-image">
          <img :src="article.image" :alt="article.title" loading="lazy" />
        </div>
        <div class="article-content">
          <div class="article-meta">第{{ article.issue }}期</div>
          <div class="article-title">{{ article.title }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
const articles = ${JSON.stringify(sorted)}
</script>

<style lang="scss" scoped>
.recent-articles {
  margin-top: -1.5rem;
  padding: 0 1rem;

  h2 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .article-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 8px;
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      border-color: var(--theme-color);
    }

    .article-image {
      width: 100%;
      height: 160px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    &:hover .article-image img {
      transform: scale(1.05);
    }

    .article-content {
      padding: 1rem;
    }

    .article-meta {
      font-size: 0.85rem;
      color: var(--text-color);
      opacity: 0.6;
      margin-bottom: 0.5rem;
    }

    .article-title {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-color);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
`

  fs.writeFileSync(componentFile, componentContent)
  console.log(`Generated ${sorted.length} recent articles to ${outputFile}`)
  console.log(`Updated component file: ${componentFile}`)
}

generateArticles()
