import Component from '../../../../module/component.js';
import Position from '../../../../module/position.js';
import { hasSomeProp, INVISIBLE_POS } from '../../../../module/helper.js';
import conf from '../../../../statics/conf/wolf-conf.js';

import PartOption from './part-option.js';
import Part from './part.js';

/**
 * @typedef {object} WolfProp
 * @property {Position} center 개체 중앙 좌표
 * @property {number} width 개체 가로 크기
 */

class Wolf extends Component {
  #img = new Image();
  #parts = [];

  state = {
    imgLoad: false,
    pos: new Position(INVISIBLE_POS, INVISIBLE_POS),
    ratio: 1,
  };

  /** @type {WolfProp} */
  prop = {};

  constructor() {
    super();

    this.#img.onload = this.#load.bind(this);
    this.#img.src = '/src/statics/image/wolf-parts.png';

    this.#parts = [
      new Part(new PartOption(conf.legLB)),
      new Part(new PartOption(conf.legLF)),
      new Part(new PartOption(conf.tail)),
      new Part(new PartOption(conf.head)),
      new Part(new PartOption(conf.body)),
      new Part(new PartOption(conf.legRF)),
      new Part(new PartOption(conf.legRB)),
    ];
  }

  #load() {
    this.setState({ imgLoad: true });
  }

  #relocate() {
    const { width, center } = this.prop;
    const ratio = width / conf.width;
    const height = conf.height * ratio;
    const pos = center.move(-width / 2, -height / 2);

    this.setState({ pos, ratio });
  }

  /**
   * @description 개체를 화면에 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    const { pos, imgLoad } = this.state;
    if (imgLoad === false) return;

    ctx.save();
    ctx.translate(pos.x, pos.y);
    this.#parts.forEach((part) => part.draw(ctx));
    ctx.restore();
  }

  render() {
    const { ratio } = this.state;
    this.#parts.forEach((part) => part.setProp({ ratio, img: this.#img }));
  }

  componentDidRender(_, preProp) {
    const relocate = hasSomeProp(preProp, 'center', 'width');
    if (relocate) this.#relocate(); // 개체의 location과 관련된 값이 변하면, 재배치를 진행합니다.
  }
}

export default Wolf;
