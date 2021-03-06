import dayjs from "dayjs";
import {sortTimeEndUp, sortTimeStartUp} from "../utils/events-utils.js";
import AbstractView from "./abstract-view.js";


const getDestinations = (events) => {
  if (events.length === 0) {
    return ``;
  }
  events.sort(sortTimeStartUp);

  const destinations = [];
  events.forEach((item) => destinations.push(item.destination));

  const unique = Array.from(new Set(destinations));

  switch (unique.length) {
    case 0:
      return ``;
    case 1:
      return unique[0];
    case 2:
      return unique.join(` &mdash; `);
    case 3:
      return `${unique[0]} &mdash; ${unique[1]} &mdash; ${destinations[destinations.length - 1]}`;
    default:
      return `${destinations[0]} &mdash; ... &mdash; ${destinations[destinations.length - 1]}`;
  }
};


const getTripDates = (events) => {
  if (events.length === 0) {
    return ``;
  }

  const eventsCopy = events.slice();
  eventsCopy.sort(sortTimeEndUp);

  let startDate = dayjs(eventsCopy[0].timeStart);
  let endDate = dayjs(eventsCopy[eventsCopy.length - 1].timeEnd);

  if (startDate.month() === endDate.month()) {
    endDate = endDate.format(`DD`);
  } else {
    endDate = endDate.format(`MMM DD`);
  }
  startDate = startDate.format(`MMM DD`);

  return `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
};


const getTotalCost = (events) => {
  let eventsCost = 0;
  let optionsCost = 0;
  events.forEach((event) => {
    eventsCost += Number(event.price);
    event.options.forEach((option) => {
      optionsCost += Number(option.price);
    });
  });
  return eventsCost + optionsCost;
};


const getTripInformationTemplate = (events) => {
  const totalCost = getTotalCost(events);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getDestinations(events)}</h1>

      <p class="trip-info__dates">${getTripDates(events)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>
  </section>`;
};


export default class TripInformationView extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return getTripInformationTemplate(this._events);
  }
}
