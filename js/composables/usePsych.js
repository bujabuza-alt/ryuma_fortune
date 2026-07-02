import { ref } from 'vue';
import { pick } from '../utils.js';
import { PSYCH_QUESTIONS } from '../data/psychData.js';

export function usePsych() {
  const psychQuestion = ref(pick(PSYCH_QUESTIONS));
  const selectedChoice = ref(null);
  const psychLoading = ref(false);
  const psychAnalysis = ref(null);

  function selectChoice(idx) {
    if (selectedChoice.value !== null) return;
    selectedChoice.value = idx;
    psychLoading.value = true;
    psychAnalysis.value = null;

    // Claude API 분석 호출 시뮬레이션
    setTimeout(() => {
      psychAnalysis.value = psychQuestion.value.analysis[idx];
      psychLoading.value = false;
    }, 1200);
  }

  function resetPsych() {
    let next = pick(PSYCH_QUESTIONS);
    while (next.text === psychQuestion.value.text && PSYCH_QUESTIONS.length > 1) {
      next = pick(PSYCH_QUESTIONS);
    }
    psychQuestion.value = next;
    selectedChoice.value = null;
    psychAnalysis.value = null;
  }

  return {
    psychQuestion,
    selectedChoice,
    psychLoading,
    psychAnalysis,
    selectChoice,
    resetPsych,
  };
}
