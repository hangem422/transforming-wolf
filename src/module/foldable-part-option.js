import FoldablePartImage from './foldable-part-image.js';
import FoldablePartAnimation from './foldable-part-animation.js';

/**
 * @typedef {object} FoldablePartImageConstructorParam
 * @property {number} width 이미지 가로 크기
 * @property {number} height 이미지 세로 크기
 * @property {number} posX 완성 이미지에서 부분 이미지 가로 좌표
 * @property {number} posY 완성 이미지에서 부분 이미지 세로 좌표
 * @property {number} imgPosX 스플릿 이미지에서 부분 이미지 가로 좌표
 * @property {number} imgPosY 스플릿 이미지에서 부분 이미지 세로 좌표
 * @property {number} achorX 부분 이미지에서 앵커 포인트 가로 좌표
 * @property {number} achorY 부분 이미지에서 앵커 포인트 세로 좌표
 */

/**
 * @typedef {object} FoldablePartAnimationConstructorParam
 * @property {{ from: number, to: number }} rotation 회전 애니메이션
 * @property {{ from: number, to: number }} scale 스케일 애니메이션
 */

class FoldablePartOption {
  #name;
  #img;
  #ani;

  get name() {
    return this.#name;
  }

  get img() {
    return this.#img;
  }

  get ani() {
    return this.#ani;
  }

  /**
   * @param {string} name 개체 이름
   * @param {FoldablePartImageConstructorParam} img 개체 이미지 정보
   * @param {FoldablePartAnimationConstructorParam} ani 개체 애니메이션 정보
   */
  constructor(name, imgConf, aniConf) {
    this.#name = name;
    this.#img = new FoldablePartImage(imgConf);
    this.#ani = new FoldablePartAnimation(aniConf);
  }
}

export default FoldablePartOption;
