---
title: Vue 3 Composition API 완벽 소개
description: Vue 3의 핵심 기능인 Composition API의 기본 개념부터 실전 활용까지 자세히 알아봅니다.
head:
  title: Vue 3 Composition API 완벽 소개 - HaeRik 개발자 블로그
tag:
  - vue
  - vue3
  - composition-api
  - javascript
  - frontend
date: 2025-04-06
category: Vue
---

## Composition API란?

Vue 3에서 가장 큰 변화 중 하나는 바로 **Composition API**의 도입입니다. 이 새로운 API는 Vue 2의 Options API와 함께 사용할 수 있으며, 더 유연하게 코드를 구성하고 재사용할 수 있도록 해줍니다.

Composition API의 핵심 목표는 다음과 같습니다:

1. **코드의 논리적 구성**: 관련된 코드를 함께 그룹화하여 가독성과 유지보수성 향상
2. **코드 재사용성 증가**: 컴포넌트 간에 로직을 쉽게 공유할 수 있는 기능
3. **더 나은 타입스크립트 지원**: 자동 완성과 타입 검사 개선
4. **번들 크기 최적화**: 트리 쉐이킹을 통한 더 작은 번들 크기

## Composition API vs Options API

기존 Vue 2의 Options API에서는 컴포넌트 로직을 `data`, `methods`, `computed` 등의 옵션으로 구성했습니다:

```js
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    },
  },
};
```

반면, Composition API에서는 `setup` 함수 내에서 반응형 상태와 라이프사이클 훅을 정의합니다:

```js
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    // 반응형 상태
    const count = ref(0);

    // 메서드
    function increment() {
      count.value++;
    }

    // 계산된 속성
    const doubleCount = computed(() => count.value * 2);

    // 생명주기 훅
    onMounted(() => {
      console.log('컴포넌트가 마운트되었습니다');
    });

    // 템플릿에서 사용할 수 있도록 반환
    return {
      count,
      increment,
      doubleCount,
    };
  },
};
```

## `<script setup>` 문법

Vue 3.2부터는 `<script setup>` 문법을 사용하면 훨씬 더 간결하게 Composition API를 작성할 수 있습니다:

```vue
<script setup>
import { ref, computed, onMounted } from 'vue';

// 반응형 상태
const count = ref(0);

// 메서드
function increment() {
  count.value++;
}

// 계산된 속성
const doubleCount = computed(() => count.value * 2);

// 생명주기 훅
onMounted(() => {
  console.log('컴포넌트가 마운트되었습니다');
});
</script>

<template>
  <div>
    <p>카운트: {{ count }}</p>
    <p>두 배: {{ doubleCount }}</p>
    <button @click="increment">증가</button>
  </div>
</template>
```

::vue-play{src="https://play.vuejs.org/#eNp9Uk1v00AQ/SujvSSlUYyAU3EioOoBJD4EHPeSOpvg1t617N0QKbIEJEVRCyIVICJITiAQiEMQQSqCXxRv/gOztmNSqepltTvz3sybN9sj14Og2lGMbBE7ckI3kBAxqYI65a4fiFBCD0LWqoAj/EBJ1qyA4LeF4niFGFqh8KGE/NJVyim3LEhmYz09Xo7fgu4/XfYnlDuCRxL5yIGaKVa+uFGgv77Rg0nyGmEtxR3pCg4ud0LmMy7LG9CjHDJqtdPwFNvcRGackxc/B/rZLBlNQD9/qQc/Vq2aQu16bDtvuBJexnK1+noxuACXCiW6P02+HeiPfxcnM1h+OKC8mDNn5lp4JDxW9US7XNJ/5stX35PBi+XhyWL2BJIvQ/1+jo9kNNbvhvrwV3I0TI4+lUyX2By2lZmM9uJDMj/wGpLhC8Buup30gtegrn/Ps1Jb0Ovl5sWxbZnF5JDkeIRuz1LA+sinYLtKSvT0muO5zn6NksJcSur68xRV21aGyURYmQrbKrSRCpERjt1y29W9SHD8KakTlBhnXY+FdwOzt4gSlJK1paTheeLxrTQmQ8Uqq7jziDn7Z8T3oq6JUXIvZBELO4ySIicbYZuhYJPeeXCHdfFeJH3RVB6iz0neZ7gyZTRmsBuKN1H2Gi5VezP97y5vP4x2upLxaDWUEWqQcYqnBL/79jmj/5d7uXol5eHySfwP0P9L1Q=="}
::

`<script setup>`의 장점:

- `return` 문이 필요 없음 (모든 변수가 자동으로 템플릿에 노출됨)
- 더 적은 코드로 동일한 기능 구현
- 더 나은 런타임 성능
- 더 나은 IDE 지원

## 반응형 시스템 이해하기

Vue 3의 Composition API는 두 가지 핵심 반응형 API를 제공합니다:

### 1. ref

`ref`는 어떤 값이든 반응형으로 만들 수 있습니다:

```js
import { ref } from 'vue';

const count = ref(0); // 숫자
const name = ref('Vue'); // 문자열
const isActive = ref(true); // 불리언
const items = ref([]); // 배열
```

`ref`로 만든 값에 접근하거나 수정할 때는 `.value` 속성을 사용합니다:

```js
// 값 읽기
console.log(count.value); // 0

// 값 수정
count.value++;
```

단, 템플릿에서는 `.value` 없이 직접 사용할 수 있습니다:

```vue
<template>
  <div>{{ count }}</div>
  <!-- .value 불필요 -->
</template>
```

### 2. reactive

`reactive`는 객체를 반응형으로 만듭니다:

```js
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  name: 'Vue',
  items: [],
});

// .value 없이 직접 접근 가능
console.log(state.count); // 0

// 직접 수정 가능
state.count++;
```

## Composition API의 주요 함수들

### computed

계산된 속성을 만들 때 사용합니다:

```js
import { ref, computed } from 'vue';

const count = ref(0);
const doubleCount = computed(() => count.value * 2);
```

### watch 및 watchEffect

반응형 데이터 변화를 감시합니다:

```js
import { ref, watch, watchEffect } from 'vue';

const count = ref(0);

// 특정 값 감시
watch(count, (newValue, oldValue) => {
  console.log(`count가 ${oldValue}에서 ${newValue}로 변경되었습니다`);
});

// 효과 기반 감시 (사용된 모든 반응형 데이터 자동 감시)
watchEffect(() => {
  console.log(`현재 count 값: ${count.value}`);
});
```

### 생명주기 훅

컴포넌트 생명주기의 특정 시점에 코드를 실행합니다:

```js
import { onMounted, onUpdated, onUnmounted } from 'vue';

onMounted(() => {
  console.log('컴포넌트가 마운트되었습니다');
});

onUpdated(() => {
  console.log('컴포넌트가 업데이트되었습니다');
});

onUnmounted(() => {
  console.log('컴포넌트가 언마운트되었습니다');
});
```

## Composable 함수로 로직 재사용하기

Composition API의 가장 큰 장점 중 하나는 로직을 재사용 가능한 함수로 추출할 수 있다는 것입니다. 이러한 함수를 'Composable'이라고 합니다:

```js
// useCounter.js
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  const doubleCount = computed(() => count.value * 2);

  return {
    count,
    increment,
    decrement,
    doubleCount,
  };
}
```

이렇게 만든 Composable은 여러 컴포넌트에서 쉽게 재사용할 수 있습니다:

```vue
<script setup>
import { useCounter } from './useCounter';

// 카운터 로직 재사용
const { count, increment, decrement, doubleCount } = useCounter();
</script>

<template>
  <div>
    <p>카운트: {{ count }}</p>
    <p>두 배: {{ doubleCount }}</p>
    <button @click="increment">증가</button>
    <button @click="decrement">감소</button>
  </div>
</template>
```

::vue-play{src="https://play.vuejs.org/#eNp9VE1v00AQ/SurvTSlaYyAU3EioOoBDoAAcdpLak/CtvautR8hUmQJEOKAOJRrBUhcQEg9+NAD/KXG/IfO2s7a6dch0uzsmzdvJm+9oA+zbDCzQHdoqCPFM0M0GJuNmOBpJpUhC2I17EorDCiSk4mSKdkYBG1y4z4TTAQBKf+dlsen/z8WZPnzW/n7PSl/nJQfTsrjP0xEUmjHFbmaPuEiUpCCC2NoQ2n3k5oWOw07jXub2CQMaoWoDQ8G0iwZG8ATIWHMZ1WAYTZqhHz+u0MWTUuS52Hgpmogy69HZFkUFWCtbRe2b42RgjyIEh4dDhn1qhkdlb++nxXvwqDGXFfhh8OKs+Ko/PRlrSIMat1h4KehfWo0bmvCp4MDLQX+MQsHZTSSacYTUM8yw3GbjKL4ui2j4ySRb59UOaMs9Ff56A1Eh1fkD/Tc5Rh9rkCDmgGj/s6M1RRQsLvee/kU5hj7y1TGNkH0DZcvQMvEOo017JEVMcru4Cq1jyt7cTF9pffmBoReDeWEOmRe4RlFd+7eMHor9+7gXlXHRI5bbM2De8QtokHXUkx1LK5g0kejpJk1EHuXY2c0N+LcD+YVdmJF5ER0zckFN3ycvB4nFtC2tzdRHVYQZHSurw04dE3WoOjphpu0tN5jPc/ieJBhMHNFW1tVlRvzcrG32zXF29uXi2uN3Tcw9JvoIc9w1GUgt8idrm6FHwslLjTrr07tM19l2tfuM23nJpdX/DnNzwFFo6Q3"}
::

## 마무리

Vue 3의 Composition API는 대규모 애플리케이션에서 코드를 더 잘 구성하고 재사용할 수 있는 강력한 방법을 제공합니다. Options API에 비해 학습 곡선이.있을 수 있지만, 익숙해지면 더 유연하고 강력한 방식으로 Vue 애플리케이션을 개발할 수 있습니다.

새 프로젝트를 시작한다면 Composition API와 `<script setup>` 문법을 사용하는 것을 강력히 추천합니다. 기존 프로젝트에서는 두 API를 함께 사용할 수도 있으니, 점진적으로 Composition API를 도입해보세요.
