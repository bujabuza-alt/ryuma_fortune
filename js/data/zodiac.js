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
