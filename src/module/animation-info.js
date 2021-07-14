/**
 * @typedef {object} AnimationInfoConstructorParam
 * @property {{ from: number, to: number }} rotation 회전 애니메이션
 * @property {{ from: number, to: number }} scale 스케일 애니메이션
 */

class AnimationInfo {
  #rotaionFrom;
  #rotaionTo;
  #scaleFrom;
  #scaleTo;

  /**
   * @param {AnimationInfoConstructorParam} conf
   */
  constructor(conf) {
    this.#rotaionFrom = conf.rotation?.from ?? 0;
    this.#rotaionTo = conf.rotation?.to ?? 0;
    this.#scaleFrom = conf.scale?.from ?? 100;
    this.#scaleTo = conf.scale?.to ?? 100;
  }

  /**
   * @description 애니메이션 진행도에 맞는 회전각도를 반환합니다.
   * @param {number} progress
   * @returns {number} radians
   */
  getRotation(progress) {
    const diff = this.#rotaionTo - this.#rotaionFrom;
    const degree = this.#rotaionFrom + (diff / 100) * progress;
    return (degree * Math.PI) / 180;
  }

  /**
   * @description 애니메이션 진행도에 맞는 크기를 반환합니다.
   * @param {number} progress
   * @returns {number}
   */
  getScale(progress) {
    const diff = this.#scaleTo - this.#scaleFrom;
    const scale = this.#scaleFrom + (diff / 100) * progress;
    return scale;
  }
}

export default AnimationInfo;
