# 류마 운세 (Ryuma Fortune)

Vue 3 기반의 운세 / 심리테스트 SPA입니다. 빌드 도구 없이 브라우저 네이티브 ES 모듈만으로 동작합니다.

가볍게 즐기는 킬링타임 콘텐츠가 중심이고, 매장 정보는 하단 "류마" 탭에만 담겨 있습니다.

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
index.html                 페이지 골격 + 루트 템플릿
css/style.css              전체 스타일
js/main.js                 Vue 앱 진입점 · 탭/콘텐츠 라우팅
js/utils.js                공용 유틸 (랜덤 추출, 날짜 기반 로테이션, 시드 해시)
js/components/             재사용 컴포넌트
  ResultCard.js              모든 콘텐츠가 공유하는 결과 카드
  DateWheel.js               스크롤 휠 생년월일 피커
  DrawRunner.js              포맷 A 러너
  QuizRunner.js              포맷 B 러너
  FormRunner.js              포맷 C 러너
js/data/contents/          콘텐츠 정의
  draws.js                   포맷 A — 입력 없이 즉시 뽑기
  quizzes.js                 포맷 B — 질문 후 결과 추천
  profiles.js                포맷 C — 생년월일/이름 입력 후 분석
  index.js                   레지스트리 + 날짜 로테이션
js/data/                   기타 정적 데이터 (별자리·띠, 운세 문구, 메뉴, 한마디)
js/composables/            토스트, 날씨(Open-Meteo)
```

## 콘텐츠 구조

콘텐츠는 3가지 포맷으로 나뉘고, 포맷마다 러너 컴포넌트 하나를 공유합니다.
새 콘텐츠를 추가할 때는 해당 데이터 파일에 객체 하나만 넣으면 되고, 컴포넌트는 건드릴 필요가 없습니다.

| 포맷 | 설명 | 필요한 필드 |
|---|---|---|
| A | 입력 없이 즉시 뽑기 | `draw()` → 결과 페이로드 |
| B | 질문 2~3개 후 결과 추천 | `questions[]`(옵션마다 `to`), `results{}` |
| C | 생년월일·이름 등 입력 후 분석 | `inputs[]`, `build(values)` → 결과 페이로드 |

결과 페이로드는 모든 포맷이 동일하며, `ResultCard`가 존재하는 항목만 렌더링합니다.

```js
{ eyebrow, title, body, quote, sections[], stats[], facts[], chips[], swatch }
```

`inputs[].type` 은 `date`(스크롤 휠 피커) · `text` · `choice`(칩 선택)를 지원합니다.

### 로테이션

`js/utils.js`의 `dayOfYearIndex()` / `rotateByDay()` 를 사용해 날짜가 바뀌면 노출 콘텐츠와 순서가 바뀝니다.

- 홈의 "오늘의 픽": 전체 콘텐츠를 하루에 하나씩 순회
- 각 탭의 목록 순서: 날짜에 따라 회전
- 상단 "오늘의 한마디": 날짜 기반 고정

포맷 C 결과는 `날짜 + 입력값` 을 시드로 계산하므로, 같은 날 같은 생년월일이면 몇 번을 눌러도 결과가 동일합니다.

## 지도

`류마` 탭 지도는 API 키가 필요 없는 구글맵 임베드(`output=embed`)를 사용합니다.
네이버 지도 임베드로 바꾸려면 발급받은 클라이언트 ID가 필요하며, `js/main.js`의 `mapEmbedSrc`를 교체하면 됩니다.
매장 좌표·검색어와 예약 링크도 같은 파일의 `shop` 객체에서 관리합니다.

## 업데이트 내역

- 콘텐츠를 3가지 포맷(즉시 뽑기 / 질문형 / 입력 분석형) 18종으로 확장하고 날짜 기반 로테이션 적용
- 생년월일 입력을 스크롤 휠 피커로 교체
- 결과 화면을 공유용 결과 카드 컴포넌트로 통일
- 매장 지도 placeholder를 실제 지도 임베드로 교체하고 안내 탭 톤 다운
- 파스텔 라이트 테마, 헤더 실시간 날씨(Open-Meteo), 오늘의 한마디 스트립
