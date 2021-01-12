import {addOrDeleteOption} from "../utils/events-utils.js";
import SmartView from "./smart-view.js";
import dayjs from "dayjs";
import he from "he";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";


const getType = (type) => {
  if (Boolean(type) === false) {
    return ``;
  }
  return type;
};


const getDestination = (destination) => {
  if (Boolean(destination) === false) {
    return ``;
  }
  return destination;
};


const getEventTypesList = (currentType, availableTypes) => {
  currentType = currentType.toLowerCase();

  return `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
  ${availableTypes.map((type) => {
    type = type.toLowerCase();
    return `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`;
  }).join(``)}
    </fieldset>
  </div>`;
};


const getDestinationsList = (availableDestinations) => {
  return `<datalist id="destination-list-1">
  ${availableDestinations.map((destination) => {
    return `<option value="${destination.name}"></option>`;
  }).join(``)}
  </datalist>
  `;
};


const getOptionsList = (type, options, availableOptions) => {
  if (Boolean(type) === false) {
    return ``;
  }

  const availableOptionsByType = availableOptions.find((option) => option.type === type).offers;

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
  ${availableOptionsByType.map((constOption) => {
    const isChecked = options.some((option) => {
      return (option.title === constOption.title) ? true : false;
    });
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${constOption.title.toLowerCase().split(` `).join(`-`)}-1" type="checkbox" name="event-offer-${constOption.title.toLowerCase().split(` `).join(`-`)}" data-name="${constOption.title}" ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${constOption.title.toLowerCase().split(` `).join(`-`)}-1">
        <span class="event__offer-title">${constOption.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${constOption.price}</span>
      </label>
    </div>`;
  }).join(``)}
    </div>
  </section>`;
};


const getPhotos = (photos) => {
  if (Boolean(photos) === false || photos.length === 0) {
    return ``;
  }
  return `<div class="event__photos-container">
    <div class="event__photos-tape">
  ${photos.map((photo) => {
    return `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
  }).join(``)}
    </div>
  </div>
  `;
};


const getDescription = (destination, availableDestinations) => {
  const checkedDestination = availableDestinations.find((availableItem) => availableItem.name === destination);

  if (Boolean(destination) === false) {
    return ``;
  }

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${checkedDestination.description}</p>
    ${getPhotos(checkedDestination.pictures)}
  </section>`;
};


// Функция проверки на существование введенного пункта назначения
const isDestinationCorrect = (destination, availableDestinations) => {
  let isExist = false;
  availableDestinations.forEach((city) => {
    if (city.name === destination) {
      isExist = true;
    }
  });
  return isExist;
};


const getEventEditTemplate = (data, availableDestinations, availableOptions, availableTypes) => {
  const {type, timeStart, timeEnd, options} = data;
  let {price, destination} = data;

  // Проверка на существование введенного пункта назначения
  if (isDestinationCorrect(destination, availableDestinations) === false) {
    destination = ``;
  }

  // Преобразую строку к числу, отсекаю дробную часть
  // Не позволяю числу быть ниже 0, либо отрицательным, либо быть NaN
  price = Math.trunc(Number(price));
  if (isNaN(price) || price <= 0) {
    price = ``;
  }

  const isSubmitDisable = !price || !destination;

  // Могут показываться или нет в зависимости от типа события и наличия описания у точки маршрута
  const optionsBlock = getOptionsList(type, options, availableOptions);
  const descriptionBlock = getDescription(destination, availableDestinations);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${getType(type).toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          ${getEventTypesList(type, availableTypes)}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${getType(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(getDestination(destination))}" list="destination-list-1">
          ${getDestinationsList(availableDestinations)}
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

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisable ? `disabled` : ``}>Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${optionsBlock}
        ${descriptionBlock}
      </section>
    </form>
  </li>`;
};


export default class EventEditView extends SmartView {
  constructor(event, availableDestinations, availableOptions) {
    super();
    this._destinations = availableDestinations.slice();
    this._options = availableOptions.slice();
    this._types = this.getTypes(this._options);

    if (!!event === false) {
      event = {
        type: this._types[0], // Flight по умолчанию
        destination: ``,
        description: ``,
        options: [],
        price: ``,
        photos: [],
        timeStart: new Date(),
        timeEnd: new Date(),
        isFavorite: false,
      };
    }

    this._data = EventEditView.parseEventToData(event);

    this._startDatepicker = null;
    this._endDatepicker = null;

    this._eventEditCloseClickHandler = this._eventEditCloseClickHandler.bind(this);
    this._eventEditSubmitHandler = this._eventEditSubmitHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._optionsChangeHandler = this._optionsChangeHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }


  getTypes(options) {
    let result = [];
    for (let option of options) {
      result.push(option.type);
    }
    return result;
  }


  getTemplate() {
    return getEventEditTemplate(this._data, this._destinations, this._options, this._types);
  }


  // сброс формы
  reset(event) {
    this.updateData(EventEditView.parseEventToData(event));
  }


  // Закрытие формы редактирования
  _eventEditCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }


  setEventEditCloseClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._eventEditCloseClickHandler);
  }


  // Отправка формы
  _eventEditSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEditView.parseDatatoEvent(this._data));
  }


  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._eventEditSubmitHandler);
  }


  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEditView.parseDatatoEvent(this._data));
  }


  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteClickHandler);
  }


  static parseEventToData(event) {
    return Object.assign(
        {},
        event
    );
  }


  static parseDatatoEvent(data) {
    return Object.assign(
        {},
        data
    );
  }


  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value.charAt(0).toUpperCase() + evt.target.value.slice(1)
    });
  }


  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value
    });
  }


  _priceInputHandler(evt) {
    evt.preventDefault();
    let result = evt.target.value;
    this.updateData({
      price: result
    });
  }


  _optionsChangeHandler(evt) {
    evt.preventDefault();
    // Нахожу имя опции на которой был клик
    const optionName = evt.target.dataset.name;
    // Ищу среди всех опций для всех типов ту на которой был сделан клик
    let result = null;
    for (let option of this._options) {
      let availableOptions = option.offers;
      for (let offer of availableOptions) {
        if (offer.title === optionName) {
          result = offer;
        }
      }
    }
    // Добавляю опцию если ее нет, либо удаляю если она уже есть
    this._data.options = addOrDeleteOption(this._data.options, result);

    this.updateData({
      options: this._data.options
    });
  }


  // Восстанавливаю все обработчики
  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEventEditCloseClickHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }


  // Восстанавливаю только внутренние обработчики
  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeChangeHandler);
    this.getElement().querySelector(`#event-destination-1`).addEventListener(`change`, this._destinationChangeHandler);
    this.getElement().querySelector(`#event-price-1`).addEventListener(`change`, this._priceInputHandler);

    const options = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    for (let option of options) {
      option.addEventListener(`click`, this._optionsChangeHandler);
    }
  }


  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          defaultDate: this._data.timeStart,
          onClose: this._startTimeChangeHandler
        }
    );
  }

  _setEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
    this._endDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          defaultDate: this._data.timeEnd,
          onClose: this._endTimeChangeHandler
        }
    );
  }


  _startTimeChangeHandler([timeStart]) {
    let startMilliseconds = timeStart.getTime();
    let endMilliseconds = this._data.timeEnd.getTime();
    if (endMilliseconds < startMilliseconds) {
      endMilliseconds = startMilliseconds;
    }
    this.updateData({
      timeStart: dayjs(new Date(startMilliseconds)).second(59).toDate(),
      timeEnd: dayjs(new Date(endMilliseconds)).second(59).toDate()
    });
  }


  _endTimeChangeHandler([timeEnd]) {
    let startMilliseconds = this._data.timeStart.getTime();
    let endMilliseconds = timeEnd.getTime();
    if (endMilliseconds < startMilliseconds) {
      startMilliseconds = endMilliseconds;
    }
    this.updateData({
      timeEnd: dayjs(new Date(endMilliseconds)).second(59).toDate(),
      timeStart: dayjs(new Date(startMilliseconds)).second(59).toDate()
    });
  }


  removeElement() {
    super.removeElement();
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }
}
