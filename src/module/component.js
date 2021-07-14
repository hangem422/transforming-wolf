const _pendding = new WeakMap();
const _penddingPreProp = new WeakMap();

class Component {
  #init = false;

  state = {};
  prop = {};

  constructor() {
    Promise.resolve().then(() => {
      if (this.#init) return;
      this.preRender();
    });
  }

  /**
   * @description 상태값을 변경합니다.
   * @param {{ [key: string]: any }} state 변경할 상태값
   */
  setState(state) {
    const debounce = _pendding.has(this); // 반영되길 기다리는 이전 setState의 실행 여부를 체크합니다.
    const nextState = debounce ? _pendding.get(this) : { ...this.state };
    let needRender = false;

    // 변경 사항들을 반영합니다.
    Object.entries(state).forEach(([key, value]) => {
      if (nextState[key] !== undefined && nextState[key] !== value) {
        nextState[key] = value;
        if (!needRender) needRender = true;
      }
    });

    if (needRender && !debounce) {
      _pendding.set(this, nextState);

      Promise.resolve().then(() => {
        // 대기중인 최종 state를 반영합니다.
        const preState = new Map();
        const preProp = _penddingPreProp.get(this);
        const nextState = _pendding.get(this);

        // 변경된 state의 이전 값을 저장합니다.
        Object.keys(nextState).forEach((key) => {
          preState.set(key, this.state[key]);
        });

        // 대기중을 해제하고 컴포넌트를 렌더합니다.
        if (preProp) _penddingPreProp.delete(this);
        _pendding.delete(this);

        this.state = nextState;
        this.preRender(preState, preProp || new Map());
      });
    }
  }

  /**
   * @description 프로퍼티를 변경합니다.
   * @param {{{ [key: string]: any }}} prop 변경한 프로퍼티
   */
  setProp(prop) {
    const nextProp = {};
    const preProp = new Map();

    Object.entries(prop).forEach(([key, value]) => {
      if (this.prop[key] !== value) preProp.set(key, this.prop[key]);
      nextProp[key] = value;
    });

    if (preProp.size) {
      // 프로퍼티에 변경사항이 있으면 컴포넌트를 렌더합니다.
      // 만약 대기중인 state Render가 있을 경우 render를 유예시킵니다.
      this.prop = nextProp;

      if (_pendding.has(this)) _penddingPreProp.set(this, preProp);
      else this.preRender(new Map(), preProp);
    }
  }

  /**
   * @description 컴포넌트 랜더를 진행하기 전에 사전 작업을 진행합니다.
   * @param {Map<string, any>} preState 이전 상태값
   * @param {Map<string, any>} preProp 이전 프러퍼티
   */
  preRender(preState, preProp) {
    let afterRenderFunc = () => this.componentDidUpdate(preState, preProp);

    // 치기화가 진행되지 않은 상태면 render 후 componentDidMount를 실행합니다.
    if (this.#init === false) {
      afterRenderFunc = () => this.componentDidMount();
      this.#init = true;
    }

    Promise.resolve().then(afterRenderFunc);
    this.render();
  }

  /**
   * @description 컴포넌트를 렌더합니다.
   */
  render() {
    const proto = Object.getPrototypeOf(this);
    const name = proto?.constructor.name ?? 'Unknown';
    console.warn(`${name} component did not override the render function.`);
  }

  /**
   * @description Component가 처음 렌더된 후에 호출됩니다.
   */
  componentDidMount() {}

  /**
   * @description Component가 업데이트 된 후에 호출됩니다.
   * @param {Map<string, any>} preState 이전 상태값
   * @param {Map<string, any>} preProp 이전 프러퍼티
   */
  componentDidUpdate(preState, preProp) {}
}

/**
 * @description Map 객체가 해당하는 프로퍼티를 하나라도 가지고 있는지 검증합니다.
 * @param {Map<string, any>} map 검사할 Map 객체
 * @param  {...string} props 검사할 프로퍼티 이름
 * @returns {boolean}
 */
export const hasSomeProp = (map, ...props) => {
  return props.some((prop) => map.has(prop));
};

export default Component;
