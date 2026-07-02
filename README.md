# 류마 운세 (Ryuma Fortune)

Vue 3 기반의 운세 / 심리테스트 / 매장 안내 SPA입니다. 빌드 도구 없이 브라우저 네이티브 ES 모듈만으로 동작합니다.

## 로컬 실행

`index.html`을 파일(`file://`)로 직접 열면 ES 모듈(import map) 로딩이 CORS로 차단되어 동작하지 않습니다. 반드시 로컬 서버로 열어주세요.

```bash
npx serve .
# 또는
python3 -m http.server 8000
```

이후 `http://localhost:8000` 등으로 접속합니다.

## 배포

정적 파일만으로 구성되어 있어 Vercel, GitHub Pages 등 정적 호스팅에 그대로 올리면 동작합니다.

## 구조

```
index.html            페이지 골격 + 템플릿 마크업
css/style.css          전체 스타일
js/main.js             Vue 앱 진입점
js/utils.js            공용 유틸 함수
js/data/                정적 데이터 (별자리, 운세 문구, 심리테스트 문항, 메뉴)
js/composables/          기능별 Vue 컴포저블 (토스트, 운세, 심리테스트)
```

운세/심리테스트 결과는 현재 `setTimeout`으로 흉내낸 목업이며, 추후 Vercel 서버리스 함수를 통한 실제 AI 연동이 예정되어 있습니다.
