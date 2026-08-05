import { ref, reactive, computed } from 'vue';

/** 포맷 C — 생년월일/이름 등 입력 후 분석형 러너 */
export const FormRunner = {
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
      <p>{{ content.loading || '결과를 분석하고 있어요...' }}</p>
    </div>

    <div v-else-if="!result" class="card">
      <div class="input-group" v-for="inp in content.inputs" :key="inp.key">
        <label>{{ inp.label }}</label>

        <date-wheel
          v-if="inp.type === 'date'"
          v-model="values[inp.key]"
        />

        <input
          v-else-if="inp.type === 'text'"
          class="text-input"
          type="text"
          :placeholder="inp.placeholder"
          :maxlength="inp.maxlength || 20"
          v-model="values[inp.key]"
          @keyup.enter="ready && submit()"
        />

        <div v-else class="chip-pick">
          <button
            v-for="o in inp.options"
            :key="o.value"
            type="button"
            class="pick-chip"
            :class="{ on: values[inp.key] === o.value }"
            @click="values[inp.key] = o.value"
          >
            <span v-if="o.emoji" class="pick-emoji">{{ o.emoji }}</span>{{ o.label }}
          </button>
        </div>
      </div>

      <button class="btn-primary" :disabled="!ready" @click="submit">
        {{ content.cta || '결과 보기' }}
      </button>
    </div>

    <template v-else>
      <result-card :data="result" :date-label="dateLabel" />
      <button class="btn-secondary" @click="reset">🔄 다시 해보기</button>
    </template>
  </div>
  `,
  setup(props) {
    const values = reactive({});
    props.content.inputs.forEach((inp) => {
      values[inp.key] = inp.default !== undefined ? inp.default : '';
    });

    const loading = ref(false);
    const result = ref(null);

    const ready = computed(() =>
      props.content.inputs.every((inp) => String(values[inp.key] || '').trim().length > 0)
    );

    function submit() {
      if (!ready.value || loading.value) return;
      loading.value = true;
      result.value = null;
      setTimeout(() => {
        result.value = props.content.build({ ...values });
        loading.value = false;
      }, 800);
    }

    function reset() {
      result.value = null;
    }

    return { values, loading, result, ready, submit, reset };
  },
};
