import AbstractView from "./abstract-view.js";


const getEmptyEventsListTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};


export default class EmptyEventsListView extends AbstractView {
  getTemplate() {
    return getEmptyEventsListTemplate();
  }
}
