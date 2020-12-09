import {EVENTS_COUNT, RENDER_POSITION} from "./const.js";
import {render} from "./utils/render-utils.js";
import {sortTimeStartUp} from "./utils/events-utils.js";
import {generateEventsMock} from "./mock/generate-events-mock.js";
import MenuView from "./view/menu-view.js";
import FiltersView from "./view/filters-view.js";
import TripPresenter from "./presenter/trip-presenter.js";

const events = new Array(EVENTS_COUNT).fill().map(generateEventsMock);
const eventsCopy = events.slice();
const eventsSortedByTime = eventsCopy.sort(sortTimeStartUp);

const tripHeaderElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);
const menuHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(1)`);
const filtersHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(2)`);

render(menuHeaderElement, new MenuView(), RENDER_POSITION.AFTEREND);
render(filtersHeaderElement, new FiltersView(eventsSortedByTime.length), RENDER_POSITION.AFTEREND);

const trip = new TripPresenter(tripHeaderElement, tripEventsElement);
trip.init(eventsSortedByTime);
