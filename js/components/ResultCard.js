/**
 * 모든 포맷(A/B/C)이 공유하는 결과 카드.
 * 캡처했을 때 그 자체로 완결되도록 서비스명 + 날짜를 카드 안에 포함한다.
 * 페이로드: { eyebrow, title, body, quote, sections, stats, facts, chips, swatch }
 */
export const ResultCard = {
  props: {
    data: { type: Object, required: true },
    dateLabel: { type: String, default: '' },
  },
  template: `
  <div class="rcard">
    <div class="rcard-sheen"></div>

    <div class="rcard-head">
      <span class="rcard-brand">🔮 류마 운세</span>
      <span class="rcard-date">{{ dateLabel }}</span>
    </div>

    <div class="rcard-eyebrow" v-if="data.eyebrow">{{ data.eyebrow }}</div>
    <h3 class="rcard-title">{{ data.title }}</h3>

    <p class="rcard-body" v-if="data.body">{{ data.body }}</p>

    <div class="rcard-quote" v-if="data.quote">{{ data.quote }}</div>

    <div class="rcard-section" v-for="(s, i) in (data.sections || [])" :key="'s'+i">
      <div class="rcard-section-title"><span v-if="s.icon">{{ s.icon }}</span> {{ s.title }}</div>
      <div class="rcard-section-text">{{ s.text }}</div>
    </div>

    <div class="rcard-stats" v-if="data.stats && data.stats.length">
      <div class="rcard-stat" v-for="s in data.stats" :key="s.label">
        <div class="lab">{{ s.label }}</div>
        <div class="stars">{{ '★'.repeat(s.value) }}{{ '☆'.repeat(5 - s.value) }}</div>
      </div>
    </div>

    <div class="rcard-facts" v-if="hasFacts">
      <div class="rcard-fact" v-if="data.swatch">
        <span class="rcard-swatch" :style="{ background: data.swatch.hex }"></span>
        <span class="lab">행운의 컬러</span>
        <span class="val">{{ data.swatch.name }}</span>
      </div>
      <div class="rcard-fact" v-for="f in (data.facts || [])" :key="f.label">
        <span class="ico">{{ f.icon }}</span>
        <span class="lab">{{ f.label }}</span>
        <span class="val">{{ f.value }}</span>
      </div>
    </div>

    <div class="rcard-chips" v-if="data.chips && data.chips.length">
      <span class="rcard-chip" v-for="c in data.chips" :key="c">#{{ c }}</span>
    </div>
  </div>
  `,
  computed: {
    hasFacts() {
      return !!this.data.swatch || (this.data.facts && this.data.facts.length > 0);
    },
  },
};
