import AbstractView from "./abstract-view.js";

const createNoTaskTemplate = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};

export default class Loading extends AbstractView {
  getTemplate() {
    return createNoTaskTemplate();
  }
}
