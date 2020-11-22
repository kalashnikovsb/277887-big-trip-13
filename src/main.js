import {EVENTS_COUNT} from "./const.js";
import {render} from "./utils/renderUtils.js";
import {tripInformationView} from "./view/tripInformationView.js";
import {menuView} from "./view/menuView.js";
import {filtersView} from "./view/filtersView.js";
import {sortingView} from "./view/sortingView.js";
import {eventsListView} from "./view/eventsListView.js";
import {eventEditItemView} from "./view/eventEditItemView.js";
import {eventItemView} from "./view/eventItemView.js";
import {generateEventsMock} from "./mock/generateEventsMock.js";

const events = new Array(EVENTS_COUNT).fill().map(generateEventsMock);

const tripHeaderElement = document.querySelector(`.trip-main`);
const menuHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(1)`);
const filtersHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripHeaderElement, tripInformationView(events), `afterbegin`);
render(menuHeaderElement, menuView(), `afterend`);
render(filtersHeaderElement, filtersView(), `afterend`);
render(tripEventsElement, sortingView(), `beforeend`);
render(tripEventsElement, eventsListView(), `beforeend`);

const eventsListElement = document.querySelector(`.trip-events__list`);

render(eventsListElement, eventEditItemView(), `beforeend`);

for (let i = 1; i < events.length; i++) {
  render(eventsListElement, events[i], `beforeend`);
}
