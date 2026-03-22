<template>
  <section v-if="shouldRender" class="weekly-closing-card" aria-label="周刊结尾关注卡片">
    <div class="weekly-closing-card__content">
      <p class="weekly-closing-card__eyebrow">感谢阅读</p>
      <h2 class="weekly-closing-card__title">微信公众号「肖恩聊技术」</h2>
      <div class="weekly-closing-card__divider" />
      <p class="weekly-closing-card__description">
        如果这期周刊对你有帮助，欢迎扫码关注，获取每周更新推送。
      </p>
    </div>

    <a
      class="weekly-closing-card__qr-panel no-external-link-icon"
      :href="albumLink"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="打开肖恩技术周刊公众号合集"
    >
      <div class="weekly-closing-card__qr-frame">
        <img
          class="weekly-closing-card__qr-image"
          :src="qrCodeImage"
          alt="肖恩聊技术公众号二维码"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p class="weekly-closing-card__caption">扫码关注公众号</p>
    </a>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { usePageData } from 'vuepress/client'

const WEEKLY_PAGE_RE = /^\/content\/\d{4}\/\d+\.html$/

const albumLink =
  'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwODY0ODQzOQ==&action=getalbum&album_id=3492416248238096386#wechat_redirect'
const qrCodeImage = 'https://cdn.jsdelivr.net/gh/shawnxie94/images/images/20260322212654277.jpg'

const page = usePageData()

const shouldRender = computed(() => WEEKLY_PAGE_RE.test(page.value.path))
</script>
