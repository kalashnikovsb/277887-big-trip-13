import {RenderPosition} from "../const.js";
import {render, replace, remove} from "../utils/render-utils.js";
import EventEditView from "../view/event-edit-view.js";
import EventView from "../view/event-view.js";
import {UserAction, UpdateType} from "../const.js";
import {isOnline} from "../utils/common-utils.js";
import {toast} from "../utils/toast/toast.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};


export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};


export default class EventPresenter {
  constructor(eventsListContainer, changeData, changeMode, availableDestinations, availableOptions) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._availableDestinations = availableDestinations;
    this._availableOptions = availableOptions;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._eventOpenClickHandler = this._eventOpenClickHandler.bind(this);
    this._eventEditCloseClickHandler = this._eventEditCloseClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }


  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    const isAdding = false;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event, this._availableDestinations, this._availableOptions, isAdding);

    // Передаю коллбеки в обработчики внутри view компонентов
    this._eventComponent.setEventOpenClickHandler(this._eventOpenClickHandler);
    this._eventComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._eventEditComponent.setEventEditCloseClickHandler(this._eventEditCloseClickHandler);
    this._eventEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._eventEditComponent.setDeleteClickHandler(this._deleteClickHandler);

    // Если предыдущих компонентов нет то отрисовать новые
    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Отрисовка нового события вместо старого, проверка нужна чтобы не заменять то чего нет
    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    // Отрисовка нового события вместо старого, проверка нужна чтобы не заменять то чего нет
    if (this._mode === Mode.EDITING) {
      replace(this._eventComponent, prevEventEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }


  setViewState(state) {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._eventComponent.shake(resetFormState);
        this._eventEditComponent.shake(resetFormState);
    }
  }


  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }


  // Переключатели
  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }


  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }


  // Коллбеки для обработчиков
  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceEditToEvent();
    }
  }


  _eventOpenClickHandler() {
    if (!isOnline()) {
      toast(`You can't open event offline`);
      return;
    }
    this._replaceEventToEdit();
  }


  _eventEditCloseClickHandler() {
    this._eventEditComponent.reset(this._event);
    this._replaceEditToEvent();
  }


  _favoriteClickHandler() {
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.PATCH,
        Object.assign({},
            this._event,
            {isFavorite: !this._event.isFavorite}
        )
    );
  }


  _formSubmitHandler(event) {
    if (!isOnline()) {
      toast(`You can't save event offline`);
      return;
    }
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.MAJOR,
        event
    );
  }


  _deleteClickHandler(event) {
    if (!isOnline()) {
      toast(`You can't delete event offline`);
      return;
    }
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MAJOR,
        event
    );
  }


  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }
}
