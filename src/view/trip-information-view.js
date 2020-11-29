import dayjs from "dayjs";
import {sortTimeEndUp} from "../utils/events-utils.js";
import {createElement} from "../utils/render-utils.js";


const getDestinations = (events) => {
  if (events.length === 0) {
    return ``;
  }
  let destinations = [];
  for (let item of events) {
    destinations.push(item.destination);
  }
  const unique = Array.from(new Set(destinations));
  switch (unique.length) {
    case 0:
      return ``;
    case 1:
      return unique[0];
    case 2:
      return unique.join(` &mdash; `);
    default:
      return `${unique[0]} &mdash; ... &mdash; ${unique[unique.length - 1]}`;
  }
};


const getTripDates = (events) => {
  let eventsCopy = events.slice();
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


const getTripInformationTemplate = (events) => {
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getDestinations(events)}</h1>

      <p class="trip-info__dates">${getTripDates(events)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`;
};

export default class TripInformationView {
  constructor(events) {
    this._element = null;
    this._events = events;
  }

  getTemplate() {
    return getTripInformationTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
