class Position {
  #x = 0;
  #y = 0;

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  constructor(x, y) {
    if (typeof x === 'number') this.#x = x;
    if (typeof y === 'number') this.#y = y;
  }
}
