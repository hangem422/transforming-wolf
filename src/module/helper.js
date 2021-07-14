export const INVISIBLE_POS = -5000;

/**
 * @description 2차 베지어 곡선 함수입니다.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} t
 * @returns {number}
 */
export const bezierCurve = (a, b, c, t) => {
  return (1 - t) ** 2 * a + 2 * (1 - t) * t * b + t ** 2 * c;
};
