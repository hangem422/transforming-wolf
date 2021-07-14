import Component, { hasSomeProp } from '../../../module/component.js';
import Position from '../../../module/position.js';
import { INVISIBLE_POS } from '../../../module/helper.js';
import FoldablePartImage from '../../../module/foldablePartImage.js';

/**
 * @typedef {object} PartProp
 * @property {number} ratio 개체 크기 비율
 * @property {HTMLImageElement} img 스플릿 이미지 엘리먼트
 */

class Part extends Component {
  #opt;

  state = {
    pos: new Position(INVISIBLE_POS, INVISIBLE_POS), // 개체 부품의 위치 좌표
    achor: new Position(INVISIBLE_POS, INVISIBLE_POS), // 개체 부품의 앵커 좌표
    width: 0, // 개체 부품의 가로 크기
    height: 0, // 개체 부품의 세로 크기
  };

  /** @type {PartProp} */
  prop = {};

  /**
   * @param {FoldablePartImage} opt 개체 설정
   */
  constructor(opt) {
    super();
    this.#opt = opt;
  }

  /**
   * @description 개체 부품의 위치와 크기를 재설정합니다.
   */
  #reflow() {
    const { ratio } = this.prop;

    const pos = this.#opt.pos.rate(ratio);
    const achor = this.#opt.achor.rate(ratio);
    const width = this.#opt.width * ratio;
    const height = this.#opt.height * ratio;

    this.setState({ pos, achor, width, height });
  }

  /**
   * @description 개체 부품의 다음 장면을 화면에 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} progress
   */
  draw(ctx, progress) {
    const { pos, achor, width, height } = this.state;
    const { img } = this.prop;

    const ctxX = pos.x + achor.x;
    const ctxY = pos.y + achor.y;

    ctx.save();
    ctx.translate(ctxX, ctxY);
    ctx.drawImage(
      img,
      this.#opt.imgPos.x,
      this.#opt.imgPos.y,
      this.#opt.width,
      this.#opt.height,
      -achor.x,
      -achor.y,
      width,
      height,
    );

    ctx.restore();
  }

  componentDidMount() {
    this.#reflow();
  }

  render() {}

  componentDidRender(_, preProp) {
    const reflow = hasSomeProp(preProp, 'ratio');
    if (reflow) this.#reflow();
  }
}

export default Part;
