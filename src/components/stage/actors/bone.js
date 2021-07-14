import Component, { hasSomeProp } from '../../../module/component.js';
import Position from '../../../module/position.js';
import { INVISIBLE_POS } from '../../../module/helper.js';
import FPI from '../../../module/foldable-part-image.js';
import AI from '../../../module/animation-info.js';
import PC from '../../../module/progress-curve.js';

import { BONE_IMG } from '../../../statics/conf/image-conf.js';
import ANI, { BONE_ANI } from '../../../statics/conf/animation-conf.js';
import Part from './part.js';

/**
 * @typedef {object} BoneProp
 * @property {Position} center 개체 중앙 좌표
 * @property {number} width 개체 가로 크기
 * @property {boolean} show 등장 여부
 */

class Bone extends Component {
  #img = new Image(); // Split Image Element
  #pc = new PC(ANI.animationTime, ANI.timeCurve); // 등장 애니메이션 진행도 커브 그래프 (progress curve)
  #ai = new AI(BONE_ANI); // 개체 애니메이션 정보 (animation information)
  #pdt = 0; // 최근 Draw된 시간 (previous drawing time)
  #ast = Infinity; // 최근 애니메이션 시작 시간 (animation start time)
  #parts = []; // 부속품 개체 배열

  state = {
    imgLoad: false, // 이미지 로드 여부
    padding: new Position(INVISIBLE_POS, INVISIBLE_POS), // 개체 좌상단 좌표와 중앙 좌표의 거리
    ratio: 1, // 크기 비율
  };

  /** @type {BoneProp} */
  prop = {};

  constructor() {
    super();

    this.#img.onload = () => this.setState({ imgLoad: true });
    this.#img.src = '/src/statics/image/bone-parts.png';

    this.#parts = [
      new Part('decoLT', new FPI(BONE_IMG.decoLT), new AI(BONE_ANI.decoLT)),
      new Part('decoLB', new FPI(BONE_IMG.decoLB), new AI(BONE_ANI.decoLB)),
      new Part('decoRT', new FPI(BONE_IMG.decoRT), new AI(BONE_ANI.decoRT)),
      new Part('decoRB', new FPI(BONE_IMG.decoRB), new AI(BONE_ANI.decoRB)),
      new Part('stick', new FPI(BONE_IMG.stick), new AI(BONE_ANI.stick)),
    ];
  }

  /**
   * @description 개체의 위치와 크기를 재설정합니다.
   */
  #reflow() {
    const { width } = this.prop;
    const ratio = width / BONE_IMG.width;
    const height = BONE_IMG.height * ratio;
    const padding = new Position(-width / 2, -height / 2);

    this.setState({ padding, ratio });
  }

  /**
   * @description 개체의 다음 장면을 화면에 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} time
   */
  draw(ctx, time) {
    const { padding, imgLoad } = this.state;
    const { center, show } = this.prop;
    if (imgLoad === false) return;

    this.#pdt = time;
    const progress = this.#pc.getProgress(this.#ast, time, !show);
    const rotation = this.#ai.getRotation(progress);
    const scale = this.#ai.getScale(progress) / 100;

    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    ctx.translate(padding.x, padding.y);
    this.#parts.forEach((part) => part.draw(ctx, progress));
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
    if (visible) this.#ast = this.#pdt; // 개체의 등장 여부가 변하면 애니메이션을 시작합니다.
  }
}

export default Bone;
