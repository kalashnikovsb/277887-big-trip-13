import AbstractView from "./abstract-view.js";


const getNoEventsNoticeTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};


export default class NoEventsNotice extends AbstractView {
  getTemplate() {
    return getNoEventsNoticeTemplate();
  }
}
