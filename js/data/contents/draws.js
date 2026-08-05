import { pick } from '../../utils.js';

/* ============================================================
 * 포맷 A — 입력 없이 즉시 뽑기형
 * 각 콘텐츠는 draw()를 통해 ResultCard 페이로드를 반환한다.
 * ResultCard 페이로드: { eyebrow, title, body, quote, stats, facts, chips, swatch }
 * ========================================================== */

const COOKIE_TITLES = [
  '쿠키 속 한 줄',
  '오늘의 조각 메시지',
  '작게 접혀 있던 문장',
  '지금 필요한 한마디',
];

const COOKIE_MESSAGES = [
  '오늘 흘린 작은 노력이 내일의 큰 행운이 됩니다.',
  '망설이던 일이 있다면 지금이 바로 시작할 때예요.',
  '주변 사람에게 먼저 건넨 인사가 좋은 인연을 만듭니다.',
  '예상보다 빠르게 좋은 소식이 도착할 거예요.',
  '오늘만큼은 자신을 믿고 한 걸음 더 나아가 보세요.',
  '작은 행운은 이미 당신 곁에 와 있습니다.',
  '서두르지 않아도 괜찮아요. 속도보다 방향이 중요한 날입니다.',
  '오늘 미룬 일 하나만 끝내도 하루가 가벼워집니다.',
  '누군가 당신의 성실함을 조용히 지켜보고 있어요.',
  '지금의 애매한 시기는 다음 챕터를 위한 준비 구간입니다.',
];

const PRAISE_TITLES = [
  '당신, 생각보다 훨씬 잘하고 있어요',
  '오늘의 칭찬 카드가 도착했습니다',
  '이건 진심으로 하는 말인데요',
  '스스로에게 해주고 싶던 말',
];

const PRAISE_BODIES = [
  '티 나지 않는 일을 묵묵히 해내는 사람이 결국 오래 갑니다. 오늘 하루도 별일 없이 지나갔다면, 그건 당신이 잘 버텨줬다는 뜻이에요.',
  '완벽하지 않아도 계속하는 게 제일 어려운 일인데, 당신은 그걸 해내고 있어요. 스스로에게 조금 더 관대해져도 괜찮습니다.',
  '남의 기분을 먼저 살피느라 정작 본인 마음은 뒤로 미루지 않았나요? 오늘은 당신 차례로 두어도 아무 문제 없어요.',
  '지금 잘 안 풀리는 것처럼 느껴져도, 방향은 틀리지 않았습니다. 조금 늦게 도착할 뿐이에요.',
  '작은 약속을 지키는 사람은 큰 신뢰를 얻습니다. 당신이 지켜온 사소한 것들이 이미 증거예요.',
  '어제보다 딱 1퍼센트만 나아졌어도 그건 분명한 성장입니다. 오늘의 당신은 어제보다 앞에 있어요.',
];

const PRAISE_CHIPS = [
  ['꾸준함', '단단함', '믿음직'],
  ['다정함', '섬세함', '따뜻함'],
  ['성실함', '책임감', '진솔함'],
  ['유연함', '긍정에너지', '회복탄력성'],
];

const QUOTES = [
  { text: '오늘 할 수 있는 일에 집중하라. 그것이 내일을 바꾸는 유일한 방법이다.', by: '작자 미상' },
  { text: '가장 어두운 시간은 해가 뜨기 직전이다.', by: '영국 속담' },
  { text: '천 리 길도 한 걸음부터.', by: '한국 속담' },
  { text: '완벽함이란 더 보탤 것이 없을 때가 아니라, 더 뺄 것이 없을 때 이루어진다.', by: '생텍쥐페리' },
  { text: '실패는 넘어지는 것이 아니라, 넘어진 자리에 머무는 것이다.', by: '작자 미상' },
  { text: '행복은 이미 가진 것을 알아차리는 능력에서 온다.', by: '작자 미상' },
  { text: '조급한 마음은 좋은 결정을 만들지 못한다.', by: '동양 격언' },
  { text: '오늘 심은 씨앗이 내일의 그늘이 된다.', by: '작자 미상' },
  { text: '비교는 기쁨을 훔쳐가는 도둑이다.', by: '시어도어 루스벨트' },
  { text: '멀리 가려면 함께 가라.', by: '아프리카 속담' },
];

const MISSIONS = [
  '평소 안 가던 길로 퇴근하기',
  '연락 뜸했던 사람에게 안부 한 줄 보내기',
  '책상 위 딱 한 곳만 정리하기',
  '오늘 마신 물 한 잔 더 마시기',
  '점심에 안 먹어본 메뉴 고르기',
  '10분 일찍 자기',
  '고맙다는 말 한 번 소리 내어 하기',
  '휴대폰 없이 15분 걷기',
  '미뤄둔 알림 3개 정리하기',
  '거울 보고 한 번 웃어주기',
];

const SMALLTALKS = [
  '요즘 제일 자주 듣는 노래',
  '최근에 본 것 중 제일 웃겼던 영상',
  '인생 최고의 야식 조합',
  '다시 가고 싶은 여행지 한 곳',
  '어릴 때 장래희망',
  '요즘 빠져 있는 사소한 취미',
  '최근에 산 것 중 제일 만족스러운 물건',
  '주말에 절대 안 하는 일',
  '스트레스 풀리는 나만의 방법',
  '가장 최근에 웃었던 순간',
];

const BGMS = [
  '잔잔한 시티팝',
  '90년대 발라드',
  '로파이 힙합',
  '드라이브용 신스팝',
  '카페에서 나올 법한 재즈',
  '기분 확 올려주는 K-팝',
  '빗소리 섞인 어쿠스틱',
  '집중용 화이트노이즈',
];

const MOOD_COLORS = [
  { name: '라벤더', hex: '#a78bfa' },
  { name: '코랄 핑크', hex: '#f472b6' },
  { name: '민트 그린', hex: '#34d399' },
  { name: '골든 옐로우', hex: '#fbbf24' },
  { name: '스카이 블루', hex: '#60a5fa' },
  { name: '피치 오렌지', hex: '#fb923c' },
];

export const DRAW_CONTENTS = [
  {
    id: 'fortune-cookie',
    format: 'A',
    emoji: '🥠',
    title: '포춘쿠키',
    tagline: '쿠키를 깨면 오늘의 한 줄이 나와요.',
    cta: '쿠키 깨기',
    again: '하나 더 깨기',
    idleEmoji: '🍪',
    activeEmoji: '🥠',
    hint: '탭하여 쿠키를 깨보세요',
    draw() {
      return {
        eyebrow: '오늘의 포춘쿠키',
        title: pick(COOKIE_TITLES),
        quote: pick(COOKIE_MESSAGES),
      };
    },
  },
  {
    id: 'praise',
    format: 'A',
    emoji: '💌',
    title: '칭찬 뽑기',
    tagline: '오늘 당신에게 필요한 말을 골라 드려요.',
    cta: '칭찬 뽑기',
    again: '다시 뽑기',
    idleEmoji: '💌',
    activeEmoji: '💖',
    hint: '탭하여 카드를 열어보세요',
    draw() {
      return {
        eyebrow: '오늘의 칭찬 카드',
        title: pick(PRAISE_TITLES),
        body: pick(PRAISE_BODIES),
        chips: pick(PRAISE_CHIPS),
      };
    },
  },
  {
    id: 'quote',
    format: 'A',
    emoji: '📜',
    title: '위로 한마디',
    tagline: '마음이 복잡한 날, 문장 하나면 충분할 때가 있어요.',
    cta: '문장 뽑기',
    again: '다른 문장',
    idleEmoji: '📜',
    activeEmoji: '✨',
    hint: '탭하여 문장을 펼쳐보세요',
    draw() {
      const q = pick(QUOTES);
      return {
        eyebrow: '오늘의 문장',
        title: q.by,
        quote: q.text,
      };
    },
  },
  {
    id: 'roulette',
    format: 'A',
    emoji: '🎯',
    title: '행운의 룰렛',
    tagline: '오늘의 미션과 스몰토크 주제를 랜덤으로 뽑아요.',
    cta: '룰렛 돌리기',
    again: '다시 돌리기',
    idleEmoji: '🎡',
    activeEmoji: '🎯',
    hint: '탭하여 룰렛을 돌려보세요',
    draw() {
      const color = pick(MOOD_COLORS);
      return {
        eyebrow: '오늘의 룰렛 결과',
        title: '오늘 이거 하나만 해보세요',
        facts: [
          { icon: '✅', label: '오늘의 미션', value: pick(MISSIONS) },
          { icon: '💬', label: '스몰토크 주제', value: pick(SMALLTALKS) },
          { icon: '🎧', label: '오늘의 BGM', value: pick(BGMS) },
          { icon: '🔢', label: '행운의 숫자', value: String(Math.floor(Math.random() * 9) + 1) },
        ],
        swatch: color,
      };
    },
  },
];
