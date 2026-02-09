import { hopeTheme } from 'vuepress-theme-hope'
import { navbar } from '../navbar'
import { sidebar } from '../sidebar'

const FEED_MAX_ITEMS = 36
const FEED_SUMMARY_LENGTH = 220

function toPlainText(content = '') {
  return String(content)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function createFeedSummary(page) {
  const source = page.frontmatter?.description || page.frontmatter?.summary || page.excerpt || page.title || ''
  const summary = toPlainText(source)

  if (summary.length <= FEED_SUMMARY_LENGTH) return summary

  return `${summary.slice(0, FEED_SUMMARY_LENGTH)}...`
}

export default hopeTheme({
  hostname: 'https://weekly.shawnxie.top',
  logo: 'https://cdn.jsdelivr.net/gh/shawnxie94/images/images/image-sjql.png',
  repo: 'https://github.com/shawnxie94/shawn-weekly',
  editLink: false,
  subSidebar: 'auto',
  contributors: false,
  displayFooter: true,
  navbar,
  sidebar,
  copyright: 'MIT Licensed | Copyright © 2024 - 至今 肖恩技术周刊',
  pageInfo: [
    'Date',
    'ReadingTime',
    'Word'
  ],

  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,
  },

  plugins: {
    blog: {
      excerpt: false,
    },

    // SEO & Sitemap
    seo: true,
    sitemap: true,

    // Feed
    feed: {
      atom: true,
      json: true,
      rss: true,
      count: FEED_MAX_ITEMS,
      filter: (page) => page.path.startsWith('/content/'),
      getter: {
        description: (page) => createFeedSummary(page),
        excerpt: (page) => createFeedSummary(page),
        content: (page) => createFeedSummary(page),
      },
    },

    // Search
    slimsearch: {
      indexContent: true,
      suggestion: false,
      queryHistoryCount: 3,
      resultHistoryCount: 3,
    },

    // PWA
    pwa: {
      favicon: '/favicon.ico',
      cacheHTML: false,
      cachePic: false,
      appendBase: true,
      generateSWConfig: {
        mode: 'development',
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        globIgnores: [
          '**/rss.xml',
          '**/atom.xml',
          '**/feed.json',
          '**/sitemap.xml',
          '**/sitemap.xsl',
          '**/fonts/LXGWWenKaiMono-Medium.ttf',
        ],
      },
      apple: {
        icon: 'https://cdn.jsdelivr.net/gh/shawnxie94/images/images/image-sjql.png',
        statusBarColor: 'black',
      },
      msTile: {
        image: 'https://cdn.jsdelivr.net/gh/shawnxie94/images/images/image-sjql.png',
        color: '#000000',
      },
      manifest: {
        icons: [
          {
            src: 'https://cdn.jsdelivr.net/gh/shawnxie94/images/images/image-sjql.png',
            sizes: '512x512',
            purpose: 'maskable',
            type: 'image/png',
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/shawnxie94/images/images/image-sjql.png',
            sizes: '192x192',
            purpose: 'maskable',
            type: 'image/png',
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/shawnxie94/images/images/image-sjql.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/shawnxie94/images/images/image-sjql.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    },

    comment: {
      provider: 'Giscus',
      repo: 'shawnxie94/shawn-weekly',
      repoId: 'R_kgDOMGLftw',
      category: 'Announcements',
      categoryId: 'DIC_kwDOMGLft84CmWJb',
      mapping: 'pathname',
      reactionsEnabled: true,
      emitMetadata: false,
      inputPosition: 'bottom',
      lightTheme: 'light',
      darkTheme: 'dark',
      lang: 'zh-CN'
    },
  },
})
