import AbstractView from "./abstract-view.js";

export default class SmartView extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update) {
    if (!update) {
      return;
    }
    this._data = Object.assign(
        {},
        this._data,
        update
    );
    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    // Проверка чтобы не было ошибки в хроме
    if (!parent) {
      return;
    }
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
