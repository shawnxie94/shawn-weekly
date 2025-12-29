import { defineGiscusConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'
import { h } from 'vue'

defineGiscusConfig({
  repo: 'shawnxie94/shawn-weekly',
  repoId: 'R_kgDOLCv9Sw',
  category: 'Announcements',
  categoryId: 'DIC_kwDOLCv9S84CcihP',
  mapping: 'pathname',
  reactionsEnabled: true,
  emitMetadata: false,
  inputPosition: 'bottom',
  lightTheme: 'light',
  darkTheme: 'dark',
  lang: 'zh-CN'
})
