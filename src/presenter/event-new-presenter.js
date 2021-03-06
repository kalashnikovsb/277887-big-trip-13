import EventEditView from "../view/event-edit-view.js";
import {remove, render} from "../utils/render-utils.js";
import {RenderPosition, UserAction, UpdateType} from "../const.js";


export default class EventNewPresenter {
  constructor(eventsListContainer, changeData, availableDestinations, availableOptions) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;

    this._availableDestinations = availableDestinations;
    this._availableOptions = availableOptions;

    this._eventEditComponent = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }


  init(destroyBlankEvent, showMessage) {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._destroyBlankEvent = destroyBlankEvent;
    this._showMessage = showMessage;

    const isAdding = true;

    this._eventEditComponent = new EventEditView(null, this._availableDestinations, this._availableOptions, isAdding);
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
    this._showMessage();

    remove(this._eventEditComponent);
    this._eventEditComponent = null;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }


  _formSubmitHandler(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MAJOR,
        event
    );
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


  setSaving() {
    this._eventEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }


  setAborting() {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    this._eventEditComponent.shake(resetFormState);
  }
}
