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

  plugins: {
    feed: true,
    slimsearch: {
      indexContent: true,
      suggestion: true,
      locales: {
        '/': {
          placeholder: '搜索',
        }
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
