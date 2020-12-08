import {render, replace} from "../utils/render-utils.js";
import TripInformationView from "../view/trip-information-view.js";
import SortingView from "../view/sorting-view.js";
import EventsListView from "../view/events-list-view.js";
import NoEventsNotice from "./view/no-events-notice-view.js";

// const renderBoard = (tasks) => {
//   const tripInformationComponent = new TripInformationView(eventsSortedByTime);
//   const sortingComponent = new SortingView();
//   const eventsListComponent = new EventsListView();
//
//   const eventsListElement = document.querySelector(`.trip-events__list`);
//   for (let item of tasks) {
//     renderEvent(eventsListElement, item);
//   }
// };

export default class Board {
  constructor(boardContainer) {
    this._boardContainerElement = boardContainer;
    this._tripInformationComponent = new TripInformationView(events);
    this._sortingComponent = new SortingView();
    this._eventsListComponent = new EventsListView();
  }

  init(events) {
    this._events = events;
  }

  _renderTripInformation() {
    render(this._boardContainerElement, this._tripInformationComponent, RENDER_POSITION.AFTERBEGIN);
  }

  _renderSorting() {
    render(this._boardContainerElement, this._sortingComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderEventsList() {
    render(this._boardContainerElement, this._eventsListComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderBoard() {

  }

  _renderEvent() {

  }

  _renderNoEventsNotify() {

  }
}
