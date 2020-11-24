import {TYPES, DESTINATIONS, OPTIONS} from "../const.js";
import dayjs from "dayjs";

const emptyEvent = {
  type: ``,
  destination: ``,
  description: ``,
  options: [],
  price: ``,
  photos: [],
  timeStart: new Date(),
  timeEnd: new Date(),
  isFavorite: false,
};


const getType = (type) => {
  return (type.length === 0) ? TYPES[0] : type;
};


const getDestination = (destination) => {
  return (destination.length === 0) ? DESTINATIONS[0] : destination;
};


const getEventTypesList = () => {
  return `
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
  ${TYPES.map((type) => {
    type = type.toLowerCase();
    return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`;
  }).join(``)}
    </fieldset>
  </div>`;
};


const getDestinationsList = () => {
  return `
  <datalist id="destination-list-1">
  ${DESTINATIONS.map((destination) => {
    return `<option value="${destination}"></option>`;
  }).join(``)}
  </datalist>
  `;
};


const getOptionsList = (options) => {
  if (options.length === 0) {
    return ``;
  }
  return `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
  ${OPTIONS.map((constOption) => {
    const isChecked = options.some((option) => {
      return (option.name === constOption.name) ? true : false;
    });
    return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${constOption.id}-1" type="checkbox" name="event-offer-${constOption.id}" ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${constOption.id}-1">
        <span class="event__offer-title">${constOption.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${constOption.price}</span>
      </label>
    </div>`;
  }).join(``)}
    </div>
  </section>`;
};


const getPhotos = (photos) => {
  if (photos.length === 0) {
    return ``;
  }
  return `
  <div class="event__photos-container">
    <div class="event__photos-tape">
  ${photos.map((src) => {
    return `<img class="event__photo" src="${src}" alt="Event photo">`;
  }).join(``)}
    </div>
  </div>
  `;
};


const getDescription = (description, photos) => {
  if (description.length === 0) {
    return ``;
  } else {
    return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${getPhotos(photos)}
    </section>`;
  }
};


export const eventEditItemView = (event = emptyEvent) => {
  const {type, destination, timeStart, timeEnd, price, options, description, photos} = event;

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${getType(type)}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          ${getEventTypesList()}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${getType(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${getDestination(destination)}" list="destination-list-1">
          ${getDestinationsList()}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(timeStart).format(`DD/MM/YY HH:mm`)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(timeEnd).format(`DD/MM/YY HH:mm`)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${getOptionsList(options)}
        ${getDescription(description, photos)}
      </section>
    </form>
  </li>`;
};
