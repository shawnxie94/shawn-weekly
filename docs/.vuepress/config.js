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

function getOptimizedImageURL(src) {
  if (typeof src !== 'string') return null

  try {
    const url = new URL(src)
    const isTargetHost = url.hostname === 'cdn.jsdelivr.net'
    const isTargetPath = url.pathname.startsWith('/gh/shawnxie94/images/images/')
    const isTargetFormat = /\.(png|jpe?g)$/i.test(url.pathname)

    if (!isTargetHost || !isTargetPath || !isTargetFormat) return null

    const originPath = `${url.hostname}${url.pathname}`
    return `https://images.weserv.nl/?url=${encodeURIComponent(originPath)}&output=webp&q=78`
  } catch {
    return null
  }
}

function markdownImageOptimizePlugin(md) {
  const defaultImageRenderer = md.renderer.rules.image || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const srcIndex = token.attrIndex('src')

    if (srcIndex >= 0) {
      const src = token.attrs[srcIndex][1]
      const optimized = getOptimizedImageURL(src)

      if (optimized) {
        token.attrs[srcIndex][1] = optimized
        token.attrSet('data-origin-src', src)
        token.attrSet('referrerpolicy', 'no-referrer')
      }
    }

    token.attrSet('decoding', 'async')
    if (token.attrIndex('loading') < 0) token.attrSet('loading', 'lazy')

    return defaultImageRenderer(tokens, idx, options, env, self)
  }
}

export default defineUserConfig({
  shouldPrefetch: false,
  bundler: viteBundler({
    viteOptions: {
      plugins: [articlesReplacePlugin()],
      css: {
        preprocessorOptions: {
          scss: {
            quietDeps: true,
            silenceDeprecations: ['if-function']
          }
        }
      }
    }
  }),
  extendsMarkdown: (md) => {
    md.use(markdownImageOptimizePlugin)
  },
  theme,
  lang: 'zh-CN',
  title: '肖恩技术周刊',
  description: '记录有价值的技术内容',
  head: [
    [
      'link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' }
    ],
    [
      'link', { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' }
    ],
    [
      'link', { rel: 'preconnect', href: 'https://images.weserv.nl' }
    ],
    [
      'link', { rel: 'dns-prefetch', href: 'https://images.weserv.nl' }
    ],
    [
      'link', { rel: 'icon', href: 'https://cdn.jsdelivr.net/gh/shawnxie94/images/images/image-sjql.png' }
    ],
    [
      'meta', { name: 'google-site-verification', content: 'rBr3QpOiV6jhzWBKMvyt2NUZOPlgtVBms1Fmq6u--1s' }
    ],
    [
      'meta', { name: 'msvalidate.01', content: '2F1791A628BF53E1505F40AA9EBF45AD' }
    ],
  ]
})
