import { ref } from 'vue';
import { pick, randScore } from '../utils.js';
import { getZodiac } from '../data/zodiac.js';
import {
  HEADLINES,
  GENERAL_FORTUNES,
  HOROSCOPE_TEMPLATES,
  LUCKY_ITEMS,
  LUCKY_COLORS,
  DIRECTIONS,
  COOKIE_MESSAGES,
} from '../data/fortuneData.js';

export function useFortune() {
  const birthday = ref('');
  const fortuneLoading = ref(false);
  const fortuneResult = ref(null);
  const cookieCracked = ref(false);
  const cookieMessage = ref('');
  const maxDate = new Date().toISOString().split('T')[0];

  function getFortune() {
    if (!birthday.value) return;
    fortuneLoading.value = true;
    fortuneResult.value = null;
    cookieCracked.value = false;
    cookieMessage.value = '';

    // Claude API 호출을 시뮬레이션 (Vercel 서버리스 함수 경유)
    setTimeout(() => {
      const [y, m, d] = birthday.value.split('-').map(Number);
      const zodiac = getZodiac(m, d);

      fortuneResult.value = {
        birthLabel: `${y}.${String(m).padStart(2, '0')}.${String(d).padStart(2, '0')}`,
        zodiac,
        headline: pick(HEADLINES),
        generalFortune: pick(GENERAL_FORTUNES),
        horoscope: pick(HOROSCOPE_TEMPLATES.default).replace('{z}', zodiac),
        scores: [
          { label: '애정운', value: randScore() },
          { label: '금전운', value: randScore() },
          { label: '건강운', value: randScore() },
        ],
        luckyItem: pick(LUCKY_ITEMS),
        luckyColor: pick(LUCKY_COLORS),
        luckyNumber: Math.floor(Math.random() * 9) + 1,
        luckyDirection: pick(DIRECTIONS),
      };
      fortuneLoading.value = false;
    }, 1400);
  }

  function resetFortune() {
    fortuneResult.value = null;
    birthday.value = '';
    cookieCracked.value = false;
    cookieMessage.value = '';
  }

  function crackCookie() {
    if (cookieCracked.value) return;
    cookieCracked.value = true;
    cookieMessage.value = pick(COOKIE_MESSAGES);
  }

  return {
    birthday,
    fortuneLoading,
    fortuneResult,
    cookieCracked,
    cookieMessage,
    maxDate,
    getFortune,
    resetFortune,
    crackCookie,
  };
}
