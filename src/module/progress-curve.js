import Position from './position.js';
import { bezierCurve } from './helper.js';

const DEGREE_MAX = 10;
const X_MAX = 100;

class ProgressCurve {
  #time;
  #start;
  #midFront;
  #center;
  #midBack;
  #end;

  /**
   * @param {number} time 애니메이션 전체 시간
   * @param {number} degree 곡선 강도
   */
  constructor(time = 1000, degree = 2) {
    const midUnit = (X_MAX * degree) / (2 * DEGREE_MAX);

    this.#start = new Position(0, 0);
    this.#midFront = new Position(midUnit, 0);
    this.#center = new Position(X_MAX / 2, 50);
    this.#midBack = new Position(X_MAX - midUnit, 100);
    this.#end = new Position(X_MAX, 100);
    this.#time = time;
  }

  /**
   * @description 시작 시간과 현재 시간으로 일반적인 애니메이션 진행률을 계산합니다.
   * @param {number} from
   * @param {number} to
   * @returns {number}
   */
  getNormalProcess(from, to, reverse = false) {
    const diff = Math.min(Math.max(to - from, 0), this.#time);
    const res = (diff / this.#time) * 100;

    return reverse ? 100 - res : res;
  }

  /**
   * @description 시작 시간과 현재 시간으로 굴곡진 애니메이션 진행률을 계산합니다.
   * @param {number} from 애니메이션 시작 시간
   * @param {number} to 현재 시간
   * @param {boolean} reverse 반대로 계산
   * @returns {number}
   */
  getProgress(from, to, reverse = false) {
    const normal = this.getNormalProcess(from, to);
    const isFront = normal <= 50;

    const p1 = isFront ? this.#start : this.#center;
    const p2 = isFront ? this.#midFront : this.#midBack;
    const p3 = isFront ? this.#center : this.#end;

    const t = (normal - p1.x) / (p3.x - p1.x);
    const res = bezierCurve(p1.y, p2.y, p3.y, t);

    return reverse ? 100 - res : res;
  }
}

export default ProgressCurve;
