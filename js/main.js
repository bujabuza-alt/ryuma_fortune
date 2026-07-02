import { createApp, ref, computed } from 'vue';
import { useToast } from './composables/useToast.js';
import { useFortune } from './composables/useFortune.js';
import { usePsych } from './composables/usePsych.js';
import { menuItems } from './data/menuData.js';

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

    const { toastMsg, showToast } = useToast();
    const fortune = useFortune();
    const psych = usePsych();

    return {
      tabs, activeTab, todayLabel,
      toastMsg, showToast,
      ...fortune,
      ...psych,
      menuItems,
    };
  },
}).mount('#app');
