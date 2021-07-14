import Component from './module/component.js';
import ANI from './statics/conf/animation-conf.js';

import Stage from './components/stage/index.js';

class App extends Component {
  #container = document.createElement('div'); // Element Container
  #autoAction = null; // 자동 에니메이션 Interval Handler

  #stage; // 2D Canvs Stage Component

  state = {
    pixelRatio: window.devicePixelRatio > 1 ? 2 : 1, // 화면 해상도 비율
    showWolf: false, // 늑대 등장 여부
  };

  get $element() {
    return this.#container;
  }

  constructor() {
    super();

    this.#stage = new Stage();

    this.#container.className = 'app';
    this.#container.appendChild(this.#stage.$element);
  }

  /**
   * @description 각 개체의 등장 여부를 주기적으로 전환하는 Interval을 생성합니다.
   */
  #setAutoAction() {
    this.#autoAction = setInterval(() => {
      const { showWolf } = this.state;
      this.setState({ showWolf: !showWolf });
    }, ANI.animationInterval);
  }

  /**
   * @description 각 개체의 등장 여부를 주기적으로 전환하는 Interval을 제거합니다.
   */
  #stopAutoAction() {
    if (this.#autoAction) {
      clearInterval(this.#autoAction);
      this.#autoAction = null;
    }
  }

  componentDidMount() {
    this.#setAutoAction();
  }

  render() {
    const { pixelRatio, showWolf } = this.state;
    this.#stage.setProp({ pixelRatio, showWolf });
  }
}

export default App;
