export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randScore() {
  return Math.floor(Math.random() * 3) + 3; // 3~5
}
