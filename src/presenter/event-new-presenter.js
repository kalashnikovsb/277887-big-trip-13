import EventEditView from "../view/event-edit-view.js";
import {generateId} from "../utils/events-utils.js";
import {remove, render} from "../utils/render-utils.js";
import {RenderPosition, UserAction, UpdateType} from "../const.js";


export default class EventNewPresenter {
  constructor(eventsListContainer, changeData, availableDestinations, availableOptions, destroyBlankEvent) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;

    this._destroyBlankEvent = destroyBlankEvent;

    this._availableDestinations = availableDestinations;
    this._availableOptions = availableOptions;

    this._eventEditComponent = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }


  init() {
    if (this._eventEditComponent !== null) {
      return;
    }

    const isAdding = true;

    this._eventEditComponent = new EventEditView(false, this._availableDestinations, this._availableOptions, isAdding);
    this._eventEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._eventEditComponent.setDeleteClickHandler(this._deleteClickHandler);

    render(this._eventsListContainer, this._eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }


  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    this._destroyBlankEvent();

    remove(this._eventEditComponent);
    this._eventEditComponent = null;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }


  _formSubmitHandler(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MAJOR,
        Object.assign({id: generateId()}, event)
    );
    this.destroy();
  }


  _deleteClickHandler() {
    this.destroy();
  }


  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
