import Component from '../../module/component.js';

/**
 * @typedef {object} StageProp
 * @property {number} pixelRatio Stage 해상도 비율
 */

class Stage extends Component {
  #container = document.createElement('div');
  #canvas = document.createElement('canvas');
  #ctx = this.#canvas.getContext('2d');

  state = {
    stageWidth: this.#container.clientWidth,
    stageHeight: this.#container.clientHeight,
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
    this.#container.addEventListener('resize', this.#resize.bind(this));

    this.#animate();
  }

  #resize() {
    const { pixelRatio } = this.prop;

    const stageWidth = this.#container.clientWidth;
    const stageHeight = this.#container.clientHeight;

    this.#canvas.width = stageWidth * pixelRatio;
    this.#canvas.height = stageHeight * pixelRatio;
    this.#ctx.scale(pixelRatio, pixelRatio);

    this.setState({ stageWidth, stageHeight });
  }

  #animate() {}

  render() {
    console.log(this.state);
  }

  componentDidRender(_, preProp) {
    const pixelRatioChange = this.prop.pixelRatio !== preProp.pixelRatio;

    // Stage 해상도 비율이 변경되면, Stage를 리사이즈 합니다.
    if (pixelRatioChange) this.#resize();
  }
}

export default Stage;
