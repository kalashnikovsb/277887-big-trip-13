import {getClientOptions, getClientPhotos} from "../utils/api-utils.js";
import Observer from "../utils/observer.js";

export default class EventsModel extends Observer {
  constructor() {
    super();
    this._events = [];
  }


  setEvents(events) {
    this._events = events.slice();
  }


  getEvents() {
    return this._events;
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


  static adaptToClient(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          id: event.id,
          type: event.type,
          destination: event.destination.name,
          description: event.destination.description,
          options: getClientOptions(event.offers.slice()),
          price: event.base_price,
          // photos: getClientPhotos(event.destination.pictures.slice()),
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
}
