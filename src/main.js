import {EVENTS_COUNT, RenderPosition, MenuItem, UpdateType, FilterType} from "./const.js";
import {render, remove} from "./utils/render-utils.js";
import {generateEventsMock} from "./mock/generate-events-mock.js";
import TripPresenter from "./presenter/trip-presenter.js";
import EventsModel from "./model/events-model.js";
import MenuView from "./view/menu-view.js";
import FilterPresenter from "./presenter/filter-presenter.js";
import FilterModel from "./model/filter-model.js";
import StatisticView from "./view/statistic-view.js";

const events = new Array(EVENTS_COUNT).fill().map(generateEventsMock);
const eventsCopy = events.slice();

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

eventsModel.setEvents(eventsCopy);

const tripHeaderElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);
const menuHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(1)`);
const filtersHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(2)`);

const tripPresenter = new TripPresenter(tripHeaderElement, tripEventsElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersHeaderElement, filterModel, eventsModel);

const menuComponent = new MenuView();
render(menuHeaderElement, menuComponent, RenderPosition.AFTEREND);

const addNewEventButton = document.querySelector(`.trip-main__event-add-btn`);

addNewEventButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  menuClickHandler(MenuItem.ADD_NEW_EVENT);
});

let statisticComponent = null;

const menuClickHandler = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_EVENT:
      remove(statisticComponent);
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      menuComponent.setMenuItem(menuItem);
      tripPresenter.createEvent(menuClickHandler);
      break;
    case MenuItem.TABLE:
      remove(statisticComponent);
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      remove(statisticComponent);
      statisticComponent = new StatisticView(eventsModel.getEvents());
      render(tripEventsElement, statisticComponent, RenderPosition.AFTEREND);
      break;
  }
};

menuComponent.setMenuClickHandler(menuClickHandler);

filterPresenter.init();
tripPresenter.init();
