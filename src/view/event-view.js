import {getDuration} from "../utils/render-utils.js";
import dayjs from "dayjs";
import AbstractView from "./abstract-view.js";


const getDateTemplate = (time) => {
  return `<time class="event__date" datetime="${dayjs(time).format(`YYYY-MM-DD`)}">${dayjs(time).format(`MMM DD`)}</time>`;
};


const getSchedule = (timeStart, timeEnd) => {
  timeStart = dayjs(timeStart);
  timeEnd = dayjs(timeEnd);
  return `<div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${timeStart.format(`YYYY-MM-DDTHH:mm`)}">${timeStart.format(`HH:mm`)}</time>
      &mdash;
      <time class="event__end-time" datetime="${timeEnd.format(`YYYY-MM-DDTHH:mm`)}">${timeEnd.format(`HH:mm`)}</time>
    </p>
    <p class="event__duration">${getDuration(timeStart, timeEnd)}</p>
  </div>`;
};


const getOptions = (options) => {
  return `<ul class="event__selected-offers">
    ${options.map((option) => {
    return `<li class="event__offer">
      <span class="event__offer-title">${option.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${option.price}</span>
    </li>`;
  }).join(``)}
  </ul>`;
};


const getFavoriteClassName = (isFavorite) => {
  return isFavorite ? `event__favorite-btn--active` : ``;
};


const getEventTemplate = (event) => {
  const {type, timeStart, timeEnd, destination, price, options, isFavorite} = event;
  return `<li class="trip-events__item">
    <div class="event">
      ${getDateTemplate(timeStart)}
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination}</h3>
      ${getSchedule(timeStart, timeEnd)}
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${getOptions(options)}
      <button class="event__favorite-btn ${getFavoriteClassName(isFavorite)}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};


export default class EventView extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._eventOpenClickHandler = this._eventOpenClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return getEventTemplate(this._event);
  }


  // Открытие формы редактирования
  _eventOpenClickHandler(evt) {
    evt.preventDefault();
    this._callback.openClick();
  }

  setEventOpenClickHandler(callback) {
    this._callback.openClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._eventOpenClickHandler);
  }


  // Нажатие на звездочку
  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
