---
title: 사용하는 vue의 버전과 문법에 관해(vue3, script setup)
description: 앞으로의 vue 글에서 쭉 사용할 vuejs의 버전은 vue2가 아닌 vue3를 사용할 예정.
tag: vue, vue3, html
date: 2023-10-01
---

# 사용하는 vue의 버전과 문법에 관해(vue3, script setup)

앞으로의 vue 글에서 쭉 사용할 vuejs의 버전은 **vue2**가 아닌 **vue3**를 사용할 예정.

vue2는 2023년 12월 31일을 끝으로 지원 종료가 되기에 앞으로의 글은 모두 vue3의 composition api, 그 중에서도 `script setup` 문법으로 작성된 글이 될 예정이다.

아래는 `<script setup>` 문법을 사용한 예시 코드

```vue
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
```

<iframe src="https://play.vuejs.org/#eNp9kUFLwzAUx79KfJcqzA3ZbXQDlYF6UFHBSy6je+sy0yQkL7NQ+t19SVn1ILv1/X//l/7SdnDr3PQYERZQhsorRyIgRbeSRjXOehKd8LgTvdh524iCq4U00lTWBBJNqMUy8cviAbW24tN6vb0orqQpZ8NxfBAPhI3TG0KehCj3N6uuy8t9X854yqkyLpI4Xjd2i3opgbkERuVs3IYJUOBX71Q9PQRr2LpLuxIq2zil0b84UqwmYSEySWzDZt9POSMfcXLKqz1WX//kh9CmTMKrx4D+iBJGRhtfIw14/f6MLT+PkM2j5vYZ+IbB6pgch9pdNFvW/tPLto/52ytTf4R1S2jC6VJJNDX73JfA/+P+zNV/defTed6Tpof+B7x8phs=" frameborder="0" style="width: 100%; height: 400px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16)"></iframe>

`script setup` 방식을 사용하면 기존의 `setup() 훅`을 사용한 코드보다 간결하게 코드를 작성할 수 있다.

위에서 작성한 코드를 같은 방식으로 `setup() 훅`을 사용해서 작성하려면 아래와 같이 작성해야 하는데

```vue
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const msg = ref('Hello World!');

    return {
      msg
    };
  }
}
</script>
```

<iframe src="https://play.vuejs.org/#eNp9UU1Lw0AQ/SvrXNJCbZHealpQKagHFRW87CUkkzR1s7vsRw2E/HdnN6b2UAohzMx7b+bNbAd3Ws8PHmEFqcNGi8zhhkvG0t3NputYYyvW9+mCslitpfaOHa4bVaBYcyCcA0Hp4kRNqc1NrR3FdaOVcaxjBkvWs9KohiU0MLkNPGwjWmCZeUGsMMOi83oyHRLGciWtiz7WocckeUQhFPtSRhRXyTS2CTxDMiNHFQuKIeyJQn8u6UsXf8ZgBs5S67Ku5nurJO0flRxy1ehaoHnVrqbRHFZjTw4ZTf55jjVnPM7Ger7D/PtMfW/bUOPwZtCiOSCHI+YyU6Eb4O3HC7YUH0E6rxfEvgC+o1XCB48D7d7Lgmyf8KLbp3j/Wlafdts6lHZcKhiNh4l8DvQmDxdW/7e7nC/Hg0L/C1UrvOM=" frameborder="0" style="width: 100%; height: 400px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16)"></iframe>

`setup() 훅`을 사용하여 작성하면 `ref`로 만든 `msg` 변수 값을 굳이 굳이 return 값에 넣어야 template에서 사용할 수가 있다.

지금의 코드처럼 변수가 하나면 "이게 뭐 어렵다고" 생각할수가 있겠지만 규모가 커지고, 변수가 많아지고, 사용하는 함수들이 늘어날 때마다 return 에 값을 추가하는건 여간 귀찮은 일이 아닐 수 없다.
또 변수나 함수를 선언해놓고 return 값에 추가하지 않아서 한참을 에러를 찾아서 코드 이곳 저곳을 뒤지는 경험을 해본다면 `setup() 훅` 방식에서 `script setup` 방식으로 넘어간다는건 지극히 자연스러운 현상일 것이다.

앞으로 작성할 모든 vue 코드는 `script setup` 방식을 사용할 예정이며, 실제 코드는 위에서 볼 수 있듯 vue에서 제공하는 `Vue SFC Playground`를 이용하여 보여주려고 한다.