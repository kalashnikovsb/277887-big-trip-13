import {createElement} from "../utils/render-utils.js";

const SHAKE_ANIMATION_TIMEOUT = 600;


export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }


  show() {
    throw new Error(`Abstract method not implemented: show`);
  }


  hide() {
    throw new Error(`Abstract method not implemented: hide`);
  }


  shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
