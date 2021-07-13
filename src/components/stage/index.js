import Component from '../../module/component.js';
import Position from '../../module/position.js';
import { hasSomeProp, INVISIBLE_POS } from '../../module/helper.js';

import Wolf from './actors/wolf/index.js';

/**
 * @typedef {object} StageProp
 * @property {number} pixelRatio Stage 해상도 비율
 */

class Stage extends Component {
  #container = document.createElement('div');
  #canvas = document.createElement('canvas');
  #ctx = this.#canvas.getContext('2d');

  #wolf;

  state = {
    stageWidth: 0,
    stageHeight: 0,
    wolfPos: new Position(INVISIBLE_POS, INVISIBLE_POS),
  };

  /** @type {StageProp} */
  prop = {};

  get $element() {
    return this.#container;
  }

  constructor() {
    super();

    this.#container.className = 'stage';
    this.#container.appendChild(this.#canvas);
    window.addEventListener('resize', this.#resize.bind(this));

    this.#wolf = new Wolf();

    this.#animate();
  }

  #resize() {
    const { pixelRatio } = this.prop;

    const stageWidth = this.#container.clientWidth;
    const stageHeight = this.#container.clientHeight;
    const wolfPos = new Position(stageWidth / 2, stageHeight / 2);

    this.#canvas.width = stageWidth * pixelRatio;
    this.#canvas.height = stageHeight * pixelRatio;
    this.#ctx.scale(pixelRatio, pixelRatio);

    this.setState({ stageWidth, stageHeight, wolfPos });
  }

  #animate() {
    window.requestAnimationFrame(this.#animate.bind(this));

    const { stageWidth, stageHeight } = this.state;
    this.#ctx.clearRect(0, 0, stageWidth, stageHeight);

    this.#wolf.draw(this.#ctx);
  }

  render() {
    const { wolfPos } = this.state;

    this.#wolf.setProp({ center: wolfPos, width: 400 });
  }

  componentDidRender(_, preProp) {
    const resize = hasSomeProp(preProp, 'pixelRatio');

    if (resize) this.#resize(); // Stage 해상도 비율이 변경되면, Stage를 리사이즈 합니다.
  }
}

export default Stage;
