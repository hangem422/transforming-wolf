import Component, { hasSomeProp } from '../../module/component.js';
import Position from '../../module/position.js';
import { INVISIBLE_POS } from '../../module/helper.js';

import { WOLF_IMG, BONE_IMG } from '../../statics/conf/image-conf.js';
import * as actors from './actors/index.js';

/**
 * @typedef {object} StageProp
 * @property {number} pixelRatio Stage 해상도 비율
 * @property {boolean} showWolf 늑대 등장 여부
 * @property {boolean} showBone 뼈다귀 등장 여부
 */

class Stage extends Component {
  #container = document.createElement('div'); // Element Container
  #canvas = document.createElement('canvas'); // Main Canvas
  #ctx = this.#canvas.getContext('2d'); // Context of main canvas

  #wolf; // 늑대 개체
  #bone; // 뺘다귀 개체

  state = {
    stageWidth: 0, // Official Canvas Width
    stageHeight: 0, // Official Canvas Height
    wolfPos: new Position(INVISIBLE_POS, INVISIBLE_POS), // 늑대 위치 좌표
    bonePos: new Position(INVISIBLE_POS, INVISIBLE_POS), // 뼈다귀 위치 좌표
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

    this.#wolf = actors.createWolf();
    this.#bone = actors.createBone();
  }

  /**
   * @description Canvas의 크기를 재설정합니다.
   */
  #resize() {
    const { pixelRatio } = this.prop;

    const stageWidth = this.#container.clientWidth;
    const stageHeight = this.#container.clientHeight;
    const wolfPos = new Position(stageWidth / 2, stageHeight / 2);
    const bonePos = wolfPos.clone();

    this.#canvas.width = stageWidth * pixelRatio;
    this.#canvas.height = stageHeight * pixelRatio;
    this.#ctx.scale(pixelRatio, pixelRatio);

    this.setState({ stageWidth, stageHeight, wolfPos, bonePos });
  }

  /**
   * @description 다음 화면을 canvas에 그립니다.
   * @param {number} time Event 경과 시간
   */
  #animate(time) {
    window.requestAnimationFrame(this.#animate.bind(this));

    const { stageWidth, stageHeight } = this.state;
    this.#ctx.clearRect(0, 0, stageWidth, stageHeight);

    this.#wolf.draw(this.#ctx, time);
    this.#bone.draw(this.#ctx, time);
  }

  componentDidMount() {
    window.addEventListener('resize', this.#resize.bind(this));
    window.requestAnimationFrame(this.#animate.bind(this));

    this.#resize();
  }

  componentDidUpdate(_, preProp) {
    const resize = hasSomeProp(preProp, 'pixelRatio');
    if (resize) this.#resize(); // Stage 해상도 비율이 변경되면, Stage를 리사이즈 합니다.
  }

  render() {
    const { wolfPos, bonePos } = this.state;
    const { showWolf, showBone } = this.prop;

    this.#wolf.setProp({
      center: wolfPos,
      width: WOLF_IMG.width,
      show: showWolf,
    });

    this.#bone.setProp({
      center: bonePos,
      width: BONE_IMG.width,
      show: showBone,
    });
  }
}

export default Stage;
