import Component from '../../../../module/component.js';
import Position from '../../../../module/position.js';
import { hasSomeProp, INVISIBLE_POS } from '../../../../module/helper.js';

import PartOption from './part-option.js';

/**
 * @typedef {object} PartProp
 * @property {number} ratio 개체 크기 비율
 * @property {HTMLImageElement} img 스플릿 이미지 엘리먼트
 */

class Part extends Component {
  #opt;

  state = {
    pos: new Position(INVISIBLE_POS, INVISIBLE_POS),
    achor: new Position(INVISIBLE_POS, INVISIBLE_POS),
    width: 0,
    height: 0,
  };

  /** @type {PartProp} */
  prop = {};

  /**
   * @param {PartOption} opt 개체 설정
   */
  constructor(opt) {
    super();
    this.#opt = opt;
  }

  #relocate() {
    const { ratio } = this.prop;

    const pos = this.#opt.pos.rate(ratio);
    const achor = this.#opt.achor.rate(ratio);
    const width = this.#opt.width * ratio;
    const height = this.#opt.height * ratio;

    this.setState({ pos, achor, width, height });
  }

  /**
   * @description 개체를 화면에 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
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

  render() {}

  componentDidRender(_, preProp) {
    const relocate = hasSomeProp(preProp, 'ratio');
    if (relocate) this.#relocate();
  }
}

export default Part;
