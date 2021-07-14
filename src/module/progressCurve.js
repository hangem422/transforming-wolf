import Position from './position.js';
import { bezierCurve } from './helper.js';

const DEGREE_MAX = 10;

class ProgressCurve {
  #time;
  #start;
  #midFront;
  #center;
  #midBack;
  #end;

  /**
   * @param {number} time 에니메이션 전체 시간
   * @param {number} degree 곡선 강도
   */
  constructor(time = 1000, degree = 2) {
    const midUnit = (time * degree) / (2 * DEGREE_MAX);

    this.#start = new Position(0, 0);
    this.#midFront = new Position(midUnit, 0);
    this.#center = new Position(time / 2, 50);
    this.#midBack = new Position(100 - midUnit, 100);
    this.#end = new Position(time, 100);
    this.#time = time;
  }

  /**
   * @description 제한 범위 안에서의 시간 변화를 반환합니다.
   * @param {number} from
   * @param {number} to
   * @returns {number}
   */
  getSpendTime(from, to) {
    const diff = to - from;

    if (diff < 0) return 0;
    if (diff > this.#time) return this.#time;
    return diff;
  }

  /**
   * @description 시작 시간과 현재 시간으로 에니메이션 진행률을 계산합니다.
   * @param {number} start 에니메이션 시작 시간
   * @param {number} cur 현재 시간
   * @param {boolean} reverse 반대로 계산
   * @returns {number}
   */
  getProgress(start, cur, reverse = false) {
    const spend = this.getSpendTime(start, cur);
    const isFront = spend <= this.#time / 2;

    const p1 = isFront ? this.#start : this.#center;
    const p2 = isFront ? this.#midFront : this.#midBack;
    const p3 = isFront ? this.#center : this.#end;

    const t = (spend - p1.x) / (p3.x - p1.x);
    const res = bezierCurve(p1.y, p2.y, p3.y, t);

    return reverse ? 100 - res : res;
  }
}

export default ProgressCurve;
