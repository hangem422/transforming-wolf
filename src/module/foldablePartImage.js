import Position from './position.js';

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

  constructor(conf) {
    this.#width = conf.width;
    this.#height = conf.height;
    this.#pos = new Position(conf.posX, conf.posY);
    this.#imgPos = new Position(conf.imgPosX, conf.imgPosY);
    this.#achor = new Position(conf.achorX, conf.achorY);
  }
}

export default FoldablePartImage;
