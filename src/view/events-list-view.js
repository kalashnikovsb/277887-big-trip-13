import {createElement} from "../utils/render-utils.js";

const getEventsListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class EventsListView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getEventsListTemplate();
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
}
