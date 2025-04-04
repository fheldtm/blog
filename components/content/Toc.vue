<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

interface TocLink {
  id: string;
  text: string;
  depth: number;
}

const props = defineProps({
  toc: {
    type: Array as () => TocLink[],
    default: () => [],
  },
});

const activeId = ref('');

// 현재 활성화된 섹션을 추적하는 함수
const updateActiveSection = () => {
  const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'));

  // 화면 상단에서 100px 위치에 있는 헤딩이 활성화됨
  const SCROLL_OFFSET = 100;

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const rect = heading.getBoundingClientRect();

    if (rect.top <= SCROLL_OFFSET) {
      activeId.value = heading.id;
      // 만약 다음 헤딩이 뷰포트 위에 있다면 그것이 활성화됨
      if (i < headings.length - 1) {
        const nextHeading = headings[i + 1];
        const nextRect = nextHeading.getBoundingClientRect();
        if (nextRect.top <= SCROLL_OFFSET) {
          continue;
        }
      }
    } else {
      // 첫 번째 헤딩이 아직 상단에 도달하지 않았을 경우 첫 번째 헤딩 활성화
      if (i === 0 && rect.top > SCROLL_OFFSET) {
        activeId.value = heading.id;
      }
      break;
    }
  }
};

// 특정 헤딩으로 스크롤하는 함수
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // 헤더 높이 고려하여 오프셋 적용
      behavior: 'smooth',
    });
  }
};

// TOC 항목의 패딩을 계산하는 함수 (중첩 레벨에 따라)
const getPadding = (depth: number) => {
  return `${depth * 12}px`;
};

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();
});

watch(
  () => props.toc,
  () => {
    updateActiveSection();
  }
);
</script>

<template>
  <div class="toc-container">
    <div class="toc-header">목차</div>
    <ul class="toc-list">
      <li
        v-for="link in toc"
        :key="link.id"
        class="toc-item"
        :class="{
          active: activeId === link.id,
          [`level-${link.depth}`]: true,
        }"
        :style="{ paddingLeft: getPadding(link.depth - 1) }"
      >
        <a
          :href="`#${link.id}`"
          @click.prevent="scrollToHeading(link.id)"
          class="toc-link"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.toc-container {
  position: absolute;
  top: 100px;
  right: 0;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  width: 240px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-left: 3px solid #f0f0f0;
  scrollbar-width: thin;
  margin-right: 20px;
  z-index: 10;
}

.toc-container::-webkit-scrollbar {
  width: 4px;
}

.toc-container::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 4px;
}

.toc-header {
  font-size: 18px;
  font-weight: var(--fw-medium);
  margin-bottom: 15px;
  color: #333;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
  transition: all 0.2s ease;
}

.toc-link {
  color: #666;
  text-decoration: none;
  display: block;
  padding: 4px 0;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.toc-item.active > .toc-link {
  color: #8bc34a;
  font-weight: var(--fw-medium);
}

.toc-link:hover {
  color: #8bc34a;
}

.level-2 {
  font-weight: var(--fw-medium);
}

.level-3,
.level-4,
.level-5,
.level-6 {
  font-size: 13px;
}

@media (max-width: 1280px) {
  .toc-container {
    display: none;
  }
}
</style>
