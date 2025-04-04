<script setup lang="ts">
useHead({
  title: 'HaeRik',
  meta: [
    {
      name: 'description',
      content: 'HaeRik 개발자 블로그입니다.',
    },
    {
      name: 'keywords',
      // 개발자 블로그 keywords
      content:
        'HaeRik, JavaScript, TypeScript, Vue, Nuxt, Frontend, Developer, Blog',
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
