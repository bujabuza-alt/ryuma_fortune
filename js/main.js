import { createApp, ref, computed } from 'vue';
import { useToast } from './composables/useToast.js';
import { useFortune } from './composables/useFortune.js';
import { usePsych } from './composables/usePsych.js';
import { useWeather } from './composables/useWeather.js';
import { menuItems } from './data/menuData.js';
import { OFFICE_QUOTES } from './data/quotes.js';
import { dayOfYearIndex } from './utils.js';

createApp({
  setup() {
    /* ---------- 네비게이션 ---------- */
    const tabs = [
      { key: 'fortune', label: '운세', icon: '🔮' },
      { key: 'psych', label: '심리테스트', icon: '🧠' },
      { key: 'info', label: '류마 안내', icon: '📍' },
    ];
    const activeTab = ref('fortune');

    const todayLabel = computed(() => {
      const d = new Date();
      const days = ['일','월','화','수','목','금','토'];
      return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
    });

    const dailyQuote = computed(() => OFFICE_QUOTES[dayOfYearIndex(OFFICE_QUOTES.length)]);

    const { toastMsg, showToast } = useToast();
    const fortune = useFortune();
    const psych = usePsych();
    const weather = useWeather();

    return {
      tabs, activeTab, todayLabel, dailyQuote,
      toastMsg, showToast,
      ...fortune,
      ...psych,
      ...weather,
      menuItems,
    };
  },
}).mount('#app');
