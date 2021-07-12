const _pendding = new WeakMap();

class Component {
  #init = false;

  state = {};
  prop = {};

  constructor() {
    Promise.resolve().then(() => {
      if (this.#init) return;
      this.#init = true;
      this.preRender();
    });
  }

  /**
   * @description 상태값을 변경합니다.
   * @param {{ [key: string]: any }} state 변경할 상태값
   */
  setState(state) {
    const throttle = _pendding.has(this); // 반영되길 기다리는 이전 setState의 실행 여부를 체크합니다.
    const nextState = throttle ? _pendding.get(this) : { ...this.state };
    let needRender = false;

    // 변경 사항들을 반영합니다.
    Object.entries(state).forEach(([key, value]) => {
      if (nextState[key] !== undefined && nextState[key] !== value) {
        nextState[key] = value;
        if (!needRender) needRender = true;
      }
    });

    if (needRender && !throttle) {
      _pendding.set(this, nextState);

      Promise.resolve().then(() => {
        // 대기중인 최종 state를 반영합니다.
        const preState = this.state;
        this.state = _pendding.get(this);

        // 대기중을 해제하고 컴포넌트를 렌더합니다.
        _pendding.delete(this);
        this.preRender(preState, this.prop);

        return { ...preState };
      });
    }
  }

  /**
   * @description 프로퍼티를 변경합니다.
   * @param {{{ [key: string]: any }}} prop 변경한 프로퍼티
   */
  setProp(prop) {
    const nextProp = {};
    let needRender = false;

    Object.entries(prop).forEach(([key, value]) => {
      nextProp[key] = value;
      if (!needRender) needRender = this.prop[key] !== value;
    });

    if (needRender) {
      // 프로퍼티에 변경사항이 있으면 컴포넌트를 렌더합니다.
      const preProp = this.prop;
      this.prop = nextProp;
      this.preRender(this.state, preProp);
    }
  }

  /**
   * @description 컴포넌트 랜더를 진행하기 전에 사전 작업을 진행합니다.
   * @param {{ [key: string]: any }} preState 이전 상태값
   * @param {{ [key: string]: any }} preProp 이전 프러퍼티
   */
  preRender(preState, preProp) {
    if (this.#init === false) this.#init = true;
    Promise.resolve().then(() => this.componentDidRender(preState, preProp));

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
   * @description Application의 전체 렌더가 종료되면 호출됩니다.
   * @param {{ [key: string]: any }} preState 이전 상태값
   * @param {{ [key: string]: any }} preProp 이전 프러퍼티
   */
  componentDidRender() {}
}

export default Component;
