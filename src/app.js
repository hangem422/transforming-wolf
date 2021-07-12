import Component from './module/component.js';

import Stage from './components/stage/index.js';

class App extends Component {
  #container = document.createElement('div');

  #stage; // 2D Canvs Stage Component

  state = {
    pixelRatio: window.devicePixelRatio > 1 ? 2 : 1,
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

  render() {
    const { pixelRatio } = this.state;

    this.#stage.setProp({ pixelRatio });
  }
}

export default App;
