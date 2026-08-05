import { createApp, ref, computed } from 'vue';
import { useToast } from './composables/useToast.js';
import { useWeather } from './composables/useWeather.js';
import { menuItems } from './data/menuData.js';
import { OFFICE_QUOTES } from './data/quotes.js';
import { dayOfYearIndex } from './utils.js';
import {
  featuredFor,
  rotatedDraws,
  rotatedQuizzes,
  rotatedProfiles,
} from './data/contents/index.js';

import { ResultCard } from './components/ResultCard.js';
import { DateWheel } from './components/DateWheel.js';
import { DrawRunner } from './components/DrawRunner.js';
import { QuizRunner } from './components/QuizRunner.js';
import { FormRunner } from './components/FormRunner.js';

const app = createApp({
  setup() {
    /* ---------- 네비게이션 ---------- */
    const tabs = [
      { key: 'home', label: '오늘', icon: '✨' },
      { key: 'fortune', label: '운세', icon: '🔮' },
      { key: 'test', label: '테스트', icon: '🧠' },
      { key: 'info', label: '류마', icon: '📍' },
    ];
    const activeTab = ref('home');

    /* ---------- 콘텐츠 로테이션 ---------- */
    const today = new Date();
    const featured = computed(() => featuredFor(today));
    const draws = computed(() => rotatedDraws(today));
    const quizzes = computed(() => rotatedQuizzes(today));
    const profiles = computed(() => rotatedProfiles(today));

    /* ---------- 콘텐츠 실행 화면 ---------- */
    const activeContent = ref(null);

    function openContent(content) {
      activeContent.value = content;
      window.scrollTo({ top: 0 });
    }
    function closeContent() {
      activeContent.value = null;
    }
    function goTab(key) {
      activeContent.value = null;
      activeTab.value = key;
      window.scrollTo({ top: 0 });
    }

    const runnerFor = (c) =>
      c.format === 'A' ? 'draw-runner' : c.format === 'B' ? 'quiz-runner' : 'form-runner';

    const formatLabel = (f) =>
      f === 'A' ? '바로 뽑기' : f === 'B' ? '질문 후 결과' : '입력 후 분석';

    /* ---------- 헤더 ---------- */
    const todayLabel = computed(() => {
      const d = new Date();
      const days = ['일', '월', '화', '수', '목', '금', '토'];
      return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
    });

    const dailyQuote = computed(() => OFFICE_QUOTES[dayOfYearIndex(OFFICE_QUOTES.length)]);

    const { toastMsg, showToast } = useToast();
    const weather = useWeather();

    /* ---------- 매장 정보 ---------- */
    const shop = {
      name: '류마 · 동탄 코벤트가든점',
      addr: '경기 화성시 동탄 코벤트가든 · 동탄 파라곤',
      mapQuery: '동탄 코벤트가든',
      naverSearch: 'https://m.search.naver.com/search.naver?query=%EB%A5%98%EB%A7%88+%EB%8F%99%ED%83%84+%EC%BD%94%EB%B2%A4%ED%8A%B8%EA%B0%80%EB%93%A0',
      naverMap: 'https://m.map.naver.com/search2/search.naver?query=%EB%A5%98%EB%A7%88+%EB%8F%99%ED%83%84+%EC%BD%94%EB%B2%A4%ED%8A%B8%EA%B0%80%EB%93%A0',
    };
    const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(shop.mapQuery)}&z=16&hl=ko&output=embed`;

    return {
      tabs, activeTab, goTab,
      featured, draws, quizzes, profiles,
      activeContent, openContent, closeContent, runnerFor, formatLabel,
      todayLabel, dailyQuote,
      toastMsg, showToast,
      ...weather,
      menuItems, shop, mapEmbedSrc,
    };
  },
});

app.component('result-card', ResultCard);
app.component('date-wheel', DateWheel);
app.component('draw-runner', DrawRunner);
app.component('quiz-runner', QuizRunner);
app.component('form-runner', FormRunner);

app.mount('#app');
