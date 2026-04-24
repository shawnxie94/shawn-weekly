<template>
  <section v-if="shouldRender" class="weekly-closing-card" aria-label="周刊迁移提示卡片">
    <div class="weekly-closing-card__content">
      <p class="weekly-closing-card__eyebrow">迁移提醒</p>
      <h2 class="weekly-closing-card__title">周刊已迁移至 Lumina 回顾</h2>
      <div class="weekly-closing-card__divider" />
      <p class="weekly-closing-card__description">
        本站后续不再更新，欢迎前往新地址查看和订阅后续内容。
      </p>
    </div>

    <div class="weekly-closing-card__links">
      <a :href="reviewsLink" target="_blank" rel="noopener noreferrer">查看 Lumina 回顾</a>
      <a :href="rssLink" target="_blank" rel="noopener noreferrer">订阅新 RSS</a>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { usePageData } from 'vuepress/client'

const WEEKLY_PAGE_RE = /^\/content\/\d{4}\/\d+\.html$/

const reviewsLink = 'https://lumina.shawnxie.top/reviews'
const rssLink = 'https://lumina.shawnxie.top/feed/reviews/rss.xml'

const page = usePageData()

const shouldRender = computed(() => WEEKLY_PAGE_RE.test(page.value.path))
</script>
