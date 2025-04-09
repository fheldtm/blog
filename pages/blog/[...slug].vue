<script setup lang="ts">
// 현재 페이지의 컨텐츠 정보를 가져옵니다
const { data: page } = await useAsyncData('page-data', () =>
  queryContent('/dev').where({ _path: useRoute().path }).findOne()
);

// 페이지 정보를 기반으로 SEO 메타데이터 설정
if (page.value) {
  useHead({
    title: page.value.title,
    meta: [
      {
        name: 'description',
        content: `${page.value.description} - HaeRik`,
      },
    ],
  });
}
</script>

<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <PostDetail :doc="doc" />
    </ContentDoc>
  </main>
</template>
