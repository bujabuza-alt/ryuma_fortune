import { seededPick, seededScore, todayKey, hashCode, formatBirth } from '../../utils.js';
import { getZodiac, CHINESE_ZODIAC } from '../zodiac.js';
import {
  HEADLINES,
  GENERAL_FORTUNES,
  HOROSCOPE_TEMPLATES,
  LUCKY_ITEMS,
  LUCKY_COLORS,
  DIRECTIONS,
} from '../fortuneData.js';

/* ============================================================
 * 포맷 C — 생년월일 / 이름 등 입력 후 분석형
 * inputs: [{ key, type:'date'|'text'|'choice', label, ... }]
 * build(values) -> ResultCard 페이로드
 * 같은 날 · 같은 입력이면 같은 결과가 나오도록 seed 기반으로 계산한다.
 * ========================================================== */

const TODAY_DEFAULT_BIRTH = '1995-01-01';

const ZODIAC_LINES = [
  '오늘은 말수를 조금 줄일수록 이득이 커지는 날입니다.',
  '미뤄둔 연락 하나가 뜻밖의 기회로 이어질 수 있어요.',
  '지출 앞에서 한 번만 더 고민하면 후회가 없습니다.',
  '컨디션 관리가 곧 오늘의 운입니다. 무리하지 마세요.',
  '오전보다 오후에 흐름이 풀리니 조급해하지 마세요.',
  '주변의 조언 중 하나가 정확히 맞아떨어지는 날입니다.',
  '작은 정리정돈이 마음까지 가볍게 만들어 줍니다.',
  '오늘 만나는 사람에게서 좋은 힌트를 얻게 됩니다.',
  '결정을 하루만 미루면 더 좋은 조건이 보입니다.',
  '평소 안 하던 선택이 의외로 잘 맞아떨어져요.',
  '고맙다는 말을 아끼지 않으면 관계운이 올라갑니다.',
  '집중이 잘 되는 시간대를 놓치지 마세요. 오늘의 승부처입니다.',
];

const NAME_ENERGIES = [
  { title: '불의 기운 · 火', body: '오늘 당신 주변에는 추진력의 기운이 강하게 흐릅니다. 시작을 망설이던 일이 있다면 오늘 첫 삽을 뜨기 좋아요. 다만 말이 앞서지 않도록 한 박자만 늦추면 완벽합니다.', chips: ['추진력', '열정', '주도'] },
  { title: '물의 기운 · 水', body: '유연하게 흘러가는 기운이 감돕니다. 억지로 밀어붙이기보다 상황에 맞춰 방향을 트는 편이 이득이에요. 사람 사이의 갈등도 자연스럽게 풀립니다.', chips: ['유연함', '흐름', '조화'] },
  { title: '나무의 기운 · 木', body: '성장의 기운이 붙는 날입니다. 당장 결과가 보이지 않아도 쌓아둔 것이 자라고 있어요. 배움이나 계획 세우기에 특히 좋은 흐름입니다.', chips: ['성장', '축적', '계획'] },
  { title: '쇠의 기운 · 金', body: '판단이 또렷해지는 기운입니다. 애매하게 끌어온 일을 정리하기에 좋은 날이에요. 단호함이 오늘만큼은 미덕이 됩니다.', chips: ['결단', '정리', '명료'] },
  { title: '흙의 기운 · 土', body: '안정과 신뢰의 기운이 감돕니다. 큰 변화보다 지금 있는 자리를 다지는 쪽이 유리해요. 주변에서 당신을 믿고 기대는 일이 생깁니다.', chips: ['안정', '신뢰', '중심'] },
];

const NAME_ADVICES = [
  '오늘의 키워드는 "속도 조절"입니다.',
  '오늘의 키워드는 "먼저 건네는 말"입니다.',
  '오늘의 키워드는 "정리"입니다.',
  '오늘의 키워드는 "한 번 더 확인"입니다.',
  '오늘의 키워드는 "쉬어가기"입니다.',
];

const TAROT_CARDS = [
  { name: '별 · The Star', emoji: '⭐', body: '오래 붙잡고 있던 걱정이 옅어지는 카드입니다. 지금의 방향이 틀리지 않았다는 신호이니, 조용히 하던 대로 이어가세요. 늦어도 도착은 합니다.', chips: ['희망', '회복', '확신'] },
  { name: '태양 · The Sun', emoji: '☀️', body: '가리고 있던 것이 걷히고 상황이 선명해지는 카드예요. 숨겨왔던 이야기를 꺼내기에도 좋은 타이밍입니다. 오늘의 밝은 기운을 주변에도 나눠보세요.', chips: ['명확', '활력', '성취'] },
  { name: '달 · The Moon', emoji: '🌙', body: '지금은 정보가 절반만 보이는 시기입니다. 서둘러 결론 내리기보다 한 걸음 물러나 관찰하세요. 직감은 예리하지만 확신은 미뤄도 좋습니다.', chips: ['직관', '모호함', '관찰'] },
  { name: '수레바퀴 · Wheel of Fortune', emoji: '🎡', body: '흐름이 바뀌는 전환점의 카드입니다. 통제할 수 없는 변화가 있더라도 결과적으로는 유리하게 작용해요. 붙잡기보다 올라타세요.', chips: ['전환', '기회', '변화'] },
  { name: '절제 · Temperance', emoji: '🕊️', body: '균형이 핵심인 날입니다. 어느 한쪽으로 치우친 부분이 있다면 오늘 조정하세요. 과하지 않게, 모자라지 않게가 정답입니다.', chips: ['균형', '조율', '인내'] },
  { name: '힘 · Strength', emoji: '🦁', body: '밀어붙이는 힘보다 버티는 힘이 필요한 카드예요. 감정이 올라오는 순간 한 번만 삼키면 상황이 당신 쪽으로 기웁니다.', chips: ['용기', '자제', '뚝심'] },
  { name: '은둔자 · The Hermit', emoji: '🏮', body: '답이 밖이 아니라 안에 있는 시기입니다. 혼자 정리하는 시간을 확보하세요. 조용한 하루가 오히려 큰 진전을 만듭니다.', chips: ['성찰', '고요', '통찰'] },
  { name: '세계 · The World', emoji: '🌍', body: '한 사이클이 마무리되는 카드입니다. 끝맺음을 잘 해두면 다음 흐름이 훨씬 수월해져요. 스스로에게 수고했다고 말해주세요.', chips: ['완성', '매듭', '보상'] },
];

const COMPAT_COMMENTS = [
  { title: '말 안 해도 통하는 사이', body: '기본 결이 비슷해서 함께 있을 때 에너지 소모가 적은 조합이에요. 편안함이 강점인 만큼, 서로에게 익숙해져 표현이 줄어드는 것만 조심하면 됩니다.' },
  { title: '서로의 빈칸을 채우는 사이', body: '성향이 다른 만큼 처음엔 부딪힐 수 있지만, 익숙해지면 서로가 못 하는 걸 대신해 주는 관계가 됩니다. 다름을 설득하려 하지 않는 게 핵심이에요.' },
  { title: '오래 볼수록 좋아지는 사이', body: '첫인상보다 시간이 쌓일수록 신뢰가 붙는 조합입니다. 급하게 가까워지려 하지 않아도 괜찮아요. 꾸준함이 이 관계의 무기입니다.' },
  { title: '텐션이 잘 맞는 사이', body: '같이 있으면 유독 대화가 잘 붙는 조합이에요. 즐거움이 큰 만큼 진지한 이야기도 가끔은 꺼내 두면 관계가 더 단단해집니다.' },
  { title: '조율이 필요한 사이', body: '속도와 우선순위가 서로 다른 편입니다. 나쁜 궁합이라기보다 대화의 양이 필요한 조합이에요. 기대를 말로 표현하면 대부분 해결됩니다.' },
];

export const PROFILE_CONTENTS = [
  {
    id: 'daily-fortune',
    format: 'C',
    emoji: '🔮',
    title: '오늘의 운세',
    tagline: '생년월일을 고르면 오늘의 전체운과 별자리 운세를 알려드려요.',
    cta: '운세 보기',
    loading: '별자리와 사주를 살펴보는 중이에요...',
    inputs: [
      { key: 'birth', type: 'date', label: '생년월일', default: TODAY_DEFAULT_BIRTH },
    ],
    build(v) {
      const [, m, d] = v.birth.split('-').map(Number);
      const zodiac = getZodiac(m, d);
      const seed = `${todayKey()}|${v.birth}`;
      const item = seededPick(LUCKY_ITEMS, seed + 'i');
      return {
        eyebrow: `${zodiac} · ${formatBirth(v.birth)}`,
        title: seededPick(HEADLINES, seed),
        body: seededPick(GENERAL_FORTUNES, seed + 'g'),
        sections: [
          { icon: '⭐', title: `별자리 운세 · ${zodiac}`, text: seededPick(HOROSCOPE_TEMPLATES.default, seed + 'h').replace('{z}', zodiac) },
        ],
        stats: [
          { label: '애정운', value: seededScore(seed + 'love') },
          { label: '금전운', value: seededScore(seed + 'money') },
          { label: '건강운', value: seededScore(seed + 'health') },
        ],
        facts: [
          { icon: item.icon, label: '행운의 아이템', value: item.name },
          { icon: '🔢', label: '행운의 숫자', value: String((hashCode(seed + 'n') % 9) + 1) },
          { icon: '🧭', label: '행운의 방향', value: seededPick(DIRECTIONS, seed + 'd') },
        ],
        swatch: seededPick(LUCKY_COLORS, seed + 'c'),
      };
    },
  },

  {
    id: 'zodiac-line',
    format: 'C',
    emoji: '🐯',
    title: '띠별 한줄운세',
    tagline: '생년월일 없이, 띠만 고르면 끝나요.',
    cta: '한줄운세 보기',
    loading: '띠별 흐름을 확인하는 중이에요...',
    inputs: [
      {
        key: 'sign',
        type: 'choice',
        label: '당신의 띠를 골라주세요',
        default: '용',
        options: CHINESE_ZODIAC,
      },
    ],
    build(v) {
      const seed = `${todayKey()}|${v.sign}`;
      const meta = CHINESE_ZODIAC.find((z) => z.value === v.sign);
      return {
        eyebrow: `${meta ? meta.emoji : ''} ${v.sign}띠 · 오늘`,
        title: seededPick(ZODIAC_LINES, seed),
        stats: [
          { label: '종합운', value: seededScore(seed + 'total') },
          { label: '대인운', value: seededScore(seed + 'people') },
        ],
        facts: [
          { icon: '🍀', label: '행운의 시간대', value: `${(hashCode(seed + 't') % 12) + 9}시 무렵` },
          { icon: '🧭', label: '행운의 방향', value: seededPick(DIRECTIONS, seed + 'd') },
        ],
        swatch: seededPick(LUCKY_COLORS, seed + 'c'),
      };
    },
  },

  {
    id: 'tarot',
    format: 'C',
    emoji: '🃏',
    title: '오늘의 타로',
    tagline: '마음이 가는 카드를 한 장 골라보세요.',
    cta: '카드 펼치기',
    loading: '카드를 뒤집는 중이에요...',
    inputs: [
      {
        key: 'card',
        type: 'choice',
        label: '카드를 한 장 고르세요',
        default: 'A',
        options: [
          { value: 'A', label: '첫 번째', emoji: '🂠' },
          { value: 'B', label: '두 번째', emoji: '🂠' },
          { value: 'C', label: '세 번째', emoji: '🂠' },
        ],
      },
    ],
    build(v) {
      const seed = `${todayKey()}|tarot|${v.card}`;
      const card = seededPick(TAROT_CARDS, seed);
      return {
        eyebrow: `오늘의 카드 · ${card.emoji}`,
        title: card.name,
        body: card.body,
        chips: card.chips,
      };
    },
  },

  {
    id: 'lucky-set',
    format: 'C',
    emoji: '🍀',
    title: '행운의 색과 숫자',
    tagline: '오늘 당신에게 힘을 실어주는 조합이에요.',
    cta: '행운 확인하기',
    loading: '행운의 기운을 모으는 중이에요...',
    inputs: [
      { key: 'birth', type: 'date', label: '생년월일', default: TODAY_DEFAULT_BIRTH },
    ],
    build(v) {
      const seed = `${todayKey()}|lucky|${v.birth}`;
      const color = seededPick(LUCKY_COLORS, seed + 'c');
      const item = seededPick(LUCKY_ITEMS, seed + 'i');
      return {
        eyebrow: `${formatBirth(v.birth)} · 오늘의 행운`,
        title: `오늘의 컬러는 ${color.name}`,
        body: `${color.name} 계열을 하나만 몸에 지녀도 흐름이 부드러워지는 날입니다. 옷이 아니어도 좋아요. 소품이나 배경화면처럼 눈에 자주 닿는 곳이면 충분합니다.`,
        swatch: color,
        facts: [
          { icon: item.icon, label: '행운의 아이템', value: item.name },
          { icon: '🔢', label: '행운의 숫자', value: String((hashCode(seed + 'n') % 9) + 1) },
          { icon: '🧭', label: '행운의 방향', value: seededPick(DIRECTIONS, seed + 'd') },
          { icon: '⏰', label: '행운의 시간', value: `${(hashCode(seed + 't') % 12) + 9}시 무렵` },
        ],
      };
    },
  },

  {
    id: 'name-energy',
    format: 'C',
    emoji: '✍️',
    title: '이름으로 보는 오늘의 기운',
    tagline: '이름 두 글자면 충분해요.',
    cta: '기운 확인하기',
    loading: '이름의 기운을 읽는 중이에요...',
    inputs: [
      { key: 'name', type: 'text', label: '이름', placeholder: '예) 김류마', maxlength: 10 },
    ],
    build(v) {
      const name = String(v.name).trim();
      const seed = `${todayKey()}|name|${name}`;
      const energy = seededPick(NAME_ENERGIES, seed);
      return {
        eyebrow: `${name} 님의 오늘`,
        title: energy.title,
        body: energy.body,
        chips: energy.chips,
        stats: [
          { label: '기운', value: seededScore(seed + 'e') },
          { label: '집중력', value: seededScore(seed + 'f') },
        ],
        facts: [
          { icon: '🗝️', label: '오늘의 조언', value: seededPick(NAME_ADVICES, seed + 'a') },
        ],
      };
    },
  },

  {
    id: 'compat',
    format: 'C',
    emoji: '💞',
    title: '오늘의 궁합',
    tagline: '두 사람의 생년월일로 오늘의 합을 봐요.',
    cta: '궁합 보기',
    loading: '두 사람의 흐름을 겹쳐보는 중이에요...',
    inputs: [
      { key: 'mine', type: 'date', label: '내 생년월일', default: TODAY_DEFAULT_BIRTH },
      { key: 'yours', type: 'date', label: '상대 생년월일', default: TODAY_DEFAULT_BIRTH },
    ],
    build(v) {
      const seed = `${todayKey()}|compat|${v.mine}|${v.yours}`;
      const score = 55 + (hashCode(seed) % 45); // 55~99
      const comment = seededPick(COMPAT_COMMENTS, seed + 'c');
      const [m1, d1] = v.mine.split('-').slice(1).map(Number);
      const [m2, d2] = v.yours.split('-').slice(1).map(Number);
      return {
        eyebrow: `${getZodiac(m1, d1)} × ${getZodiac(m2, d2)}`,
        title: `오늘의 궁합 ${score}점`,
        body: comment.body,
        sections: [
          { icon: '💬', title: comment.title, text: `오늘 두 사람 사이에서는 ${seededPick(['짧은 대화', '함께 먹는 한 끼', '가벼운 산책', '솔직한 한마디'], seed + 's')}가 관계에 가장 좋은 영향을 줍니다.` },
        ],
        stats: [
          { label: '대화합', value: seededScore(seed + 'talk') },
          { label: '취향합', value: seededScore(seed + 'taste') },
          { label: '텐션합', value: seededScore(seed + 'tension') },
        ],
      };
    },
  },
];
