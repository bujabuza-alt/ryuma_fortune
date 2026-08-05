import { ref } from 'vue';

/** 포맷 A — 입력 없이 즉시 뽑기형 러너 */
export const DrawRunner = {
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
      <p>결과를 준비하고 있어요...</p>
    </div>

    <div v-else-if="!result" class="card draw-card" @click="draw">
      <div class="draw-emoji">{{ content.idleEmoji }}</div>
      <div class="draw-hint">{{ content.hint }}</div>
      <button class="btn-primary draw-btn">{{ content.cta }}</button>
    </div>

    <template v-else>
      <result-card :data="result" :date-label="dateLabel" />
      <button class="btn-secondary" @click="draw">🔄 {{ content.again }}</button>
    </template>
  </div>
  `,
  setup(props) {
    const result = ref(null);
    const loading = ref(false);

    function draw() {
      if (loading.value) return;
      loading.value = true;
      result.value = null;
      // 즉시 뽑기형은 대기 시간을 짧게 유지한다
      setTimeout(() => {
        result.value = props.content.draw();
        loading.value = false;
      }, 450);
    }

    return { result, loading, draw };
  },
};
