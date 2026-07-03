export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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
