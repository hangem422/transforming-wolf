const APP = {
  animationTime: 700,
  animationDelyRate: 50,
  animationInterval: 2000,
  timeCurve: 10,
};

export const WOLF_ANI = {
  rotation: { from: 0, to: 360 },
  scale: { from: 0, to: 100 },
  head: { rotation: { from: -100, to: 0 } },
  body: {},
  tail: { rotation: { from: -90, to: 0 } },
  legRF: { rotation: { from: 100, to: 0 } },
  legRB: { rotation: { from: -90, to: 0 } },
  legLF: { rotation: { from: 120, to: 0 } },
  legRB: { rotation: { from: -90, to: 0 } },
};

export const BONE_ANI = {
  rotation: { from: 0, to: -360 },
  scale: { from: 0, to: 100 },
  stick: {},
  decoLT: { rotation: { from: -90, to: 0 } },
  decoLB: { rotation: { from: 90, to: 0 } },
  decoRT: { rotation: { from: 90, to: 0 } },
  decoRB: { rotation: { from: -90, to: 0 } },
};

export default APP;
