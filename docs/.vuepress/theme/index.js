import { hopeTheme } from 'vuepress-theme-hope'
import { navbar } from '../navbar'
import { sidebar } from '../sidebar'

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
  copyright: "MIT Licensed | Copyright © 2024 - 至今 肖恩技术周刊",
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
    blog: true,

    // SEO & Sitemap
    seo: true,
    sitemap: true,

    // Feed
    feed: {
      atom: true,
      json: true,
      rss: true,
    },

    // Search
    slimsearch: {
      indexContent: true,
      suggestion: true,
    },

    // PWA
    pwa: {
      favicon: '/favicon.ico',
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
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
