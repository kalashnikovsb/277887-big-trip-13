import {RENDER_POSITION, SortType, UpdateType, UserAction} from "../const.js";
import {render, remove} from "../utils/render-utils.js";
import {sortPriceDown, sortTimeDown, sortTimeStartUp} from "../utils/events-utils.js";
import TripInformationView from "../view/trip-information-view.js";
import SortingView from "../view/sorting-view.js";
import EventsListView from "../view/events-list-view.js";
import NoEventsNoticeView from "../view/no-events-notice-view.js";
import EventPresenter from "../presenter/event-presenter.js";


export default class TripPresenter {
  constructor(headerContainer, boardContainer, eventsModel) {
    this._headerContainerElement = headerContainer;
    this._boardContainerElement = boardContainer;
    this._eventsModel = eventsModel;

    this._eventPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._tripEventsElement = document.querySelector(`.trip-events`);

    // this._eventChangeHandler = this._eventChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._viewActionHandler = this._viewActionHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);

    this._eventsModel.addObserver(this._modelEventHandler);

    this._sortingComponent = null;
  }


  init() {
    this._renderTrip();
  }


  _viewActionHandler(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }


  _modelEventHandler(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // Тип обновления соответствует только добавлению задачи в избранное и перерисовывает только текущую задачу
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // Тип обновления срабатывает при фильтрации. Перерисовывает только список событий и сбрасывает тип сортировки
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        // Тип обновления срабатывает при добавлении/удалении задачи и срабатывании отправки формы редактирования любой задачи
        // Тип заставляет перерисовываться всему путешествию, а не только списку событий, т.к. изменения в любой задаче могут повлиять
        // на информацию обо всем путешествии в шапке страницы
        this._clearTrip();
        this._renderTrip();
        break;
    }
  }


  _getEvents() {
    switch (this._currentSortType) {
      case SortType.PRICE_DOWN:
        return this._eventsModel.getEvents().sort(sortPriceDown);
      case SortType.TIME_DOWN:
        return this._eventsModel.getEvents().sort(sortTimeDown);
      case SortType.DEFAULT:
        return this._eventsModel.getEvents().sort(sortTimeStartUp);
    }
    return this._eventsModel.getEvents().sort(sortTimeStartUp);
  }


  _renderTrip() {
    const eventsCount = this._getEvents().length;
    if (eventsCount === 0) {
      this._renderNoEventsNotice();
      return;
    }
    this._renderTripInformation();
    this._renderSorting();
    this._renderEventsList();
    this._renderEvents();
  }


  _clearTrip({resetSortType = false} = {}) {
    Object
      .values(this._eventPresenter)
      .forEach((event) => event.destroy());
    this._eventPresenter = {};

    const eventsCount = this._getEvents();
    if (eventsCount === 0) {
      remove(this._noEventsNoticeComponent);
    }

    remove(this._tripInformationComponent);
    remove(this._sortingComponent);
    remove(this._eventsListComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }


  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._viewActionHandler, this._modeChangeHandler);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }


  _renderEvents() {
    const events = this._getEvents();
    events.forEach((event) => this._renderEvent(event));
  }


  _renderTripInformation() {
    if (this._tripInformationComponent !== null) {
      this._tripInformationComponent = null;
    }
    this._tripInformationComponent = new TripInformationView(this._getEvents());
    render(this._headerContainerElement, this._tripInformationComponent, RENDER_POSITION.AFTERBEGIN);
  }


  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }
    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    render(this._boardContainerElement, this._sortingComponent, RENDER_POSITION.BEFOREEND);
  }


  _renderEventsList() {
    if (this._eventsListComponent !== null) {
      this._eventsListComponent = null;
    }
    this._eventsListComponent = new EventsListView();
    render(this._boardContainerElement, this._eventsListComponent, RENDER_POSITION.BEFOREEND);
  }


  _renderNoEventsNotice() {
    if (this._noEventsNoticeComponent !== null) {
      this._noEventsNoticeComponent = null;
    }
    this._noEventsNoticeComponent = new NoEventsNoticeView();
    render(this._tripEventsElement, this._noEventsNoticeComponent, RENDER_POSITION.BEFOREEND);
  }


  _clearEventsList() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }


  // Обработчики
  // _eventChangeHandler(updatedEvent) {
  //   // Здесь будем вызывать обновление модели
  //   console.log(1);
  //   this._eventPresenter[updatedEvent.id].init(updatedEvent);
  // }


  _modeChangeHandler() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.resetView());
  }


  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }
}
