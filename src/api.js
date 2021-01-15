import EventsModel from "./model/events-model.js";


const Method = {
  GET: `GET`,
  PUT: `PUT`
};

const SuccessHTTPSStatusRange = {
  MIN: 200,
  MAX: 299
};


export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }


  getEvents() {
    return this._load({url: `point`})
      .then(Api.toJSON)
      .then((events) => events.map(EventsModel.adaptEventsToClient));
  }


  updateEvent(event) {
    return this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(EventsModel.adaptEventsToServer(event)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON)
    .then(EventsModel.adaptEventsToClient);
  }


  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
    .then(Api.checkStatus)
    .catch(Api.catchError);
  }


  static checkStatus(response) {
    if (response.status < SuccessHTTPSStatusRange.MIN || response.status > SuccessHTTPSStatusRange.MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }


  static toJSON(response) {
    return response.json();
  }


  static catchError(err) {
    throw err;
  }


  getDestinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON)
      .then((destinations) => destinations.map(EventsModel.adaptDestinationsToClient));
  }


  getOptions() {
    return this._load({url: `offers`})
      .then(Api.toJSON)
      .then((options) => options.map(EventsModel.adaptOptionsToClient));
  }
}
