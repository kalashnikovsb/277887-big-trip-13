import {EVENTS_COUNT, RENDER_POSITION} from "./const.js";
import {render} from "./utils/renderUtils.js";
import {sortTimeStartUp} from "./utils/eventsUtils.js";
import {generateEventsMock} from "./mock/generateEventsMock.js";
import TripInformationView from "./view/TripInformationView.js";
import MenuView from "./view/MenuView.js";
import FiltersView from "./view/FiltersView.js";
import SortingView from "./view/SortingView.js";
import EventsListView from "./view/EventsListView.js";
import EventEditView from "./view/EventEditView.js";
import EventView from "./view/EventView.js";


const renderEvent = (container, item) => {
  const eventComponent = new EventView(item);
  const eventEditComponent = new EventEditView(item);

  const replaceEventToEdit = () => {
    container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`.event--edit`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, eventComponent.getElement(), RENDER_POSITION.BEFOREEND);
};


const events = new Array(EVENTS_COUNT).fill().map(generateEventsMock);
const eventsCopy = events.slice();
const eventsSortedByTime = eventsCopy.sort(sortTimeStartUp);


const tripHeaderElement = document.querySelector(`.trip-main`);
const menuHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(1)`);
const filtersHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);


const tripInformationComponent = new TripInformationView(eventsSortedByTime);
const menuComponent = new MenuView();
const filtersComponent = new FiltersView();
const sortingComponent = new SortingView();
const eventsListComponent = new EventsListView();


render(tripHeaderElement, tripInformationComponent.getElement(), RENDER_POSITION.AFTERBEGIN);
render(menuHeaderElement, menuComponent.getElement(), RENDER_POSITION.AFTEREND);
render(filtersHeaderElement, filtersComponent.getElement(), RENDER_POSITION.AFTEREND);
render(tripEventsElement, sortingComponent.getElement(), RENDER_POSITION.BEFOREEND);
render(tripEventsElement, eventsListComponent.getElement(), RENDER_POSITION.BEFOREEND);


const eventsListElement = document.querySelector(`.trip-events__list`);


for (let item of eventsSortedByTime) {
  renderEvent(eventsListElement, item);
}
