import Component, { hasSomeProp } from '../../../module/component.js';
import Position from '../../../module/position.js';
import { INVISIBLE_POS } from '../../../module/helper.js';
import FPA from '../../../module/foldable-part-animation.js';
import FPO from '../../../module/foldable-part-option.js';
import PC from '../../../module/progress-curve.js';

import Part from './part.js';

/**
 * @typedef {object} BaseProp
 * @property {Position} center 개체 중앙 좌표
 * @property {number} width 개체 가로 크기
 * @property {boolean} show 등장 여부
 */

class Base extends Component {
  #img = new Image(); // Split Image Element
  #parts = []; // 부속품 개체 배열

  #pdt = 0; // 최근 Draw된 시간 (previous drawing time)
  #ast = -Infinity; // 최근 애니메이션 시작 시간 (animation start time)

  #orgWidth; // 완성 이미지 원본 가로 크기
  #orgHeight; // 완성 이미지 원본 크기 세로
  #partAniDelay;
  #pc; // 등장 애니메이션 진행도 커브 그래프 (progress curve)
  #fpa; // 접이식 개체 애니메이션 정보 (fordable part animation)

  state = {
    imgLoad: false, // 이미지 로드 여부
    padding: new Position(INVISIBLE_POS, INVISIBLE_POS), // 개체 좌상단 좌표와 중앙 좌표의 거리
    ratio: 1, // 크기 비율
  };

  /** @type {BaseProp} */
  prop = {};

  /**
   * @param {string} imgUrl 이미지 리소스 주소
   * @param {number} orgWidth origin image width
   * @param {number} orgHeight origin image height
   * @param {PC} pc progress curve
   * @param {FPA} fpa fordable part animation
   * @param {FPO[]} partOpts fordable part options
   * @param {number?} partAniDelay 개체 구성 부품 에니메이션 딜레이 비율
   */
  constructor(imagUrl, orgWidth, orgHeight, pc, fpa, partOpts, partAniDelay) {
    super();

    this.#img.onload = () => this.setState({ imgLoad: true });
    this.#img.src = imagUrl;
    this.#orgWidth = orgWidth;
    this.#orgHeight = orgHeight;
    this.#partAniDelay = partAniDelay ?? 0;

    this.#pc = pc;
    this.#fpa = fpa;
    this.#parts = partOpts.map((opt) => new Part(opt));
  }

  /**
   * @description 개체의 위치와 크기를 재설정합니다.
   */
  #reflow() {
    const { width } = this.prop;
    const ratio = width / this.#orgWidth;
    const height = this.#orgHeight * ratio;
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
    const childProcess = PC.delayProgress(progress, this.#partAniDelay);
    const rotation = this.#fpa.getRotation(progress);
    const scale = this.#fpa.getScale(progress) / 100;

    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    ctx.translate(padding.x, padding.y);
    this.#parts.forEach((part) => part.draw(ctx, childProcess));
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

export default Base;
