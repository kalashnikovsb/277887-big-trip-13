import {EVENTS_COUNT, RenderPosition, MenuItem} from "./const.js";
import {render} from "./utils/render-utils.js";
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

const eventNewClose = () => {
  menuComponent.resetAllActivesMenuItems();
  menuComponent.setMenuItem(MenuItem.TABLE);
};

const menuClickHandler = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_EVENT:
      // Скрыть статистику
      // Показать доску
      tripPresenter.createEvent(eventNewClose);
      menuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`).classList.add(`trip-tabs__btn--active`);
      break;
    case MenuItem.TABLE:
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      // Скрыть доску
      // Показать статистику
      break;
  }
};

menuComponent.setMenuClickHandler(menuClickHandler);

filterPresenter.init();
tripPresenter.init();

// document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
//   evt.preventDefault();
//   tripPresenter.createEvent();
// });
