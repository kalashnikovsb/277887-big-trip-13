import {RENDER_POSITION} from "../const.js";
import {render} from "../utils/render-utils.js";
import {updateItem} from "../utils/common-utils.js";
import TripInformationView from "../view/trip-information-view.js";
import SortingView from "../view/sorting-view.js";
import EventsListView from "../view/events-list-view.js";
import NoEventsNoticeView from "../view/no-events-notice-view.js";
import EventPresenter from "../presenter/event-presenter.js";

export default class TripPresenter {
  constructor(headerContainer, boardContainer) {
    this._headerContainerElement = headerContainer;
    this._boardContainerElement = boardContainer;

    this._eventPresenter = {};

    this._sortingComponent = new SortingView();
    this._eventsListComponent = new EventsListView();
    this._noEventsNoticeComponent = new NoEventsNoticeView();

    this._tripEventsElement = document.querySelector(`.trip-events`);

    this._eventChangeHandler = this._eventChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._renderTrip();
  }

  _eventChangeHandler(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _modeChangeHandler() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.resetView());
  }

  _renderTrip() {
    if (this._events.length === 0) {
      this._renderNoEventsNotice();
      return;
    }

    this._tripInformationComponent = new TripInformationView(this._events);
    this._renderTripInformation();
    this._renderSorting();
    this._renderEventsList();
    this._renderAllEvents();
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._eventChangeHandler, this._modeChangeHandler);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderAllEvents() {
    for (let event of this._events) {
      this._renderEvent(event);
    }
  }

  _renderTripInformation() {
    render(this._headerContainerElement, this._tripInformationComponent, RENDER_POSITION.AFTERBEGIN);
  }

  _renderSorting() {
    render(this._boardContainerElement, this._sortingComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderEventsList() {
    render(this._boardContainerElement, this._eventsListComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderNoEventsNotice() {
    render(this._tripEventsElement, this._noEventsNoticeComponent, RENDER_POSITION.BEFOREEND);
  }

  _clearEventsList() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }
}
