import EventEditView from "../view/event-edit-view.js";
import {generateId} from "../mock/generate-events-mock.js";
import {remove, render} from "../utils/render-utils.js";
import {RenderPosition, UserAction, UpdateType} from "../const.js";


export default class EventNew {
  constructor(eventsListContainer, changeData) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;

    this._eventEditComponent = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }


  init(callback) {
    this._destroyCallback = callback;
    if (this._eventEditComponent !== null) {
      return;
    }
    this._eventEditComponent = new EventEditView();
    this._eventEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._eventEditComponent.setDeleteClickHandler(this._deleteClickHandler);

    render(this._eventsListContainer, this._eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }


  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

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
