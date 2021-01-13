import {getClientOptions, getServerOptions} from "../utils/api-utils.js";
import Observer from "../utils/observer.js";

export default class EventsModel extends Observer {
  constructor() {
    super();
    this._events = [];
  }


  setEvents(updateType, events) {
    this._events = events.slice();
    this._notify(updateType);
  }


  getEvents() {
    return this._events;
  }


  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getDestinations() {
    return this._destinations;
  }


  setOptions(options) {
    this._options = options.slice();
  }

  getOptions() {
    return this._options;
  }


  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);
    if (index === -1) {
      throw new Error(`Can't update unexisting event`);
    }
    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1)
    ];
    this._notify(updateType, update);
  }


  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events
    ];
    this._notify(updateType, update);
  }


  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);
    if (index === -1) {
      throw new Error(`Can't delete unexisting event`);
    }
    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];
    this._notify(updateType, update);
  }


  static adaptEventsToClient(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          id: event.id,
          type: event.type,
          destination: event.destination.name,
          description: event.destination.description,
          pictures: event.destination.pictures.slice(),
          options: getClientOptions(event.offers.slice()),
          price: event.base_price,
          timeStart: event.date_from !== null ? new Date(event.date_from) : new Date(),
          timeEnd: event.date_to !== null ? new Date(event.date_to) : new Date(),
          isFavorite: event.is_favorite
        }
    );

    delete adaptedEvent.base_price;
    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.is_favorite;
    delete adaptedEvent.offers;

    return adaptedEvent;
  }


  static adaptEventsToServer(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          base_price: Number(event.price),
          date_from: event.timeStart.toISOString(),
          date_to: event.timeEnd.toISOString(),
          destination: {
            name: event.destination,
            description: event.description,
            pictures: event.pictures.slice()
          },
          id: event.id,
          is_favorite: event.isFavorite,
          type: event.type,
          offers: getServerOptions(event.options.slice())
        }
    );

    delete adaptedEvent.price;
    delete adaptedEvent.timeStart;
    delete adaptedEvent.timeEnd;
    delete adaptedEvent.isFavorite;
    delete adaptedEvent.options;
    delete adaptedEvent.description;
    delete adaptedEvent.pictures;

    return adaptedEvent;
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }


  getDestinations() {
    return this._destinations;
  }


  setOptions(options) {
    this._options = options.slice();
  }


  getOptions() {
    return this._options;
  }


  static adaptDestinationsToClient(destination) {
    let result = {};
    result.name = destination.name;
    result.description = destination.description;
    result.pictures = [];
    for (let serverPicture of destination.pictures) {
      let picture = {};
      picture.src = serverPicture.src;
      picture.alt = serverPicture.description;
      result.pictures.push(picture);
    }
    return result;
  }


  static adaptOptionsToClient(option) {
    let result = {};
    result.type = option.type;
    result.offers = [];
    for (let serverOffer of option.offers) {
      let offer = {};
      offer.name = serverOffer.title;
      offer.price = serverOffer.price;
      result.offers.push(offer);
    }
    return result;
  }
}
