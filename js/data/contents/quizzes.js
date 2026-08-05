/* ============================================================
 * 포맷 B — 몇 번의 질문 후 결과 추천형
 * questions[].options[].to 가 가리키는 결과 키를 집계해 최다 득표 결과를 노출한다.
 * results[key] 는 ResultCard 페이로드.
 * ========================================================== */

export const QUIZ_CONTENTS = [
  {
    id: 'psych-daily',
    format: 'B',
    emoji: '🧠',
    title: '오늘의 심리테스트',
    tagline: '세 가지 질문으로 알아보는 지금의 나.',
    questions: [
      {
        text: '갑자기 주어진 자유로운 하루, 당신의 선택은?',
        options: [
          { label: '아무 계획 없이 발길 닿는 대로 걷는다', to: 'free' },
          { label: '미리 짜둔 버킷리스트를 하나씩 실행한다', to: 'plan' },
          { label: '집에서 좋아하는 영화를 보며 푹 쉰다', to: 'calm' },
        ],
      },
      {
        text: '친구들과의 모임에서 당신은 주로 어떤 역할인가요?',
        options: [
          { label: '분위기를 띄우는 분위기 메이커', to: 'free' },
          { label: '약속과 계획을 정리하는 총무 역할', to: 'plan' },
          { label: '조용히 듣고 필요할 때 조언하는 사람', to: 'calm' },
        ],
      },
      {
        text: '스트레스를 받았을 때 가장 먼저 하는 행동은?',
        options: [
          { label: '일단 밖으로 나가 몸을 움직인다', to: 'free' },
          { label: '원인을 정리하고 해결 순서를 짠다', to: 'plan' },
          { label: '혼자 조용한 공간에서 생각을 정리한다', to: 'calm' },
        ],
      },
    ],
    results: {
      free: {
        eyebrow: '심리테스트 결과',
        title: '자유로운 영혼, 즉흥의 달인',
        body: '틀에 갇히지 않고 순간의 감정을 따라가는 자유로운 성향이에요. 예상치 못한 상황에서도 유연하게 대처하는 능력이 뛰어나고, 새로운 경험 앞에서 망설임이 적은 편입니다. 다만 에너지를 다 쓰고 나면 회복 시간도 꼭 챙겨주세요.',
        chips: ['즉흥적', '자유로움', '모험가'],
      },
      plan: {
        eyebrow: '심리테스트 결과',
        title: '계획형 성취주의자',
        body: '목표를 세우고 차근차근 이뤄나가는 데서 큰 만족을 느끼는 타입이에요. 체계적인 사고방식 덕분에 효율이 높지만, 가끔은 계획에서 벗어난 변화를 그대로 받아들이는 연습도 도움이 됩니다.',
        chips: ['계획적', '성취지향', '체계적'],
      },
      calm: {
        eyebrow: '심리테스트 결과',
        title: '안정을 추구하는 힐링형',
        body: '바쁜 일상 속에서도 자신만의 휴식 시간을 소중히 여기는 타입입니다. 내적 안정감을 중요하게 생각하고, 혼자만의 시간을 통해 에너지를 충전해요. 당신의 차분함이 주변 사람에게도 안정감을 줍니다.',
        chips: ['안정추구', '내향적', '힐링'],
      },
    },
  },

  {
    id: 'food',
    format: 'B',
    emoji: '🍽️',
    title: '오늘 뭐 먹지',
    tagline: '고민만 30분 하는 당신을 위한 두 가지 질문.',
    questions: [
      {
        text: '지금 컨디션은 어느 쪽에 가까운가요?',
        options: [
          { label: '기운 없음. 뜨끈한 게 필요해', to: 'warm' },
          { label: '스트레스 만땅. 자극이 필요해', to: 'spicy' },
          { label: '무난하게. 속 편한 게 좋아', to: 'light' },
        ],
      },
      {
        text: '오늘 같이 먹는 사람은?',
        options: [
          { label: '혼자 조용히', to: 'light' },
          { label: '친한 친구 한두 명', to: 'spicy' },
          { label: '여럿이 왁자지껄', to: 'warm' },
        ],
      },
    ],
    results: {
      warm: {
        eyebrow: '오늘의 메뉴 추천',
        title: '뜨끈한 국물 or 불판 앞',
        body: '오늘은 온기가 필요한 날이에요. 김이 올라오는 국물 요리나 다 같이 둘러앉는 구이류가 잘 맞습니다. 먹고 나면 기분까지 풀릴 거예요.',
        facts: [
          { icon: '🍲', label: '추천 1', value: '국밥 · 칼국수 · 전골' },
          { icon: '🥩', label: '추천 2', value: '고기구이 · 야끼니꾸' },
          { icon: '🥤', label: '곁들임', value: '탄산 한 잔' },
        ],
        chips: ['따끈함', '회복', '든든'],
      },
      spicy: {
        eyebrow: '오늘의 메뉴 추천',
        title: '매콤하게 스트레스 날리기',
        body: '오늘은 자극이 답입니다. 매운 맛이 주는 개운함이 쌓인 피로를 한 번에 밀어내 줄 거예요. 대신 다음 끼니는 조금 순하게 가는 걸 추천해요.',
        facts: [
          { icon: '🌶️', label: '추천 1', value: '마라 · 짬뽕 · 떡볶이' },
          { icon: '🍗', label: '추천 2', value: '양념치킨 · 매운 갈비찜' },
          { icon: '🍚', label: '마무리', value: '볶음밥 필수' },
        ],
        chips: ['매콤', '해소', '텐션업'],
      },
      light: {
        eyebrow: '오늘의 메뉴 추천',
        title: '속 편한 한 끼가 정답',
        body: '오늘은 위장에게도 휴식을 주세요. 담백하고 간이 세지 않은 메뉴가 컨디션을 정돈해 줍니다. 천천히 먹는 것까지가 오늘의 추천이에요.',
        facts: [
          { icon: '🍱', label: '추천 1', value: '덮밥 · 초밥 · 백반' },
          { icon: '🥗', label: '추천 2', value: '샐러드 · 샌드위치' },
          { icon: '🍵', label: '곁들임', value: '따뜻한 차' },
        ],
        chips: ['담백', '가벼움', '정돈'],
      },
    },
  },

  {
    id: 'weekend',
    format: 'B',
    emoji: '🎒',
    title: '주말 활동 추천',
    tagline: '집콕이냐 액티비티냐, 그것이 문제로다.',
    questions: [
      {
        text: '금요일 밤, 가장 먼저 드는 생각은?',
        options: [
          { label: '드디어 아무것도 안 해도 된다', to: 'home' },
          { label: '어디든 나가고 싶다', to: 'active' },
          { label: '뭔가 새로 배워볼까', to: 'grow' },
        ],
      },
      {
        text: '이번 주 체력은 몇 퍼센트쯤 남았나요?',
        options: [
          { label: '20% 미만. 방전 직전', to: 'home' },
          { label: '절반쯤. 적당히 움직일 만함', to: 'grow' },
          { label: '80% 이상. 아직 쌩쌩함', to: 'active' },
        ],
      },
    ],
    results: {
      home: {
        eyebrow: '주말 추천',
        title: '완벽한 집콕이 필요한 주말',
        body: '이번 주말은 회복이 최우선입니다. 약속을 하나쯤 미뤄도 괜찮아요. 잘 쉰 사람이 다음 주에 제일 멀리 갑니다.',
        facts: [
          { icon: '🛋️', label: '추천 활동', value: '밀린 시리즈 정주행' },
          { icon: '🛁', label: '리추얼', value: '길게 씻고 일찍 눕기' },
          { icon: '📵', label: '오늘의 규칙', value: '알림 끄기' },
        ],
        chips: ['충전', '휴식', '무계획'],
      },
      active: {
        eyebrow: '주말 추천',
        title: '밖으로 나가야 사는 주말',
        body: '몸을 움직일수록 컨디션이 올라오는 타이밍이에요. 거창한 계획이 아니어도 좋으니 일단 문밖으로 나가보세요.',
        facts: [
          { icon: '🚶', label: '추천 활동', value: '근교 나들이 · 산책 코스' },
          { icon: '🏓', label: '대안', value: '클라이밍 · 볼링 · 러닝' },
          { icon: '📷', label: '보너스', value: '사진 10장 남기기' },
        ],
        chips: ['액티브', '전환', '에너지'],
      },
      grow: {
        eyebrow: '주말 추천',
        title: '조금만 새로워도 좋은 주말',
        body: '푹 쉬기엔 아쉽고 크게 벌이기엔 부담스러운 상태예요. 두 시간짜리 새로운 경험이 딱 맞습니다.',
        facts: [
          { icon: '🎨', label: '추천 활동', value: '원데이 클래스 · 전시' },
          { icon: '📚', label: '대안', value: '카페에서 책 한 챕터' },
          { icon: '🧭', label: '포인트', value: '안 가본 동네 한 곳' },
        ],
        chips: ['새로움', '가벼운도전', '환기'],
      },
    },
  },

  {
    id: 'movie',
    format: 'B',
    emoji: '🎬',
    title: '오늘 밤 볼 영화',
    tagline: '뭐 볼지 고르다 잠드는 걸 막아드립니다.',
    questions: [
      {
        text: '지금 원하는 감정은?',
        options: [
          { label: '심장 쫄깃하게', to: 'thrill' },
          { label: '따뜻하고 몽글하게', to: 'warm' },
          { label: '아무 생각 없이 웃고 싶다', to: 'fun' },
        ],
      },
      {
        text: '오늘 집중력은 어느 정도인가요?',
        options: [
          { label: '몰입할 준비 완료', to: 'thrill' },
          { label: '중간중간 딴짓할 듯', to: 'fun' },
          { label: '틀어놓고 편하게', to: 'warm' },
        ],
      },
    ],
    results: {
      thrill: {
        eyebrow: '오늘의 감상 추천',
        title: '긴장감이 필요한 밤',
        body: '전개가 빠르고 반전이 있는 작품이 잘 붙습니다. 한 번 시작하면 끝까지 가는 날이니 시간 여유를 두고 트세요.',
        facts: [
          { icon: '🎬', label: '장르', value: '스릴러 · 미스터리' },
          { icon: '📺', label: '대안', value: '범죄 실화 다큐' },
          { icon: '⏱️', label: '추천 러닝타임', value: '2시간 이상' },
        ],
        chips: ['몰입', '반전', '긴장감'],
      },
      warm: {
        eyebrow: '오늘의 감상 추천',
        title: '마음이 노곤해지는 이야기',
        body: '자극보다 온도가 필요한 날이에요. 결말이 다정한 작품이 오늘의 컨디션과 잘 맞습니다.',
        facts: [
          { icon: '🎬', label: '장르', value: '드라마 · 잔잔한 로맨스' },
          { icon: '📺', label: '대안', value: '지브리풍 애니메이션' },
          { icon: '🍫', label: '함께', value: '따뜻한 음료 한 잔' },
        ],
        chips: ['위로', '몽글', '잔잔'],
      },
      fun: {
        eyebrow: '오늘의 감상 추천',
        title: '생각 끄고 웃기만 하기',
        body: '오늘은 머리를 비우는 게 목적입니다. 중간에 놓쳐도 상관없는 가벼운 작품이 최고예요.',
        facts: [
          { icon: '🎬', label: '장르', value: '코미디 · 시트콤' },
          { icon: '📺', label: '대안', value: '예능 몰아보기' },
          { icon: '🍿', label: '함께', value: '야식 세트' },
        ],
        chips: ['가벼움', '웃음', '무해함'],
      },
    },
  },

  {
    id: 'youtuber',
    format: 'B',
    emoji: '📺',
    title: '오늘의 유튜브 채널',
    tagline: '알고리즘 대신 골라드릴게요.',
    questions: [
      {
        text: '지금 유튜브를 켜는 이유는?',
        options: [
          { label: '밥 먹으면서 틀어둘 게 필요해', to: 'bgm' },
          { label: '뭔가 배우고 싶어서', to: 'learn' },
          { label: '그냥 웃고 싶어서', to: 'laugh' },
        ],
      },
      {
        text: '영상 길이는 어느 정도가 좋나요?',
        options: [
          { label: '10분 이하 짧게', to: 'laugh' },
          { label: '20~30분 적당히', to: 'learn' },
          { label: '길수록 좋다', to: 'bgm' },
        ],
      },
    ],
    results: {
      bgm: {
        eyebrow: '오늘의 채널 추천',
        title: '틀어놓기 좋은 롱폼',
        body: '집중해서 보기보다 곁에 흘려두기 좋은 콘텐츠가 맞는 날이에요. 소리만 들어도 편안한 쪽으로 골라보세요.',
        facts: [
          { icon: '🍜', label: '추천 1', value: '먹방 · 요리 롱폼' },
          { icon: '🚐', label: '추천 2', value: '여행 브이로그' },
          { icon: '🎧', label: '추천 3', value: '작업용 플레이리스트' },
        ],
        chips: ['백색소음', '편안함', '롱폼'],
      },
      learn: {
        eyebrow: '오늘의 채널 추천',
        title: '오늘은 뇌에 간식 주는 날',
        body: '새로운 걸 흡수할 여유가 있는 상태예요. 한 편만 봐도 대화 소재가 하나 늘어나는 콘텐츠를 추천합니다.',
        facts: [
          { icon: '🧪', label: '추천 1', value: '과학 · 지식 요약' },
          { icon: '💼', label: '추천 2', value: '커리어 · 자기계발' },
          { icon: '🗺️', label: '추천 3', value: '역사 · 다큐멘터리' },
        ],
        chips: ['지식', '몰입', '인사이트'],
      },
      laugh: {
        eyebrow: '오늘의 채널 추천',
        title: '짧고 확실한 웃음',
        body: '깊게 생각할 여력이 없는 날이죠. 짧은 호흡의 웃긴 콘텐츠가 기분 전환에 제일 빠릅니다.',
        facts: [
          { icon: '😂', label: '추천 1', value: '스케치 코미디' },
          { icon: '🐶', label: '추천 2', value: '동물 · 반려 채널' },
          { icon: '🎮', label: '추천 3', value: '게임 하이라이트' },
        ],
        chips: ['숏폼', '웃음', '기분전환'],
      },
    },
  },

  {
    id: 'travel',
    format: 'B',
    emoji: '✈️',
    title: '다음 여행지 추천',
    tagline: '당장 못 가더라도 상상은 자유니까요.',
    questions: [
      {
        text: '여행에서 가장 중요한 건?',
        options: [
          { label: '아무것도 안 하고 쉬기', to: 'sea' },
          { label: '많이 보고 많이 걷기', to: 'city' },
          { label: '자연 속에서 조용히', to: 'nature' },
        ],
      },
      {
        text: '숙소는 어떤 쪽이 좋나요?',
        options: [
          { label: '뷰 좋은 리조트', to: 'sea' },
          { label: '역세권 호텔', to: 'city' },
          { label: '조용한 독채·산장', to: 'nature' },
        ],
      },
    ],
    results: {
      sea: {
        eyebrow: '여행지 추천',
        title: '바다 앞에서 아무것도 안 하기',
        body: '지금 필요한 건 자극이 아니라 여백이에요. 일정표 없이 파도 소리만 있는 곳이 잘 맞습니다.',
        facts: [
          { icon: '🏖️', label: '국내', value: '제주 · 남해 · 강릉' },
          { icon: '🌴', label: '해외', value: '다낭 · 세부 · 오키나와' },
          { icon: '🧳', label: '추천 일정', value: '2박 3일, 계획 최소화' },
        ],
        chips: ['휴양', '무계획', '리셋'],
      },
      city: {
        eyebrow: '여행지 추천',
        title: '걸을수록 재밌는 도시형',
        body: '새로운 자극이 에너지가 되는 타입이에요. 골목이 촘촘한 도시일수록 만족도가 올라갑니다.',
        facts: [
          { icon: '🏙️', label: '국내', value: '부산 · 서울 성수 · 전주' },
          { icon: '🗼', label: '해외', value: '오사카 · 타이베이 · 방콕' },
          { icon: '🧳', label: '추천 일정', value: '동선 짧게, 하루 3곳까지' },
        ],
        chips: ['도시', '탐험', '먹거리'],
      },
      nature: {
        eyebrow: '여행지 추천',
        title: '초록 안에서 속도 줄이기',
        body: '사람 많은 곳보다 조용한 자연에서 회복이 빠른 편입니다. 통신이 조금 안 터져도 괜찮은 곳을 골라보세요.',
        facts: [
          { icon: '🌲', label: '국내', value: '평창 · 담양 · 지리산 자락' },
          { icon: '🏔️', label: '해외', value: '홋카이도 · 치앙마이 근교' },
          { icon: '🧳', label: '추천 일정', value: '한 곳에 오래 머물기' },
        ],
        chips: ['자연', '고요', '회복'],
      },
    },
  },

  {
    id: 'color-mood',
    format: 'B',
    emoji: '🎨',
    title: '색으로 보는 지금의 나',
    tagline: '고르기만 하면 끝나는 초간단 테스트.',
    questions: [
      {
        text: '지금 가장 끌리는 색은?',
        options: [
          { label: '🔵 깊고 차분한 블루', to: 'blue' },
          { label: '🟡 밝고 따뜻한 옐로우', to: 'yellow' },
          { label: '🟣 몽환적인 퍼플', to: 'purple' },
        ],
      },
      {
        text: '지금 기분을 이모지 하나로 고른다면?',
        options: [
          { label: '😌 잔잔함', to: 'blue' },
          { label: '🔥 들끓음', to: 'yellow' },
          { label: '🌙 알 수 없음', to: 'purple' },
        ],
      },
    ],
    results: {
      blue: {
        eyebrow: '컬러 심리 결과',
        title: '지금 당신은 딥블루 상태',
        body: '감정의 파도가 잔잔하게 정리된 시기예요. 판단력이 좋아지는 때이니, 미뤄둔 결정을 내리기에 적합합니다.',
        swatch: { name: '딥 블루', hex: '#3b6fd4' },
        chips: ['차분함', '명료함', '안정'],
      },
      yellow: {
        eyebrow: '컬러 심리 결과',
        title: '지금 당신은 옐로우 상태',
        body: '에너지가 밖으로 향하는 시기입니다. 사람을 만나고 말을 꺼내기 좋은 타이밍이에요. 다만 과열되기 전에 쉬어가세요.',
        swatch: { name: '골든 옐로우', hex: '#f5b800' },
        chips: ['활력', '적극성', '표현'],
      },
      purple: {
        eyebrow: '컬러 심리 결과',
        title: '지금 당신은 퍼플 상태',
        body: '생각이 많고 감정의 결이 복잡한 시기예요. 답을 서둘러 내리기보다 흘려보내는 편이 낫습니다. 창작 감각은 최고조입니다.',
        swatch: { name: '미스틱 퍼플', hex: '#8b5cf6' },
        chips: ['직관', '감수성', '창의'],
      },
    },
  },

  {
    id: 'mbti-advice',
    format: 'B',
    emoji: '🧭',
    title: 'MBTI 오늘의 조언',
    tagline: '두 축만 골라도 오늘 쓸 조언이 나와요.',
    questions: [
      {
        text: '오늘 에너지는 어디서 오나요?',
        options: [
          { label: '사람들과 있을 때 (E)', to: 'e' },
          { label: '혼자 있을 때 (I)', to: 'i' },
        ],
      },
      {
        text: '결정을 내릴 때 더 크게 작용하는 건?',
        options: [
          { label: '논리와 근거 (T)', to: 'e' },
          { label: '사람과 분위기 (F)', to: 'i' },
        ],
      },
    ],
    results: {
      e: {
        eyebrow: '오늘의 조언',
        title: '오늘은 밖으로 꺼내야 풀립니다',
        body: '혼자 곱씹을수록 무거워지는 날이에요. 신뢰하는 사람에게 상황을 말로 설명하는 순간 답이 정리됩니다. 결정은 근거를 한 줄로 적어보고 내리세요.',
        chips: ['대화로해결', '근거정리', '실행'],
      },
      i: {
        eyebrow: '오늘의 조언',
        title: '오늘은 안으로 정리해야 풀립니다',
        body: '외부 자극이 많으면 판단이 흐려지는 날입니다. 30분이라도 혼자만의 시간을 확보하세요. 마음이 불편한 선택지는 대체로 답이 아닙니다.',
        chips: ['혼자정리', '직감신뢰', '여백'],
      },
    },
  },
];
