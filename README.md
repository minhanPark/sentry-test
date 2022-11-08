# Sentry 테스트

## 설치

```bash
npm install --save @sentry/react @sentry/tracing
```

리액트의 경우 위의 두개를 다운로드 한다.

```js
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";

Sentry.init({
  dsn: "dsn링크",
  integrations: [new BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById("root"));
```

설명서를 보니 이렇게 추가해주면 **모든 처리되지 않았던 예외들이 자동으로 센트리에 의해서 캡쳐**된다고 나와있음

**tracesSampleRate**는 성능 모니터링을 위해서 사용되는 부분이므로 production 코드에서는 요금제에 따라서 비율을 조정하거나 끌 필요가 있음.

> 개발모드에서 React는 에러 바운드리 내에서 발견된 오류를 다시 던진다. 이렇게 하면 위의 설정으로 Sentry에 두 번 오류가 보고되지만 프로덕션 빌드에서는 발생하지 않는다.

### 공통 옵션

- **dsn**: SDK에게 어디로 이벤트를 보낼지를 알려준다. 만약 제공되지 않으면 process.env.SENTRY_DSN을 읽을 것이고, 환경변수에도 존재하지 않으면 아무곳에도 이벤트를 보내지 않는다.
- **debug**: 디버그가 활성화되면 sdk는 이벤트 전송에 문제가 있는 경우 유용한 디버깅 정보를 인쇄하려고 합니다. 기본값은 false고, 디버그 모드를 켜도 안전 문제는 발생하지 않지만 일반적으로 프로덕션 환경에서 켜는 것은 권장되지 않습니다.
- **release**: 릴리즈는 환경에 배포된 코드 버전을 나타낸다. 릴리즈에 따라 문제가 해결되었는 또는 쉽게 식별이 가능하다.
- **environment**: 자유 형식이며 기본적으로 설정되지 않음. 기본적으로느 sdk는 SENTRY_ENVIRONMENT를 읽으려고 한다.
- **tunnel**: 터널은 sentry와 애플리케이션 간의 프록시 역할을 하는 http 엔드 포인트를 적으면 된다.
- **denyUrls**: 기본적으로 모든 오류가 전송되는데, sentry로 보내지 않아야 하는 오류 url과 일치하는 문자열 또는 정규식 패턴을 적으면 된다.
- **allowUrls**: sentry에만 보내야하는 오류url과 일치하는 문자열 또는 정규식 패턴의 목록을 적으면 된다. 기본적으로 모든 오류가 전송된다.
- **enabled**: 이 sdk가 sentry에 이벤트를 보내야 하는 지 여부를 지정합니다. 값을 false로 지정해도 sentry를 완전히 비활성화할 수는 없어서, 완전히 비활성화 하려면 환경에 따라 조건부로 Sentry.init을 호출해야합니다.

### Environments

Environment는 프로덕션 또는 스테이징 등 오류가 발생한 위치를 알려준다.  
prod니, dev니 해서 로그의 detail일 달라지는 것들이 있는데 그런것들이 아니라 내가 구분하기 위해서 사용하는 값이 된다. **필터링시 도움**이 됨

### Releases & Health

릴리스는 환경에 배포되는 코드 버전입니다. sentry에 릴리스 정보를 제공하면 다음을 수행할 수 있습니다.

- 새 릴리스에 도입된 문제 및 회귀
- 어떤 커밋이 문제를 일으켰고 누가 책임이 있는 지 예측
- 커밋 메시지에 문제번호를 포함하여 문제해결
- 코드가 배포되면 이메일 알림 수신

### Source Maps

설정하면 소스코드를 원래 형식으로 볼 수 있음
