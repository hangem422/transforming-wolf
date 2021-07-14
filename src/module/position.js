class Position {
  #x = 0;
  #y = 0;

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    if (typeof x === 'number') this.#x = x;
    if (typeof y === 'number') this.#y = y;
  }

  /**
   * @description 좌표를 복사합니다.
   * @returns {Position}
   */
  clone() {
    return new Position(this.#x, this.#y);
  }

  /**
   * @description 좌표를 주어진 좌표값 만큼 이동합니다.
   * @param {number} x 이동활 X 좌표
   * @param {number} y 이동할 Y 좌표
   * @returns {Position}
   */
  move(x, y) {
    return new Position(this.#x + x, this.#y + y);
  }

  /**
   * @description 좌표를 새로운 좌표로 이동합니다.
   * @param {number} x 새로운 X 좌표
   * @param {number} y 새로운 Y 좌표
   * @returns {Position}
   */
  moveTo(x, y) {
    return new Position(x, y);
  }

  /**
   * @description 좌표를 일정 비율로 이동합니다.
   * @param {number} ratio 비율
   * @returns {Position}
   */
  rate(ratio) {
    return new Position(this.#x * ratio, this.#y * ratio);
  }
}

export default Position;
