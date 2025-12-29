import { defineGiscusConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'
import { h } from 'vue'

defineGiscusConfig({
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
})
