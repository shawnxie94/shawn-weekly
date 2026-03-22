<template>
  <HopeLayout>
    <template #contentAfter>
      <WeeklyClosingCard />
    </template>
  </HopeLayout>
</template>

<script setup>
import { Layout as HopeLayout } from 'vuepress-theme-hope/client'
import WeeklyClosingCard from './WeeklyClosingCard.vue'
</script>
