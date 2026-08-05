import { DRAW_CONTENTS } from './draws.js';
import { QUIZ_CONTENTS } from './quizzes.js';
import { PROFILE_CONTENTS } from './profiles.js';
import { dayOfYearIndex, rotateByDay } from '../../utils.js';

export { DRAW_CONTENTS, QUIZ_CONTENTS, PROFILE_CONTENTS };

/** 전체 콘텐츠 (포맷 A/B/C 통합) */
export const ALL_CONTENTS = [...DRAW_CONTENTS, ...PROFILE_CONTENTS, ...QUIZ_CONTENTS];

export function findContent(id) {
  return ALL_CONTENTS.find((c) => c.id === id) || null;
}

/** 날짜가 바뀌면 오늘의 대표 콘텐츠도 바뀐다 */
export function featuredFor(date = new Date()) {
  return ALL_CONTENTS[dayOfYearIndex(ALL_CONTENTS.length, date)];
}

/** 날짜에 따라 노출 순서를 회전 — 매일 다른 콘텐츠가 위로 올라온다 */
export function rotatedDraws(date = new Date()) {
  return rotateByDay(DRAW_CONTENTS, date);
}

export function rotatedQuizzes(date = new Date()) {
  return rotateByDay(QUIZ_CONTENTS, date);
}

export function rotatedProfiles(date = new Date()) {
  return rotateByDay(PROFILE_CONTENTS, date);
}
