import {EVENTS_COUNT, RENDER_POSITION} from "./const.js";
import {render, replace} from "./utils/render-utils.js";
import {sortTimeStartUp} from "./utils/events-utils.js";
import {generateEventsMock} from "./mock/generate-events-mock.js";
import TripInformationView from "./view/trip-information-view.js";
import MenuView from "./view/menu-view.js";
import FiltersView from "./view/filters-view.js";
import SortingView from "./view/sorting-view.js";
import EventsListView from "./view/events-list-view.js";
import EventEditView from "./view/event-edit-view.js";
import EventView from "./view/event-view.js";
import NoEventsNotice from "./view/no-events-notice-view.js";


const renderEvent = (container, task) => {
  const eventComponent = new EventView(task);
  const eventEditComponent = new EventEditView(task);

  const escKeyDownHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replace(eventComponent, eventEditComponent);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  eventComponent.setEventOpenClickHandler(() => {
    replace(eventEditComponent, eventComponent);
    document.addEventListener(`keydown`, escKeyDownHandler);
  });

  eventEditComponent.setEventEditCloseClickHandler(() => {
    replace(eventComponent, eventEditComponent);
    document.removeEventListener(`keydown`, escKeyDownHandler);
  });

  eventEditComponent.setEventEditSubmitHandler(() => {
    replace(eventComponent, eventEditComponent);
    document.removeEventListener(`keydown`, escKeyDownHandler);
  });

  render(container, eventComponent, RENDER_POSITION.BEFOREEND);
};


const renderBoard = (tasks) => {
  const tripInformationComponent = new TripInformationView(eventsSortedByTime);
  const sortingComponent = new SortingView();
  const eventsListComponent = new EventsListView();

  render(tripHeaderElement, tripInformationComponent, RENDER_POSITION.AFTERBEGIN);
  render(tripEventsElement, sortingComponent, RENDER_POSITION.BEFOREEND);
  render(tripEventsElement, eventsListComponent, RENDER_POSITION.BEFOREEND);

  const eventsListElement = document.querySelector(`.trip-events__list`);
  for (let item of tasks) {
    renderEvent(eventsListElement, item);
  }
};


const renderAddNewNotification = () => {
  const noEventsNoticeComponent = new NoEventsNotice();
  render(tripEventsElement, noEventsNoticeComponent, RENDER_POSITION.BEFOREEND);
  return;
};


const events = new Array(EVENTS_COUNT).fill().map(generateEventsMock);
const eventsCopy = events.slice();
const eventsSortedByTime = eventsCopy.sort(sortTimeStartUp);

const tripHeaderElement = document.querySelector(`.trip-main`);
const menuHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(1)`);
const filtersHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

const menuComponent = new MenuView();
const filtersComponent = new FiltersView(eventsSortedByTime.length);

render(menuHeaderElement, menuComponent, RENDER_POSITION.AFTEREND);
render(filtersHeaderElement, filtersComponent, RENDER_POSITION.AFTEREND);

if (eventsSortedByTime.length === 0) {
  renderAddNewNotification();
} else {
  renderBoard(eventsSortedByTime);
}
