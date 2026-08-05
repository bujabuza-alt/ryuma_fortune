export const ZODIAC_RANGES = [
  { name: '염소자리', from: [12, 22], to: [1, 19] },
  { name: '물병자리', from: [1, 20], to: [2, 18] },
  { name: '물고기자리', from: [2, 19], to: [3, 20] },
  { name: '양자리', from: [3, 21], to: [4, 19] },
  { name: '황소자리', from: [4, 20], to: [5, 20] },
  { name: '쌍둥이자리', from: [5, 21], to: [6, 21] },
  { name: '게자리', from: [6, 22], to: [7, 22] },
  { name: '사자자리', from: [7, 23], to: [8, 22] },
  { name: '처녀자리', from: [8, 23], to: [9, 22] },
  { name: '천칭자리', from: [9, 23], to: [10, 22] },
  { name: '전갈자리', from: [10, 23], to: [11, 22] },
  { name: '사수자리', from: [11, 23], to: [12, 21] },
];

export function getZodiac(month, day) {
  for (const z of ZODIAC_RANGES) {
    const [fm, fd] = z.from;
    const [tm, td] = z.to;
    if (fm === tm) {
      if (month === fm && day >= fd && day <= td) return z.name;
    } else if (fm > tm) {
      if ((month === fm && day >= fd) || (month === tm && day <= td)) return z.name;
    } else {
      if ((month === fm && day >= fd) || (month === tm && day <= td) || (month > fm && month < tm)) return z.name;
    }
  }
  return '염소자리';
}

/** 띠 — 생년월일 없이 바로 고를 수 있어 진입장벽이 낮음 */
export const CHINESE_ZODIAC = [
  { value: '쥐', label: '쥐띠', emoji: '🐭' },
  { value: '소', label: '소띠', emoji: '🐮' },
  { value: '호랑이', label: '호랑이띠', emoji: '🐯' },
  { value: '토끼', label: '토끼띠', emoji: '🐰' },
  { value: '용', label: '용띠', emoji: '🐲' },
  { value: '뱀', label: '뱀띠', emoji: '🐍' },
  { value: '말', label: '말띠', emoji: '🐴' },
  { value: '양', label: '양띠', emoji: '🐑' },
  { value: '원숭이', label: '원숭이띠', emoji: '🐵' },
  { value: '닭', label: '닭띠', emoji: '🐔' },
  { value: '개', label: '개띠', emoji: '🐶' },
  { value: '돼지', label: '돼지띠', emoji: '🐷' },
];
