<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  path: {
    type: String,
    required: true,
  },
});

// 필터링된 태그 상태 관리
const filteredTags = ref<string[]>([]);

// 태그 문자열을 배열로 변환하는 헬퍼 함수
const getTag = (_tag: string | string[] | undefined | null) => {
  if (!_tag) return [];
  if (typeof _tag === 'string') {
    return _tag.split(',').map((tag: string) => tag.trim());
  }
  return _tag.map((tag: string) => tag.trim());
};

// 날짜 포맷팅 헬퍼 함수
const getDate = (_date: Date) =>
  _date ? new Date(_date).toLocaleDateString('ko-KR') : '';

// 태그 필터 처리 함수
const handleTagFilter = (tags: string[]) => {
  filteredTags.value = tags;
};

// 글이 선택된 태그를 포함하는지 확인
const articleContainsTag = (article: any) => {
  if (!filteredTags.value.length) return true;

  const articleTags = getTag(article.tag);
  return filteredTags.value.some((tag) => articleTags.includes(tag));
};
</script>

<template>
  <main class="board">
    <!-- Banner 컴포넌트는 외부에서 제공됨 -->

    <!-- 태그 필터 컴포넌트 -->
    <TagFilter :path="path" @filter="handleTagFilter" />

    <ContentList :path="path" v-slot="{ list }">
      <div class="board__items">
        <div
          class="board__item"
          v-for="article in list.filter(articleContainsTag)"
          :key="article._path"
        >
          <NuxtLink class="board__link" :to="article?._path || ''">
            <div class="board__image">
              <img
                :src="article.thumbnail || '/images/default-thumbnail.svg'"
                alt="썸네일"
              />
            </div>
            <div class="board__content">
              <div class="board__meta">
                <div class="board__category">
                  {{
                    article.category ||
                    path.split('/')[1]?.toUpperCase() ||
                    'TECH'
                  }}
                </div>
                <div class="board__date">{{ getDate(article.date) || '' }}</div>
              </div>
              <h2 class="board__title">{{ article.title }}</h2>
              <p class="board__desc">{{ article.description }}</p>
              <ul class="board__tag">
                <li v-for="tag in getTag(article.tag)" :key="tag">{{ tag }}</li>
              </ul>
            </div>
          </NuxtLink>
        </div>
      </div>
    </ContentList>
  </main>
</template>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  padding: 20px 0 100px;
}
.board__items {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.board__item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  background-color: #fff;
}
.board__item:hover {
  transform: translateY(-4px);
}
.board__link {
  display: flex;
  text-decoration: none;
  color: inherit;
}
.board__image {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
}
.board__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.board__content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.board__meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}
.board__category {
  color: var(--c-primary);
  font-weight: var(--fw-bold);
}
.board__date {
  color: var(--c-text-light);
}
.board__title {
  font-size: 18px;
  font-weight: var(--fw-medium);
  line-height: 1.4;
  margin: 0 0 10px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
}
.board__desc {
  flex-grow: 1;
  font-size: 14px;
  line-height: 1.6;
  color: var(--c-text-light);
  margin: 0 0 15px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
}
.board__tag {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.board__tag li {
  background-color: var(--c-bg-light);
  color: var(--c-text-light);
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .board {
    padding: 10px 0 50px;
  }
  .board__link {
    flex-direction: column;
  }
  .board__item:hover {
    transform: translateY(0);
  }
  .board__image {
    width: 100%;
    height: 180px;
  }
  .board__content {
    padding: 15px;
  }
  .board__title {
    font-size: 16px;
    margin-bottom: 8px;
  }
  .board__desc {
    margin-bottom: 12px;
    font-size: 13px;
  }
  .board__tag li {
    font-size: 11px;
    padding: 2px 6px;
  }
}
</style>
