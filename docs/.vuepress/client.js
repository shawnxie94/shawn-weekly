import { defineClientConfig } from 'vuepress/client'
import RecentArticles from './components/RecentArticles.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('RecentArticles', RecentArticles)
  }
})
