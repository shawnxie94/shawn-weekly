<template>
  <div class="recent-articles">
    <div class="articles-grid">
      <a
        v-for="article in articles"
        :key="article.link"
        :href="article.link"
        class="article-card"
      >
        <div v-if="article.image" class="article-image">
          <img :src="article.image" :alt="article.title" loading="lazy" />
        </div>
        <div class="article-content">
          <div class="article-meta">第{{ article.issue }}期</div>
          <div class="article-title">{{ article.title }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
const articles = [{"year":"2026","issue":"77","link":"/content/2026/77.html","title":"稀缺特质","image":"https://cdn.jsdelivr.net/gh/shawnxie94/images/images/20260104220305489.png"},{"year":"2025","issue":"76","link":"/content/2025/76.html","title":"疯狂的白银","image":"https://cdn.jsdelivr.net/gh/shawnxie94/images/images/20251228231752435.png"},{"year":"2025","issue":"75","link":"/content/2025/75.html","title":"Slop","image":"https://cdn.jsdelivr.net/gh/shawnxie94/images/images/20251221234910348.png"}]
</script>

<style lang="scss" scoped>
.recent-articles {
  margin-top: -1.5rem;
  padding: 0 1rem;

  h2 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .article-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 8px;
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      border-color: var(--theme-color);
    }

    .article-image {
      width: 100%;
      height: 160px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    &:hover .article-image img {
      transform: scale(1.05);
    }

    .article-content {
      padding: 1rem;
    }

    .article-meta {
      font-size: 0.85rem;
      color: var(--text-color);
      opacity: 0.6;
      margin-bottom: 0.5rem;
    }

    .article-title {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-color);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
