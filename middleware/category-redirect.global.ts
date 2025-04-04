import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
  // 이미 새 패턴을 사용하는 경우 무시
  if (to.path.startsWith('/[category]')) {
    return;
  }

  // 기존 카테고리 패턴 확인
  const oldCategories = ['blog', 'python', 'js', 'vue', 'solution'];
  const category = to.path.split('/')[1];

  // 만약 경로가 기존 카테고리 중 하나로 시작하면 리디렉션
  if (oldCategories.includes(category) && to.path.split('/').length > 2) {
    const slug = to.path.substring(category.length + 2); // /category/ 제거
    return navigateTo(`/[category]/${category}/${slug}`, { redirectCode: 301 });
  }
});
