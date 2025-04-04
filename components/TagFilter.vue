<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['filter']);

// 선택된 태그 상태 관리
const selectedTags = ref<string[]>([]);

// 모든 태그 목록과 각 태그 카운트
const allTags = ref<{ tag: string; count: number }[]>([]);
const isLoading = ref(true);
const isExpanded = ref(false);

// 태그 선택 토글 함수
const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
  emit('filter', selectedTags.value);
};

// 태그 목록 정렬: 카운트 내림차순, 같은 카운트는 알파벳 순
const sortedTags = computed(() => {
  return [...allTags.value].sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    return a.tag.localeCompare(b.tag);
  });
});

// 처음 보여줄 태그 개수 제한
const visibleTags = computed(() => {
  return isExpanded.value ? sortedTags.value : sortedTags.value.slice(0, 12);
});

// 더 보여줄 태그가 있는지 확인
const hasMoreTags = computed(() => {
  return sortedTags.value.length > 12;
});

// 확장 상태 토글
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

// 모든 필터 초기화
const clearAllFilters = () => {
  selectedTags.value = [];
  emit('filter', []);
};

// 태그 추출 및 카운트 헬퍼 함수
const getTagsFromArticle = (article: any) => {
  const tagString = article.tag as string | string[];
  if (!tagString) return [];
  if (typeof tagString === 'string') {
    return tagString.split(',').map((tag: string) => tag.trim());
  }
  return tagString.map((tag: string) => tag.trim());
};

// 콘텐츠에서 모든 태그 목록 추출 및 계산
const extractAllTags = (contentList: any[]) => {
  const tagCounts = new Map<string, number>();

  contentList.forEach((article) => {
    const tags = getTagsFromArticle(article);
    tags.forEach((tag: string) => {
      if (tag) {
        const currentCount = tagCounts.get(tag) || 0;
        tagCounts.set(tag, currentCount + 1);
      }
    });
  });

  return Array.from(tagCounts.entries()).map(([tag, count]) => ({
    tag,
    count,
  }));
};

// 처음 한 번만 모든 태그 추출
const updateAllTags = (list: any[]) => {
  if (list?.length && allTags.value.length === 0) {
    allTags.value = extractAllTags(list);
  }
  isLoading.value = false;
};
</script>

<template>
  <ContentList :path="path" v-slot="{ list }" v-if="isLoading">
    <div v-if="list?.length" style="display: none">
      {{ updateAllTags(list) }}
    </div>
  </ContentList>

  <div class="tag-filter">
    <div class="tag-filter__header" @click="toggleExpand">
      <div class="tag-filter__title-wrapper">
        <h3 class="tag-filter__title">태그 필터</h3>
        <div class="tag-filter__count" v-if="selectedTags.length > 0">
          {{ selectedTags.length }}개 선택됨
        </div>
      </div>

      <div class="tag-filter__actions">
        <button
          v-if="selectedTags.length > 0"
          class="tag-filter__clear"
          @click.stop="clearAllFilters"
        >
          초기화
        </button>
        <div class="tag-filter__toggle">
          <svg viewBox="0 0 24 24" :class="{ 'is-expanded': isExpanded }">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="tag-filter__tags" v-show="isExpanded">
      <div
        v-for="tagItem in visibleTags"
        :key="tagItem.tag"
        class="tag-filter__tag"
        :class="{ 'is-active': selectedTags.includes(tagItem.tag) }"
        @click="toggleTag(tagItem.tag)"
      >
        <span class="tag-filter__tag-name">{{ tagItem.tag }}</span>
        <span class="tag-filter__tag-count">{{ tagItem.count }}</span>
      </div>

      <button
        v-if="hasMoreTags && !isExpanded"
        class="tag-filter__more"
        @click.stop="toggleExpand"
      >
        더 보기
      </button>
    </div>

    <div class="tag-filter__selected" v-if="selectedTags.length > 0">
      <div
        v-for="tag in selectedTags"
        :key="tag"
        class="tag-filter__selected-tag"
      >
        <span>{{ tag }}</span>
        <button class="tag-filter__remove" @click.stop="toggleTag(tag)">
          <svg viewBox="0 0 24 24">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag-filter {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.tag-filter__header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid transparent;
}

.tag-filter__header:hover {
  background-color: #f9f9f9;
}

.tag-filter__title-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tag-filter__title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #222;
}

.tag-filter__count {
  font-size: 12px;
  color: #666;
  background-color: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
}

.tag-filter__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tag-filter__clear {
  font-size: 12px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.tag-filter__clear:hover {
  background-color: #f0f0f0;
  color: #333;
}

.tag-filter__toggle {
  display: flex;
  align-items: center;
}

.tag-filter__toggle svg {
  width: 20px;
  height: 20px;
  fill: #999;
  transition: transform 0.3s ease;
}

.tag-filter__toggle svg.is-expanded {
  transform: rotate(180deg);
}

.tag-filter__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  max-height: 400px;
  overflow-y: auto;
}

.tag-filter__tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  background-color: #f5f5f5;
  color: #555;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1;
  border: 1px solid transparent;
}

.tag-filter__tag:hover {
  background-color: #eee;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tag-filter__tag.is-active {
  background-color: #ebf6df;
  color: #689f38;
  font-weight: 500;
  border-color: #c5e1a5;
}

.tag-filter__tag-name {
  white-space: nowrap;
  padding-bottom: 2px;
}

.tag-filter__tag-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.06);
  color: inherit;
  border-radius: 10px;
  min-width: 20px;
  height: 20px;
  font-size: 11px;
  padding: 0 6px;
}

.tag-filter__tag.is-active .tag-filter__tag-count {
  background-color: rgba(104, 159, 56, 0.15);
}

.tag-filter__more {
  background: none;
  border: 1px dashed #ddd;
  color: #888;
  padding: 6px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.tag-filter__more:hover {
  background-color: #f8f8f8;
  color: #555;
}

.tag-filter__selected {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
  background-color: #fafafa;
}

.tag-filter__selected-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: #ebf6df;
  color: #689f38;
  font-size: 12px;
  padding: 4px 8px 4px 12px;
  border-radius: 16px;
  line-height: 1;
  border: 1px solid #c5e1a5;
  font-weight: 500;
}

.tag-filter__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: #689f38;
}

.tag-filter__remove svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

@media (max-width: 768px) {
  .tag-filter {
    border-radius: 10px;
  }

  .tag-filter__header {
    padding: 14px 16px;
  }

  .tag-filter__tags {
    padding: 12px 16px;
    gap: 6px;
  }

  .tag-filter__tag {
    font-size: 12px;
    padding: 5px 10px;
  }

  .tag-filter__selected {
    padding: 10px 16px;
  }
}
</style>
