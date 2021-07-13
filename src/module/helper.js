export const INVISIBLE_POS = -5000;

/**
 * @description Map 객체가 해당하는 프로퍼티를 하나라도 가지고 있는지 검증합니다.
 * @param {Map<string, any>} map 검사할 Map 객체
 * @param  {...string} props 검사할 프로퍼티 이름
 * @returns {boolean}
 */
export const hasSomeProp = (map, ...props) => {
  return props.some((prop) => map.has(prop));
};
