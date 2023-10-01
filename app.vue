<script setup lang="ts">
useHead({
  title: 'KKA-MANG',
  meta: [
    {
      name: 'description',
      content: 'KKaMang 개발자 블로그입니다.'
    },
    {
      name: 'keywords',
      // 개발자 블로그 keywords
      content: 'KKaMang, JavaScript, TypeScript, Vue3'
    }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
