---
title: "[node] pkg 라이브러리를 이용하여 웹서버를 exe 파일로 만들어 서비스에 등록해보자."
description: express.js, nestjs 웹 서버를 exe로 만들고 윈도우 서비스에 등록하는 방법을 알아보자.
head: 
  title: "[node] pkg 라이브러리를 이용하여 웹서버를 exe 파일로 만들어 서비스에 등록해보자. - KKaMang"
tag: node, pkg, nestjs, expressjs
date: 2023-10-20
---


# {{ $doc.title }}

## 왜 pkg 인가?

회사에서 기존에는 웹서버를 별도의 서버에 올리기 위해 소스코드를 가지고 가서 node 서버를 실행시키는 방법을 사용했었다.
여태까지 별 문제 없이 잘 사용한 방법이었는데, 이번에 웹서버 파일을 프로그램으로 만들어야 할 일이 생기게 되었다. 아예 이 참에 서버를 실행 파일로 만들어서 올리면 편하고 좋지 않을까 싶어 찾던 중 node 코드를 exe 파일로 만들어주는 pkg 라이브러리를 찾게 되었고 웹서버를 exe 파일로 만드는 과정과 서비스 등록하는 과정을 정리해보려고 한다.

## pkg 라이브러리 사용법

간단하게 hello world를 실행하는 exe 파일을 만들어보자.

먼저 pkg 라이브러리를 global로 설치해보자.

```bash
npm i -g pkg
```

이후 간단하게 npm 프로젝트를 만든다.

```bash
npm init -y
```

`app.js` 파일을 생성해 `hello world`를 출력해주는 파일을 만든다. 완료 후 바로 종료되지 않도록 delay 함수를 만들어 2초 후 종료되게 해준다.

```javascript
(async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  console.log('hello world');
  await delay(1000);
})();
```

이제 이렇게 만든 js 파일을 pkg 라이브러리를 이용해서 exe 파일로 만들어줄 차례이다.

pkg 라이브러리 사용법은 cli 환경에서 설정 값을 지정해주는 방법과 `package.json` 파일에 설정 값을 지정해주는 방법이 있다.
간단하게 사용할 때는 cli 에서 설정하는 것이 편하겠지만, 여러번 사용해야 할 경우 `package.json` 파일에 설정하는 것이 편하다.

```bash
# cli 환경에서 pkg 사용하기
# - nodeRange : (node8), node10, node12, node14, node16 or latest
# - platform  : alpine, linux, linuxstatic, win, macos, (freebsd)
# - arch      : x64, arm64, (armv6, armv7)
# pkg [filename] -t [nodeRange]-[platform]-[arch]
pkg app.js -t node16-win-x64
```

```json
// pacakge.json
{
  "bin": "./app.js"
  "pkg": {
    "targets": ["node16-win-x64"]
  }
}
```

json 설정을 한 뒤에는 `pkg .` 명령어로 설정하면 된다.
자세한 설정 방법은 [pkg github](https://github.com/vercel/pkg)에 가서 보면 자세한 내용이 들어있다.

## 웹서버 생성

### Express.js

`express.js`를 사용하여 간단하게 웹서버를 하나 만들어보자.

먼저 `express.js`를 설치한다.

```bash
npm i express
```

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

코드를 작성하고 서버를 실행한 뒤 http://localhost:3000/ 으로 가보면 서버가 잘 나오는 것을 볼 수 있다.

![이미지](/img/Pasted%20image%2020231020130247.png)

서버가 잘 실행되는걸 알 수 있는데, 이제 이 서버 파일을 exe로 만들 것이다.
위에서 말한 것처럼 package.json을 구성해보자.

```json
{
  "bin": "./server.js"
  "pkg": {
    "targets": ["node16-win-x64"]
  }
}
```

이후 같은 방법으로 exe를 만들어서 실행시키면 웹서버가 실행되는걸 알 수 있다.

---

### NestJS

이번엔 NestJS 프로젝트를 생성해서 NestJS 서버를 exe 파일로 만들어 실행시켜보자.

먼저 NestJS 프로젝트를 하나 만들어보자.

```bash
npm i -g @nestjs/cli
nest new server-pkg
```

프로젝트를 완성하고 src/app.service.ts 를 열어서 Hello World! 를 Hello Nest! 로 바꿔보자
이후 `npm run start`를 하게 되면 NestJS 서버를 구동할 수 있다.(http://localhost:3000/)

![이미지](/img/Pasted%20image%2020231020131249.png)

이제 NestJS 프로젝트를 빌드해보자. `npm run build`를 하여 빌드하게 되면 dist 폴더가 생기고 빌드된 결과물을 볼 수 있다. 빌드가 잘 되었는지 `node ./dist/main.js`를 실행하여 동일하게 웹서버가 실행되는지 확인해보자.

빌드된 파일을 pkg 라이브러리를 사용해 exe로 만들 차례이다.
NestJS 프로젝트의 package.json을 열어서 json의 마지막에 pkg 설정을 해주도록 하자.

```bash
{
  // 기존 package.json 내용
  "bin": "dist/main.js",
  "pkg": {
    "targets": [
      "node16-win-x64"
    ]
  }
}
```

준비가 끝났으면 `pkg .` 명령어를 실행해 NestJS 서버를 exe로 만들어보자.

![이미지](/img/Pasted%20image%2020231020132221.png)

exe를 실행하면 콘솔창이 열리며 서버가 정상적으로 실행되는 것을 확인할 수 있다.

---

### vue, react 등과 함께 사용하기

NestJS를 API 서버로 사용하면서 클라이언트는 vue, react 등의 프레임워크로 만들어서 사용하는 경우가 있다.

NestJS의 [공식 문서](https://docs.nestjs.com/recipes/serve-static)에 가서 보면 어떻게 해야 하는지 잘 나와있는데 공식 문서대로 설정한 후에 우리가 위에서 한 것처럼 package.json 을 설정하게 되면 클라이언트 부분이 포함되지 않은 exe파일이 생성되게 된다.

기본적으로 pkg 는 선택한 파일(package.json 에서 "bin" 에 설정한 파일)에 import 또는 require로 호출하는 경우에는 자동으로 포함시키지만 그렇지 않을 경우에는 포함시키지 않는다.

pkg의 [github 문서](https://github.com/vercel/pkg#config)에 가서 보면 이런 경우 어떻게 해야하는지 알려주는데

> Such cases are not handled by `pkg`. So you must specify the files - scripts and assets - manually in `pkg` property of your `package.json` file.

라고 한다. 즉, 수동으로 package.json 에 포함시켜야 한다는 것인데
`"scripts"` 와 `"assets"` 를 통해 직접 포함시키면 된다.

만약 vue, react 등의 프레임워크에서 프로젝트를 빌드하게 되면 html, css, javascript, 기타 assets 들이 나오게 된다. 이걸 NestJS의 문서에서 말하는 것처럼 NestJS 프로젝트의 최상단에 `client/` 폴더를 만들어 집어 넣게 되는데 이제 이걸 수동으로 package.json 에서 포함시키면 된다는 것이다.

```json
{
  // 기존 package.json 내용
  "bin": "./dist/main.js",
  "pkg": {
    "assets": [
      "client/**/*"
    ],
    "targets": [
      "node16-win-x64"
    ]
  }
}
```

이렇게 assets에 client 폴더의 파일을 전부 포함하겠다고 설정을 하면 exe 파일을 실행했을 때 정상적으로 웹서버가 나오게 된다.

이 외에도 나는 `dotenv`를 사용하기에 `.env` 파일을 포함하기도 하였고, `prisma`를 사용하고 있기에 `prisma/schema.prisma` 파일까지 포함하도록 해두었다.

> `prisma`를 포함시킬 때 조심할 점이 있다.
> `prisma/schema.prisma`만을 포함시키게 되면 정상적으로 작동하지 않는다.
> `node_modules/.prisma/client` 에 있는 `prisma engine`을 포함시켜야 정상적으로 사용할 수 있기에 꼭 포함시키자

결국 pakcage.json 의 모습은 이런 모습이다.

```JSON
{
  // 기존 package.json 내용
  "bin": "./dist/main.js",
  "pkg": {
    "assets": [
      "client/**/*",
      "prisma/**/*",
      ".env",
      "node_modules/.prisma/client/*"
    ],
    "targets": [
      "node16-win-x64"
    ]
  }
}
```

여기서 각각의 사용 환경에 맞게 더해야 할 부분은 더하고 필요 없는 부분은 뺀 뒤 `pkg .` 로 exe 파일을 만들면 클릭 한번으로 웹서버를 구동할 수 있는 exe 파일의 완성이다.

---

## 윈도우 서비스에 등록

구글에 `exe파일 서비스 등록`이라고 검색하면 많은 블로그 글에서 `sc create ...` 명령어를 알려준다.

실제로 해당 명령어를 우리가 만든 웹서버 exe 파일에 적용시키면 서비스가 등록은 된다.
그러나 해당 서비스를 실행하려고 보면 `sc start ...` 를 사용해도, 직접 `services.msc`를 열어서 시작을 해보려고 해도 되지 않는다.

이유를 찾다 찾다가 내 친구 ChatGPT 에게 물어보니 **서비스 시작 완료 신호**를 보내지 않아서 그렇다는 답변을 듣게 되었다.

실제로 서비스 시작을 누르면 `시작하는 중`에서 변하지 않다가 `Timeout`이 나면서 서비스가 중지되는 것을 볼 수 있는데, `시작하는 중`일 때 localhost 서버를 열어보면 정상 작동되는걸 알 수 있다.

이를 해결하기 위해서 여러 방법을 찾아봤는데, 같은 실수를 하지 말라고 실패한 방법을 소개해보려고 한다.
### 삽질 : node-windows 사용

[node-windows](https://www.npmjs.com/package/node-windows)는 node.js 의 라이브러리 중 하나로 node로 만든 파일을 윈도우 서비스에 등록할 수 있도록 도와주는 라이브러리이다.

이전에도 몇 번 node-windows로 서비스 등록을 했던 기억이 있어서 바로 깔아서 pkg를 이용해 exe로 만들어봤는데, 바로 큰 문제가 나타났다.

node-windows는 실행하면 해당 프로젝트의 폴더에 daemon 폴더를 만들고 그 안에 서비스로 등록할 exe 및 기타 파일들을 만들어주는데 pkg로 만든 exe는 별도의 폴더를 갖고 있지 않고 다른 방법을 사용하는데 이 이유로 daemon 폴더를 만들지 못하는 것

node-windows의 github에 찾아가 daemon 폴더의 위치를 변경하는 방법 등을 찾아봤으나 아직 node-windows가 beta 버전이어서 그런건지 제대로 되지 않았고 한참을 삽질하다가 결국 포기하게 되었다.

### 성공 : winsw.exe 사용

위에서 말한 node-windows의 오류를 찾기 위해 `node_modules/` 를 열고 node-windows를 뜯어보기 시작했다. 그러던 중 `winsw.exe`라고 하는 파일을 찾게 되었는데 `winsw.exe`가 바로 서비스를 등록하기 위한 `windows service wrapper` 였다.

`winsw.exe` 외에도 여러가지 `service wrapper`들이 있었지만 cli로 간편하게 사용할 수 있는 점과 가장 먼저 눈에 띄었다는 이유로 `winsw.exe`를 사용하기로 정했다.

`winsw.exe` 설치를 위해 [github](https://github.com/winsw/winsw)에 들어가 최신 버전의 파일을 다운 받고 해당 파일을 통해 서비스에 등록을 해보았다.

서비스 등록 이전에 `winsw.exe`는 `winsw.xml` 파일을 통해 설정을 하게 되는데 자세한 설정 방법은 github의 [XML configuration file](https://github.com/winsw/winsw/blob/v3/docs/xml-config-file.md)에 가서 보면 적혀있다.

간단하게 아래와 같이 xml 을 구성해보자

```xml
<service>
  <id>testNestJS</id>
  <name>testNestJS</name>
  <description>This service is NestJS WEB Server.</description>
  <executable>path\to\your\server.exe</executable>
  <log mode="roll"></log>
</service>
```

xml 설정이 완료가 되면 아래 명령어로 서비스 등록, 실행, ~~중지~~, 삭제를 할 수 있다.
(중지는 되지 않을 수 있다. 이유는 아래에서 설명.)

```bash
.\winsw.exe install
```

![이미지](/img/Pasted%20image%2020231020135906.png)

> **서비스 중지가 안 되는 이유**
> 
> 지금 해당 서비스는 웹서버를 돌리고 있는 상태이다. 때문에 웹서버를 종료하지 않고 서비스 중지를 하려고 하면 영원히 **중지하는 중** 에서 변하지 않고 서비스를 강제로 종료하려고 해도 웹서버는 살아있는 상태가 되어버린다.
> 명령프롬프트를 열어서 `netstat -ano | findstr :3000` 으로 3000번 포트(웹서버 포트)의 PID 값을 찾아서 taskkill 을 해주자
> taskkill로 프로세스를 강제 종료하면 서비스는 중지하지 않아도 중지가 되어있을 것이다.
> 
> *왜 서비스를 종료할 때 웹서버가 안 꺼지는지는 아직 모르겠어서 알고 있는 분이 있다면 꼭 알려주시길..*

이렇게 웹서버를 만들어 exe 파일로 만들고 해당 파일을 서비스에 등록하는 것까지 해보았다.
이후에 NSIS 를 통해 설치파일까지 만드는 중에도 많은 에러가 있었다. 다음에는 우리가 만든 웹서버 exe파일을 설치파일로 만들고 설치 후 자동으로 서비스 등록 및 시작이 되도록, 언인스톨러 실행시 자동으로 서비스가 종료 및 삭제가 되도록 만들어보자