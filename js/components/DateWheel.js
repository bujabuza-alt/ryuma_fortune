import { ref, computed, watch, onMounted, nextTick } from 'vue';

const ITEM_H = 40; // css .wheel-item height 와 반드시 일치

function daysInMonth(y, m) {
  return new Date(y, m, 0).getDate();
}
function pad(n) {
  return String(n).padStart(2, '0');
}
function parseIso(iso) {
  const mm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!mm) return null;
  return { y: +mm[1], m: +mm[2], d: +mm[3] };
}

/**
 * 스크롤 휠 형태의 생년월일 피커.
 * CSS scroll-snap 이 스냅을 담당하고, JS 는 멈춘 위치를 읽어 값으로 변환한다.
 */
export const DateWheel = {
  props: {
    modelValue: { type: String, default: '' },
    minYear: { type: Number, default: 1940 },
  },
  emits: ['update:modelValue'],
  template: `
  <div class="wheel">
    <div class="wheel-band" aria-hidden="true"></div>

    <div class="wheel-col" ref="colY" @scroll="onScroll('y')">
      <div class="wheel-pad"></div>
      <button type="button" class="wheel-item" v-for="v in years" :key="'y'+v"
              :class="{on: v === y}" @click="jump('y', v)">{{ v }}</button>
      <div class="wheel-pad"></div>
    </div>

    <div class="wheel-col" ref="colM" @scroll="onScroll('m')">
      <div class="wheel-pad"></div>
      <button type="button" class="wheel-item" v-for="v in months" :key="'m'+v"
              :class="{on: v === m}" @click="jump('m', v)">{{ v }}월</button>
      <div class="wheel-pad"></div>
    </div>

    <div class="wheel-col" ref="colD" @scroll="onScroll('d')">
      <div class="wheel-pad"></div>
      <button type="button" class="wheel-item" v-for="v in days" :key="'d'+v"
              :class="{on: v === d}" @click="jump('d', v)">{{ v }}일</button>
      <div class="wheel-pad"></div>
    </div>
  </div>
  `,
  setup(props, { emit }) {
    const maxYear = new Date().getFullYear();
    const init = parseIso(props.modelValue) || { y: 1995, m: 1, d: 1 };

    const y = ref(Math.min(Math.max(init.y, props.minYear), maxYear));
    const m = ref(init.m);
    const d = ref(init.d);

    const colY = ref(null);
    const colM = ref(null);
    const colD = ref(null);

    const years = computed(() => {
      const out = [];
      for (let v = props.minYear; v <= maxYear; v++) out.push(v);
      return out;
    });
    const months = computed(() => Array.from({ length: 12 }, (_, i) => i + 1));
    const days = computed(() => Array.from({ length: daysInMonth(y.value, m.value) }, (_, i) => i + 1));

    const cols = { y: colY, m: colM, d: colD };
    const models = { y, m, d };
    const lists = { y: years, m: months, d: days };

    const locked = { y: false, m: false, d: false };
    const timers = {};

    function scrollToValue(key, smooth = false) {
      const el = cols[key].value;
      if (!el) return;
      const idx = lists[key].value.indexOf(models[key].value);
      if (idx < 0) return;
      locked[key] = true;
      el.scrollTo({ top: idx * ITEM_H, behavior: smooth ? 'smooth' : 'auto' });
      clearTimeout(timers[key + '_lock']);
      timers[key + '_lock'] = setTimeout(() => { locked[key] = false; }, smooth ? 420 : 80);
    }

    function onScroll(key) {
      if (locked[key]) return;
      clearTimeout(timers[key]);
      timers[key] = setTimeout(() => settle(key), 130);
    }

    function settle(key) {
      const el = cols[key].value;
      if (!el || locked[key]) return;
      const list = lists[key].value;
      const idx = Math.min(Math.max(Math.round(el.scrollTop / ITEM_H), 0), list.length - 1);
      models[key].value = list[idx];
    }

    function jump(key, value) {
      models[key].value = value;
      nextTick(() => scrollToValue(key, true));
    }

    // 월/년 변경 시 말일 보정 (예: 3/31 → 2월 선택)
    watch([y, m], () => {
      const max = daysInMonth(y.value, m.value);
      if (d.value > max) {
        d.value = max;
        nextTick(() => scrollToValue('d'));
      }
    });

    watch([y, m, d], () => {
      emit('update:modelValue', `${y.value}-${pad(m.value)}-${pad(d.value)}`);
    });

    // 외부에서 값이 바뀐 경우(초기화 등) 휠 위치 동기화
    watch(() => props.modelValue, (nv) => {
      const p = parseIso(nv);
      if (!p) return;
      if (p.y === y.value && p.m === m.value && p.d === d.value) return;
      y.value = p.y; m.value = p.m; d.value = p.d;
      nextTick(() => { scrollToValue('y'); scrollToValue('m'); scrollToValue('d'); });
    });

    onMounted(() => {
      // 초기 값이 비어 있으면 기본값을 부모에 알려 바로 제출 가능하게 한다
      if (!parseIso(props.modelValue)) {
        emit('update:modelValue', `${y.value}-${pad(m.value)}-${pad(d.value)}`);
      }
      nextTick(() => { scrollToValue('y'); scrollToValue('m'); scrollToValue('d'); });
    });

    return { y, m, d, years, months, days, colY, colM, colD, onScroll, jump };
  },
};
