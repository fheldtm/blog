<script setup lang="ts">
defineProps({
  path: {
    type: String,
    required: true,
  }
});

const getTag = (_tag: string) => (_tag?.split(',').map((tag: string) => tag.trim()) || []);
const getDate = (_date: Date) => (_date ? new Date(_date).toLocaleDateString('ko-KR') : '');
</script>

<template>
  <main class="board">
    <ContentList :path="path" v-slot="{ list }">
      <RouterLink
        class="board__link"
        v-for="article in list"
        :key="article._path"
        :to="article?._path || ''"
      >
        <h2 class="board__title">{{ article.title }}</h2>
        <p class="board__desc">{{ article.description }}</p>
        <ul class="board__tag">
          <li v-for="tag in getTag(article.tag)" :key="tag">{{ tag }}</li>
        </ul>
        <p class="board__date">{{ getDate(article.date) || '' }}</p>
      </RouterLink>
    </ContentList>
  </main>
</template>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
}
.board__link {
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #f2f2f2;
}
.board__link:hover .board__title {
  color: #777;
}
.board__title {
  font-size: 24px;
  line-height: 1.5;
  font-weight: var(--fw-medium);
  color: #333;
  margin: 0;
  padding: 0;
}
.board__desc {
  margin: 0;
  padding: 0;
}
.board__tag {
  display: flex;
  align-items: center;
  margin: 20px 0 0;
  padding: 0;
}
.board__tag:empty {
  display: none;
}
.board__tag li {
  font-size: 16px;
  line-height: 1.5;
  font-weight: var(--fw-regular);
  color: #333;
  padding: 3px 8px;
  list-style: none;
}
.board__date {
  font-size: 16px;
  width: 100%;
  color: #777;
  font-weight: var(--fw-medium);
  margin: 0;
  padding: 0;
  text-align: right;
}
.board__date:empty {
  display: none;
}
</style>
