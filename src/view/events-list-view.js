import AbstractView from "./abstract-view.js";


const getEventsListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};


export default class EventsListView extends AbstractView {
  getTemplate() {
    return getEventsListTemplate();
  }
}
