import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import theme from './theme/index.js'
import fs from 'fs'
import path from 'path'

const articlesData = JSON.stringify(
  JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, './articles.json'),
      'utf-8'
    )
  )
)

function articlesReplacePlugin() {
  return {
    name: 'articles-replace',
    transform(code, id) {
      if (id.includes('RecentArticles.vue')) {
        return code.replace('const articles = __ARTICLES__', `const articles = ${articlesData}`)
      }
      return null
    }
  }
}

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      plugins: [articlesReplacePlugin()],
      css: {
        preprocessorOptions: {
          scss: {
            quietDeps: true
          }
        }
      }
    }
  }),
  theme,
  lang: 'zh-CN',
  title: '肖恩技术周刊',
  description: '记录有价值的技术内容',
  head: [
    [
      'link',{ rel: 'icon', href: 'https://cdn.jsdelivr.net/gh/shawnxie94/images/images/image-sjql.png' }
    ],
    [
      'meta',{ name: 'google-site-verification', content: 'rBr3QpOiV6jhzWBKMvyt2NUZOPlgtVBms1Fmq6u--1s' }
    ],
    [
      'meta',{ name: 'msvalidate.01', content: '2F1791A628BF53E1505F40AA9EBF45AD' }
    ],
    [
      'script',
      { defer: '', src: 'https://cloud.umami.is/script.js' },
    ],
    [
      'script',
      { 'data-website-id': '3b366c06-d035-411e-a013-8efbabbdad43' }
    ]
  ]
})
