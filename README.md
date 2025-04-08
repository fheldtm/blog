# HaeRik 개발자 블로그

HaeRik 개발자 블로그는 Nuxt 3를 사용해 만들어진 기술 블로그입니다.

## 주요 기능

- Markdown 기반의 블로그 글 작성
- 코드 하이라이팅 (Nord 테마)
- 카테고리별 콘텐츠 구성 (Vue, Python, Solution 등)
- 반응형 웹 디자인
- SEO 최적화

## 폴더 구조

```
blog/
├── assets/           # CSS 및 정적 자산
├── components/       # Vue 컴포넌트
├── content/          # 블로그 글 (Markdown)
│   └── dev/          # 개발 관련 글
├── layouts/          # 페이지 레이아웃
├── pages/            # 라우팅 페이지
└── public/           # 정적 파일
```

## 설치 및 실행

### 의존성 설치

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

### 개발 서버 실행

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

### 프로덕션 빌드

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

### 빌드 결과 미리보기

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

## 글 작성 방법

`content/` 폴더 내에 카테고리별로 Markdown 파일을 추가하여 새 글을 작성할 수 있습니다.

각 Markdown 파일은 다음 형식의 frontmatter를 포함해야 합니다:

```markdown
---
title: 제목
description: 설명
head:
  title: 페이지 제목
tag:
  - 태그1
  - 태그2
date: YYYY-MM-DD
thumbnail: /img/경로.png
category: 카테고리
---

본문 내용...
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
