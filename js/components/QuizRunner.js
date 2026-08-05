import { ref, computed } from 'vue';

const LETTERS = ['A', 'B', 'C', 'D'];

/** 포맷 B — 몇 번의 질문 후 결과 추천형 러너 */
export const QuizRunner = {
  props: {
    content: { type: Object, required: true },
    dateLabel: { type: String, default: '' },
  },
  template: `
  <div>
    <div class="content-head">
      <div class="content-emoji">{{ content.emoji }}</div>
      <h2>{{ content.title }}</h2>
      <p>{{ content.tagline }}</p>
    </div>

    <div v-if="loading" class="card loading-box">
      <div class="spinner"></div>
      <p>결과를 정리하고 있어요...</p>
    </div>

    <template v-else-if="!result">
      <div class="quiz-progress">
        <div class="quiz-progress-bar"><span :style="{ width: progress + '%' }"></span></div>
        <div class="quiz-progress-txt">{{ step + 1 }} / {{ content.questions.length }}</div>
      </div>

      <div class="card question-card">
        <div class="question-text">{{ current.text }}</div>
        <button
          v-for="(opt, idx) in current.options"
          :key="step + '-' + idx"
          class="choice-btn"
          @click="select(opt)"
        >
          <span class="choice-letter">{{ letters[idx] }}</span>
          <span>{{ opt.label }}</span>
        </button>
      </div>
    </template>

    <template v-else>
      <result-card :data="result" :date-label="dateLabel" />
      <button class="btn-secondary" @click="restart">🔄 다시 해보기</button>
    </template>
  </div>
  `,
  setup(props) {
    const step = ref(0);
    const answers = ref([]);
    const loading = ref(false);
    const result = ref(null);

    const current = computed(() => props.content.questions[step.value]);
    const progress = computed(() => ((step.value) / props.content.questions.length) * 100);

    function select(opt) {
      answers.value.push(opt.to);
      if (step.value < props.content.questions.length - 1) {
        step.value += 1;
      } else {
        finish();
      }
    }

    function finish() {
      loading.value = true;
      setTimeout(() => {
        const counts = {};
        answers.value.forEach((k) => { counts[k] = (counts[k] || 0) + 1; });
        // results 선언 순서를 기준으로 최다 득표 키를 고른다(동점 시 먼저 선언된 쪽)
        let best = null;
        let bestN = -1;
        Object.keys(props.content.results).forEach((k) => {
          const n = counts[k] || 0;
          if (n > bestN) { bestN = n; best = k; }
        });
        result.value = props.content.results[best];
        loading.value = false;
      }, 700);
    }

    function restart() {
      step.value = 0;
      answers.value = [];
      result.value = null;
    }

    return { step, current, progress, loading, result, select, restart, letters: LETTERS };
  },
};
