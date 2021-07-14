import Component, { hasSomeProp } from '../../../module/component.js';
import Position from '../../../module/position.js';
import { INVISIBLE_POS } from '../../../module/helper.js';
import FoldablePartImage from '../../../module/foldablePartImage.js';
import ProgressCurve from '../../../module/progressCurve.js';

import WOLF from '../../../statics/conf/wolf-conf.js';
import ANI from '../../../statics/conf/animation-conf.js';
import Part from './part.js';

/**
 * @typedef {object} WolfProp
 * @property {Position} center 개체 중앙 좌표
 * @property {number} width 개체 가로 크기
 * @property {boolean} show 등장 여부
 */

class Wolf extends Component {
  #img = new Image(); // Split Image Element
  #progressCurve = new ProgressCurve(ANI.animationTime); // 등장 에니메이션 진행도 커브 그래프
  #preDrawingTime = 0; // 최근 Draw된 시간
  #animationStartTime = -Infinity; // 최근 에니메이션 시작 시간
  #parts = []; // 부속품 개체 배열

  state = {
    imgLoad: false, // 이미지 로드 여부
    pos: new Position(INVISIBLE_POS, INVISIBLE_POS), // 늑대 개체 좌상단 좌표 값
    ratio: 1, // 크기 비율
  };

  /** @type {WolfProp} */
  prop = {};

  constructor() {
    super();

    this.#img.onload = () => this.setState({ imgLoad: true });
    this.#img.src = '/src/statics/image/wolf-parts.png';

    this.#parts = [
      new Part(new FoldablePartImage(WOLF.legLB)),
      new Part(new FoldablePartImage(WOLF.legLF)),
      new Part(new FoldablePartImage(WOLF.tail)),
      new Part(new FoldablePartImage(WOLF.head)),
      new Part(new FoldablePartImage(WOLF.body)),
      new Part(new FoldablePartImage(WOLF.legRF)),
      new Part(new FoldablePartImage(WOLF.legRB)),
    ];
  }

  /**
   * @description 늑대 개체의 위치와 크기를 재설정합니다.
   */
  #reflow() {
    const { width, center } = this.prop;
    const ratio = width / WOLF.width;
    const height = WOLF.height * ratio;
    const pos = center.move(-width / 2, -height / 2);

    this.setState({ pos, ratio });
  }

  /**
   * @description 개체의 다음 장면을 화면에 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} time
   */
  draw(ctx, time) {
    const { pos, imgLoad } = this.state;
    const { show } = this.prop;
    if (imgLoad === false) return;

    this.#preDrawingTime = time;
    const progress = this.#progressCurve.getProgress(
      this.#animationStartTime,
      time,
      !show,
    );

    ctx.save();
    ctx.translate(pos.x, pos.y);
    this.#parts.forEach((part) => part.draw(ctx));
    ctx.restore();
  }

  render() {
    const { ratio } = this.state;
    this.#parts.forEach((part) => part.setProp({ ratio, img: this.#img }));
  }

  componentDidUpdate(_, preProp) {
    const reflow = hasSomeProp(preProp, 'center', 'width');
    const visible = hasSomeProp(preProp, 'show');

    if (reflow) this.#reflow(); // 개체의 location과 관련된 값이 변하면, 재배치를 진행합니다.
    if (visible) this.#animationStartTime = this.#preDrawingTime; // 개체의 등장 여부가 변하면 에니메이션을 시작합니다.
  }
}

export default Wolf;
