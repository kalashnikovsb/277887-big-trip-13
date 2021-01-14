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

// api.getEvents()
//   .then((events) => {
//     console.log(`Получил данные`);
//     eventsModel.setEvents(UpdateType.INIT, events);
//   })
//   .catch(() => {
//     console.log(`Не получил данные`);
//     eventsModel.setEvents(UpdateType.INIT, []);
//   });
//
// api.getDestinations()
//   .then((destinations) => {
//     eventsModel.setDestinations(destinations);
//   });
//
// api.getOptions()
//   .then((options) => {
//     eventsModel.setOptions(options);
//   });

const addNewEventButton = document.querySelector(`.trip-main__event-add-btn`);
addNewEventButton.setAttribute(`disabled`, ``);

// Promise.all([api.getEvents(), api.getDestinations(), api.getOptions()])
//   .then((result) => {
//     eventsModel.setOptions(result[2]);
//     eventsModel.setDestinations(result[1]);
//     eventsModel.setEvents(UpdateType.INIT, result[0]);
//     addNewEventButton.removeAttribute(`disabled`);
//   })
//   .catch(() => {
//     console.log(`Не получил данные!`);
//     eventsModel.setEvents(UpdateType.INIT, []);
//     addNewEventButton.removeAttribute(`disabled`);
//   })

// Или

// api.getOptions().then((options) => {
//   console.log(`Опции загружены`);
//   addNewEventButton.removeAttribute(`disabled`);
//   eventsModel.setOptions(options);
//
//   api.getDestinations().then((destinations) => {
//     console.log(`Пункты назначения загружены`);
//     addNewEventButton.removeAttribute(`disabled`);
//     eventsModel.setDestinations(destinations);
//
//     api.getEvents()
//       .then((events) => {
//         console.log(`Точки загружены`);
//         addNewEventButton.removeAttribute(`disabled`);
//         eventsModel.setEvents(UpdateType.INIT, events);
//       });
//       .catch(() => {
//         console.log(`Точки не загружены`);
//         eventsModel.setEvents(UpdateType.INIT, []);
//       });
//   });
// });

// Или

api.getDestinations()
.then((destinations) => {
  console.log(`Пункты назначения загружены`);
  eventsModel.setDestinations(destinations);
})
.catch((e) => {
  console.log(`Пункты назначения не загружены`);
})
.then(api.getOptions())
.then((options) => {
    console.log(`Опции загружены`);
    eventsModel.setOptions(options);
  })
.catch((e) => {
  console.log(`Опции не загружены`);
})
.then(api.getEvents())
.then((events) => {
  console.log(`Точки загружены`);
  eventsModel.setEvents(UpdateType.INIT, events);
})
.catch((e) => {
  console.log(`Точки не загружены`);
  eventsModel.setEvents(UpdateType.INIT, []);
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
