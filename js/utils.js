export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function pickN(arr, n) {
  const rest = [...arr];
  const out = [];
  while (out.length < n && rest.length) {
    out.push(rest.splice(Math.floor(Math.random() * rest.length), 1)[0]);
  }
  return out;
}

export function randScore() {
  return Math.floor(Math.random() * 3) + 3; // 3~5
}

export function dayOfYearIndex(len, date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const day = Math.floor(diff / 86400000);
  return day % len;
}

export function todayKey(date = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

export function hashCode(str) {
  let h = 0;
  for (let i = 0; i < String(str).length; i++) {
    h = (h << 5) - h + String(str).charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** 같은 seed면 항상 같은 결과 — 날짜별 고정 결과에 사용 */
export function seededPick(arr, seed) {
  return arr[hashCode(seed) % arr.length];
}

export function seededScore(seed) {
  return (hashCode(seed) % 3) + 3; // 3~5
}

/** 날짜에 따라 배열 순서를 회전시켜 매일 다른 순서로 노출 */
export function rotateByDay(arr, date = new Date()) {
  if (!arr.length) return arr;
  const off = dayOfYearIndex(arr.length, date);
  return [...arr.slice(off), ...arr.slice(0, off)];
}

export function formatBirth(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${y}.${m}.${d}`;
}
