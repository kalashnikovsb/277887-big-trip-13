import {tripInformation} from "./view/tripInformation.js";
import {menu} from "./view/menu.js";
import {filters} from "./view/filters.js";
import {sorting} from "./view/sorting.js";
import {eventsList} from "./view/eventsList.js";
import {eventEditItem} from "./view/eventEditItem.js";
import {eventItem} from "./view/eventItem.js";

const EVENTS_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripHeaderElement = document.querySelector(`.trip-main`);
const menuHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(1)`);
const filtersHeaderElement = document.querySelector(`.trip-main__trip-controls .visually-hidden:nth-of-type(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripHeaderElement, tripInformation(), `afterbegin`);
render(menuHeaderElement, menu(), `afterend`);
render(filtersHeaderElement, filters(), `afterend`);
render(tripEventsElement, sorting(), `beforeend`);
render(tripEventsElement, eventsList(), `beforeend`);

const eventsListElement = document.querySelector(`.trip-events__list`);

render(eventsListElement, eventEditItem(), `beforeend`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(eventsListElement, eventItem(), `beforeend`);
}
