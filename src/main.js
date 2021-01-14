import {RenderPosition, MenuItem, UpdateType} from "./const.js";
import {render} from "./utils/render-utils.js";
import TripPresenter from "./presenter/trip-presenter.js";
import EventsModel from "./model/events-model.js";
import MenuView from "./view/menu-view.js";
import FilterPresenter from "./presenter/filter-presenter.js";
import FilterModel from "./model/filter-model.js";
import StatisticView from "./view/statistic-view.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic bF9cd7jfN8cP2qk6h`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const tripHeaderElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);
const menuHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(1)`);
const filtersHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(2)`);

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripHeaderElement, tripEventsElement, eventsModel, filterModel, api);
const filterPresenter = new FilterPresenter(filtersHeaderElement, filterModel, eventsModel);

const menuComponent = new MenuView();
render(menuHeaderElement, menuComponent, RenderPosition.AFTEREND);

const addNewEventButton = document.querySelector(`.trip-main__event-add-btn`);
addNewEventButton.setAttribute(`disabled`, ``);

api.getOptions().then((options) => {
  eventsModel.setOptions(options);

  api.getDestinations().then((destinations) => {
    addNewEventButton.removeAttribute(`disabled`);
    eventsModel.setDestinations(destinations);

    api.getEvents()
      .then((events) => {
        addNewEventButton.removeAttribute(`disabled`);
        eventsModel.setEvents(UpdateType.INIT, events);
      })
      .catch(() => {
        eventsModel.setEvents(UpdateType.INIT, []);
        throw new Error(`Точки маршрута не загружены`);
      });
  })
  .catch(() => {
    throw new Error(`Пункты назначения не загружены`);
  });
})
.catch(() => {
  throw new Error(`Опции не загружены`);
});

addNewEventButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  menuClickHandler(MenuItem.ADD_NEW_EVENT);
});


let statisticComponent = null;
let currentMenuItem = MenuItem.TABLE;

const menuClickHandler = (menuItem) => {
  if (currentMenuItem === menuItem) {
    return;
  }
  currentMenuItem = menuItem;

  switch (menuItem) {
    case MenuItem.ADD_NEW_EVENT:
      statisticComponent.hide();
      tripPresenter.show();
      menuComponent.setMenuItem(menuItem);
      tripPresenter.createEvent(menuClickHandler);
      filterPresenter.filtersEnable();
      break;
    case MenuItem.TABLE:
      statisticComponent.hide();
      tripPresenter.show();
      filterPresenter.filtersEnable();
      break;
    case MenuItem.STATS:
      statisticComponent = new StatisticView(tripEventsElement, eventsModel.getEvents(), eventsModel.getOptions());
      tripPresenter.hide();
      statisticComponent.show();
      filterPresenter.filtersDisable();
      break;
  }
};

menuComponent.setMenuClickHandler(menuClickHandler);

filterPresenter.init();
tripPresenter.init();
