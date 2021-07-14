import PC from '../../../module/progress-curve.js';
import FPA from '../../../module/foldable-part-animation.js';
import FPO from '../../../module/foldable-part-option.js';

import * as IMAGE from '../../../statics/conf/image-conf.js';
import ANI_APP, * as ANI from '../../../statics/conf/animation-conf.js';
import Base from './base.js';

export const createWolf = () => {
  const { width, height, url } = IMAGE.WOLF_IMG;
  const pc = new PC(ANI_APP.animationTime, ANI_APP.animationInterval);
  const fpa = new FPA(ANI.WOLF_ANI);
  const partOpts = [
    new FPO('legLB', IMAGE.WOLF_IMG.legLB, ANI.WOLF_ANI.legRB),
    new FPO('legLF', IMAGE.WOLF_IMG.legLF, ANI.WOLF_ANI.legLF),
    new FPO('tail', IMAGE.WOLF_IMG.tail, ANI.WOLF_ANI.tail),
    new FPO('head', IMAGE.WOLF_IMG.head, ANI.WOLF_ANI.head),
    new FPO('body', IMAGE.WOLF_IMG.body, ANI.WOLF_ANI.body),
    new FPO('legRF', IMAGE.WOLF_IMG.legRF, ANI.WOLF_ANI.legRF),
    new FPO('legRB', IMAGE.WOLF_IMG.legRB, ANI.WOLF_ANI.legRB),
  ];

  return new Base(url, width, height, pc, fpa, partOpts);
};

export const createBone = () => {
  const { width, height, url } = IMAGE.BONE_IMG;
  const pc = new PC(ANI_APP.animationTime, ANI_APP.animationInterval);
  const fpa = new FPA(ANI.BONE_ANI);
  const partOpts = [
    new FPO('decoLT', IMAGE.BONE_IMG.decoLT, ANI.BONE_ANI.decoLT),
    new FPO('decoLB', IMAGE.BONE_IMG.decoLB, ANI.BONE_ANI.decoLB),
    new FPO('decoRT', IMAGE.BONE_IMG.decoRT, ANI.BONE_ANI.decoRT),
    new FPO('decoRB', IMAGE.BONE_IMG.decoRB, ANI.BONE_ANI.decoRB),
    new FPO('stick', IMAGE.BONE_IMG.stick, ANI.BONE_ANI.stick),
  ];

  return new Base(url, width, height, pc, fpa, partOpts);
};
