import { defineClientConfig, onContentUpdated } from 'vuepress/client'
import { onMounted } from 'vue'
import RecentArticles from './components/RecentArticles.vue'

const UMAMI_SCRIPT_SRC = 'https://cloud.umami.is/script.js'
const UMAMI_WEBSITE_ID = '3b366c06-d035-411e-a013-8efbabbdad43'
let umamiLoaded = false

function shouldSkipAnalytics() {
  if (typeof window === 'undefined') return true

  const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname)
  const doNotTrackEnabled =
    navigator.doNotTrack === '1' ||
    window.doNotTrack === '1' ||
    navigator.globalPrivacyControl === true

  return isLocalhost || doNotTrackEnabled
}

function loadUmamiScript() {
  if (umamiLoaded || shouldSkipAnalytics()) return

  const existingScript = document.querySelector(`script[data-website-id="${UMAMI_WEBSITE_ID}"]`)
  if (existingScript) {
    umamiLoaded = true
    return
  }

  const inject = () => {
    if (umamiLoaded) return

    const script = document.createElement('script')
    script.defer = true
    script.src = UMAMI_SCRIPT_SRC
    script.setAttribute('data-website-id', UMAMI_WEBSITE_ID)
    document.head.appendChild(script)
    umamiLoaded = true
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => {
      window.setTimeout(inject, 1200)
    }, { timeout: 3000 })
    return
  }

  window.setTimeout(inject, 1800)
}

function bindImageFallback() {
  const images = document.querySelectorAll('img[data-origin-src]')

  images.forEach((img) => {
    if (img.dataset.fallbackBound === '1') return

    img.dataset.fallbackBound = '1'
    img.addEventListener('error', () => {
      const originSrc = img.dataset.originSrc
      if (!originSrc || img.src === originSrc) return

      img.src = originSrc
    }, { once: true })
  })
}

export default defineClientConfig({
  enhance({ app }) {
    app.component('RecentArticles', RecentArticles)
  },
  setup() {
    onMounted(() => {
      loadUmamiScript()
      bindImageFallback()
    })

    onContentUpdated(() => {
      bindImageFallback()
    })
  },
})
