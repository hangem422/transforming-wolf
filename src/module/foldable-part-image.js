import Position from './position.js';

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

class FoldablePartImage {
  #width;
  #height;
  #pos;
  #imgPos;
  #achor;

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get pos() {
    return this.#pos;
  }

  get imgPos() {
    return this.#imgPos;
  }

  get achor() {
    return this.#achor;
  }

  /**
   * @param {FoldablePartImageConstructorParam} conf
   */
  constructor(conf) {
    this.#width = conf.width;
    this.#height = conf.height;
    this.#pos = new Position(conf.posX, conf.posY);
    this.#imgPos = new Position(conf.imgPosX, conf.imgPosY);
    this.#achor = new Position(conf.achorX, conf.achorY);
  }
}

export default FoldablePartImage;
