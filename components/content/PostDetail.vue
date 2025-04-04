<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
// TOC 컴포넌트는 페이지에서 직접 제공되므로 제거
// import Toc from '~/components/content/Toc.vue';

interface TocItem {
  id: string;
  text: string;
  depth: number;
}

const props = defineProps({
  doc: {
    type: Object,
    required: true,
  },
});

// 목차 관련 로직은 pages/dev/[...slug].vue에서 처리하므로 제거
const toc = ref<TocItem[]>([]);

// 컴포넌트 마운트 후 헤딩 요소에 ID 추가
onMounted(() => {
  nextTick(() => {
    // 헤딩 요소에 ID 추가
    const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id =
          heading.textContent
            ?.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '') || '';
      }
    });
  });
});

// 문서 변경 시 헤딩 요소에 ID 추가
watch(
  () => props.doc,
  () => {
    nextTick(() => {
      // 헤딩 요소에 ID 추가
      const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
      headings.forEach((heading) => {
        if (!heading.id) {
          heading.id =
            heading.textContent
              ?.toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]/g, '') || '';
        }
      });
    });
  }
);
</script>

<template>
  <div class="content-wrapper">
    <div class="post-content">
      <div class="post-header">
        <h1 class="post-title">{{ doc.title }}</h1>
        <p class="post-description">{{ doc.description }}</p>
        <div class="post-meta">
          <div class="post-date">
            {{ new Date(doc.date).toLocaleDateString('ko-KR') }}
          </div>
          <ul class="post-tags">
            <li
              v-for="tag in (doc.tag || '').map((t: string) => t.trim())"
              :key="tag"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>
      <div class="markdown-body">
        <ContentRenderer :value="doc" />
      </div>
    </div>
    <!-- TOC는 부모 컴포넌트에서 제공 -->
  </div>
</template>

<style>
.content-wrapper {
  width: 820px;
  max-width: 100%;
  margin: 0 auto;
}

.post-content {
  width: 100%;
}

.post-header {
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.post-title {
  font-size: 32px;
  font-weight: var(--fw-bold);
  margin: 0 0 16px 0;
  color: #333;
}
.post-description {
  font-size: 18px;
  color: #666;
  margin: 0 0 20px 0;
}
.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post-date {
  font-size: 14px;
  color: #999;
}
.post-tags {
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0;
}
.post-tags li {
  font-size: 12px;
  background-color: #f5f5f5;
  color: #666;
  padding: 4px 12px;
  border-radius: 16px;
  list-style: none;
}
</style>
