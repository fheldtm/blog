---
title: 깊은 복사와 얕은 복사와 Spread Operator(...object)에 대해 알아보자
description: JavaScript에서 깊은 복사와 얕은 복사의 차이점, 그리고 Spread Operator의 활용법에 대해 알아봅니다.
head:
  title: 깊은 복사와 얕은 복사와 Spread Operator(...object)에 대해 알아보자 - HaeRik 개발자 블로그
tag:
  - javascript
  - typescript
date: 2025-04-06
category: JavaScript
---

# 깊은 복사와 얕은 복사와 Spread Operator(...object)에 대해 알아보자

JavaScript로 코드를 짜다보면 객체의 사용이 매우 빈번하게 발생한다. 우리가 매번 보는 DOM 구조도 Document Object Model 의 약자로 Object 형태이고, JavaScript의 Array도 까보면 객체라는걸 알 수 있다.

![](/img/javascript-deep-shallow-copy-spread-operator-1.png)

Object 형태의 자료 구조를 계속해서 사용하다보면 **얕은 복사**, **깊은 복사** 그리고 **[Spread Operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)** 에 대해서 듣고 사용하게 되는데 오늘 각각 말하는게 무엇인지 알아보도록 하자.

## 깊은 복사

깊은 복사란 말 그대로 깊게 복사하는 것이다. 무슨 말인고 하니 객체의 모든 계층을 그대로 복사해서 새로운 객체에 복사하는 것. for문을 통해 재귀적으로 모든 값들을 일일이 복사하도록 할 수도 있고, JSON.parse(JSON.stringify(obj))을 통해서 JSON 화 시킨 뒤에 다시 object로 바꿔서 모든 key 값과 value 값을 복사하도록 할 수도 있다.

코드를 작성해서 본다면 아래와 같다.

```js
// 깊은 복사
const obj = { a: 1, b: { c: 2 }, d: [3, 4, 5] };
const copy = JSON.parse(JSON.stringify(obj));

// 같은 값인지 확인
console.log(obj === copy); // false
console.log(obj.b === copy.b); // false
console.log(obj.d === copy.d); // false

// copy 값을 변경시켜 obj 값이 변경되는지 확인
copy.b.c = 3;
console.log(copy.b); // { c: 3 }
console.log(obj.b); // { c: 2 }

copy.d[0] = 6;
copy.d[1] = 7;
copy.d[2] = 8;
console.log(copy.d); // [6, 7, 8]
console.log(obj.d); // [3, 4, 5]
```

값이 같은지 확인해 본 결과 객체에 들어있는 값들이 보기에는 같아 보이지만 바라보고 있는 **참조**가 다르기에 false가 나오는 걸 볼 수 있다. 같은 값처럼 보이지만 코드처럼 copy 객체(배열)의 값을 변경한다고 해서 obj의 값이 변경 되거나 하지는 않는다.

쉽게 말하자면 **깊은 복사**를 통해 만들어진 새로운 객체는 기존 원본 객체와는 전혀 다른 새로운 **참조**를 가지고 있다고 생각하면 편하다.

만약 **기존의 값을 변경시키면서도 복사 된 새로운 객체의 값들이 변경되지 않아야 할 때**, 깊은 복사를 사용하면 된다.

## 얕은 복사

얕은 복사는 말 그대로 얕게 한 depth 만 복사되는 것을 말한다. Object.assign({}, obj) 또는 { ...obj }(Spread Operator)를 사용해서 복사하면 된다. 깊은 복사는 모든 값을 복사해서 완전히 새로운 객체를 만드는 것이라면, 얕은 복사는 객체의 **참조**를 공유 한다는 것이 특징이다.

아래 코드를 통해 이해해보자.

```js
// 얕은 복사
const obj = { a: 1, b: { c: 2 }, d: [3, 4, 5] };
const copy = Object.assign({}, obj);
// const copy = { ...obj };

// 같은 값인지 확인
console.log(obj === copy); // false
console.log(obj.b === copy.b); // true
console.log(obj.d === copy.d); // true

// copy 값을 변경시켜 obj 값이 변경되는지 확인
copy.b.c = 3;
console.log(copy.b); // { c: 3 }
console.log(obj.b); // { c: 3 }

copy.d[0] = 6;
copy.d[1] = 7;
copy.d[2] = 8;
console.log(copy.d); // [6, 7, 8]
console.log(obj.d); // [6, 7, 8]
```

결과를 보면 깊은 복사와 명백히 차이가 있다. obj 객체와 copy 객체는 서로 다른 **참조**를 갖고 있기에 false 이지만, 객체 내부의 요소들인 b와 d 값은 같은 **참조**를 갖고 있다는 것을 알 수 있다. 그렇기에 copy.b, copy.d 같은 객체(배열)를 변경하면 obj.b, obj.d 값도 변경되는 것.

그럼 왜 이렇게 되는 걸까?

## 얕은 복사 원리

간단하게 Spread Operator 를 통해서 설명해보도록 하자

```js
const obj = { a: 1, b: { c: 2 }, d: [3, 4, 5] };
const copy = { ...obj };
```

이렇게 생성 된 obj와 copy는 서로 같은 요소들을 가지고 있는 객체이다. 실제로 obj와 copy의 요소들은 같은 **참조**를 갖고 있기에 완전히 같은 값이라고 봐도 무방하다.

그렇지만 obj와 copy는 서로 다른 **참조**를 갖게 되는데 그 이유는 이러하다.

const copy = { ...obj }; 를 할 때 보면 copy는 obj의 **참조**를 그대로 가져오는게 아니다. 먼저 새로운 객체({})를 생성하고, 거기에 Spread Operator 를 통해 obj의 최상위 요소들을 copy의 객체에 넣어주는 것이다. **그렇기에 obj와 copy는 서로 다른 객체이지만, 각 최상위 요소들은 같은 값을 가지게 되는 것.**

그림으로 설명해보면 간단히 아래와 같다.

![](/img/javascript-deep-shallow-copy-spread-operator-2.png)

1. obj 와 copy 객체는 서로 다른 최상위 참조를 가지고 있기에 같은 값이 아님.
2. obj.b 와 obj.d 참조가 copy 객체로 복사 되기에 obj.b === copy.b, obj.d === copy.d 가 true가 된다.

이렇기에 만약 copy의 b 프로퍼티에 새로운 객체를 할당하면 (copy.b = { newC: 3 }), copy는 b에 대해 새로운 참조를 갖게 되므로 obj.b는 변경되지 않는다. 반면에, copy.b.c의 값을 변경하면 (copy.b.c = 3), copy.b와 obj.b는 같은 객체를 참조하고 있기 때문에 두 객체의 b.c 값이 모두 변경되게 된다.

copy에서 값을 바꾸어 obj 객체에 영향을 주고 싶다면 꼭 참조가 같은 copy.b 객체 또는 copy.d 배열에 직접 접근해서 수정을 해야만 obj 객체가 변경됨을 볼 수 있다.

이런 점을 잘 알고 객체를 복사 할 때는 참조를 공유할 것인지 완전히 별도의 객체를 만들어야 하는지 잘 판단해서 사용하도록 하자.

## copy = obj 와 copy = { ...obj } 차이

const copy = obj; 를 하게 되면 무슨 일이 일어날까?

Spread Operator 또는 Object.assign 을 통해서 얕은 복사를 하게 되면 복사되는 copy 객체의 최상위 참조는 obj의 참조와 다르다.

그러나 const copy = obj;는 obj의 참조를 copy에 그대로 복사하는 것이기에

```js
// 복사
const obj = { a: 1, b: { c: 2 }, d: [3, 4, 5] };
const copy = obj;

// 같은 값인지 확인
console.log(obj === copy); // true
console.log(obj.b === copy.b); // true
console.log(obj.d === copy.d); // true
```

위 코드와 같이 완전히 같은 값을 가지게 된다.
