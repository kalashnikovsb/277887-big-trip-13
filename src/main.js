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

  tripPresenter.removeNoEventsNoticeIfExist();

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

const addNewEventButton = document.querySelector(`.trip-main__event-add-btn`);
addNewEventButton.setAttribute(`disabled`, ``);
addNewEventButton.addEventListener(`click`, addNewEventClickHandler);

const menuComponent = new MenuView();
render(menuHeaderElement, menuComponent, RenderPosition.AFTEREND);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

let currentMenuItem = MenuItem.TABLE;
let statisticComponent = null;

const api = new Api(END_POINT, AUTHORIZATION);

api.getOptions().then((options) => {
  eventsModel.setOptions(options);

  api.getDestinations().then((destinations) => {
    // Опции и пункты назначения загрузились, разблокирую фильтры
    filterPresenter.filtersEnable();

    // Удаляю сообщение при переходе на статистику
    menuComponent.setMenuClickHandler(menuClickHandler);

    // Кнопка добавления ивента разблокируется при успешной загрузке опций и пунктов назначения
    addNewEventButton.removeAttribute(`disabled`);
    eventsModel.setDestinations(destinations);

    api.getEvents()
      .then((events) => {

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

const tripPresenter = new TripPresenter(tripHeaderElement, tripEventsElement, eventsModel, filterModel, api);
const filterPresenter = new FilterPresenter(filtersHeaderElement, filterModel, eventsModel);

filterPresenter.init();
tripPresenter.init();

// Блокирую фильтры пока не загрузятся опции и пункты назначения
filterPresenter.filtersDisable();
