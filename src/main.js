import {RenderPosition, MenuItem, UpdateType} from "./const.js";
import {render} from "./utils/render-utils.js";
import TripPresenter from "./presenter/trip-presenter.js";
import EventsModel from "./model/events-model.js";
import MenuView from "./view/menu-view.js";
import FilterPresenter from "./presenter/filter-presenter.js";
import FilterModel from "./model/filter-model.js";
import StatisticView from "./view/statistic-view.js";
import Api from "./api.js";

const tripHeaderElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);
const menuHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(1)`);
const filtersHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(2)`);

const AUTHORIZATION = `Basic bF9cd7jfN8cP2qk6h`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const menuClickHandler = (menuItem) => {
  if (currentMenuItem === menuItem) {
    return;
  }
  currentMenuItem = menuItem;

  switch (menuItem) {
    case MenuItem.TABLE:
      if (statisticComponent !== null) {
        statisticComponent.hide();
      }
      tripPresenter.show();
      filterPresenter.filtersEnable();
      break;
    case MenuItem.STATS:
      if (statisticComponent !== null) {
        statisticComponent.hide();
      }
      statisticComponent = new StatisticView(tripEventsElement, eventsModel.getEvents(), eventsModel.getOptions());
      tripPresenter.hide();
      statisticComponent.show();
      filterPresenter.filtersDisable();
      break;
  }
};

const addNewEventClickHandler = (evt) => {
  evt.preventDefault();
  tripPresenter.show();
  tripPresenter.createEvent();
  currentMenuItem = MenuItem.TABLE;
  menuComponent.setMenuItem(MenuItem.TABLE);

  filterPresenter.filtersEnable();
  if (statisticComponent !== null) {
    statisticComponent.hide();
  }
};

const menuComponent = new MenuView();
render(menuHeaderElement, menuComponent, RenderPosition.AFTEREND);
menuComponent.setMenuClickHandler(menuClickHandler);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const api = new Api(END_POINT, AUTHORIZATION);

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
      });
  })
  .catch(() => {
    eventsModel.setOptions([]);
  });
})
.catch(() => {
  eventsModel.setDestinations([]);
});

let currentMenuItem = MenuItem.TABLE;
let statisticComponent = null;

const addNewEventButton = document.querySelector(`.trip-main__event-add-btn`);
addNewEventButton.addEventListener(`click`, addNewEventClickHandler);
// Блокирую кнопку на время загрузки данных
addNewEventButton.setAttribute(`disabled`, ``);

const tripPresenter = new TripPresenter(tripHeaderElement, tripEventsElement, eventsModel, filterModel, api);
const filterPresenter = new FilterPresenter(filtersHeaderElement, filterModel, eventsModel);

filterPresenter.init();
tripPresenter.init();
