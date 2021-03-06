import {RenderPosition, SortType, UpdateType, UserAction, FilterType} from "../const.js";
import {render, remove} from "../utils/render-utils.js";
import {sortPriceDown, sortTimeDown, sortTimeStartUp} from "../utils/events-utils.js";
import TripInformationView from "../view/trip-information-view.js";
import SortingView from "../view/sorting-view.js";
import EventsListView from "../view/events-list-view.js";
import NoEventsNoticeView from "../view/no-events-notice-view.js";
import LoadingView from "../view/loading-view.js";
import EventPresenter, {State as EventPresenterViewState} from "../presenter/event-presenter.js";
import {filter} from "../utils/filter.js";
import EventNewPresenter from "./event-new-presenter.js";


export default class TripPresenter {
  constructor(headerContainer, boardContainer, eventsModel, filterModel, api) {
    this._headerContainerElement = headerContainer;
    this._boardContainerElement = boardContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._api = api;

    this._eventPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._isLoading = true;
    this._loadingComponent = new LoadingView();

    this._tripEventsElement = document.querySelector(`.trip-events`);

    // this._eventChangeHandler = this._eventChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._viewActionHandler = this._viewActionHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._getAllEvents = this._getAllEvents.bind(this);
    this._renderNoEventsNotice = this._renderNoEventsNotice.bind(this);

    this._eventsModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);

    this._sortingComponent = null;
  }


  init() {
    this._renderTrip();
  }


  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    // При каждой перерисовке устанавливается текущий тип фильтрации
    // чтобы при его изменении сбрасывать сортировку
    this._currentFilterType = this._filterModel.getFilter();

    // Количество всех существующих событий
    const eventsCount = this._getAllEvents().length;
    if (eventsCount !== 0) {
      this._renderTripInformation();
    }

    // Количество отображенных событий на странице
    const eventsCurrentCount = this._getEvents().length;
    if (eventsCurrentCount === 0) {
      this._renderNoEventsNotice();
      return;
    }

    this.removeNoEventsNoticeIfExist();
    this._renderSorting();
    this._renderEventsList();
    this._renderEvents();

    this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this._viewActionHandler, this._getDestinations(), this._getOptions());
  }


  createEvent(destroyBlankEvent) {
    this._destroyBlankEvent = destroyBlankEvent;

    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if (this._noEventsNoticeComponent) {
      this.removeNoEventsNoticeIfExist();
      this._renderEventsList();
      this._renderNoEventsNotice();
      this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this._viewActionHandler, this._getDestinations(), this._getOptions());
    }

    this._eventNewPresenter.init(this._destroyBlankEvent, this._renderNoEventsNotice);
  }


  // Метод публичный чтобы использовать в main.js при переходе на статистику в меню
  removeNoEventsNoticeIfExist() {
    if (this._noEventsNoticeComponent) {
      remove(this._noEventsNoticeComponent);
      this._noEventsNoticeComponent = null;
    }
  }


  _renderEventsList() {
    if (this._eventsListComponent !== null) {
      this._eventsListComponent = null;
    }
    this._eventsListComponent = new EventsListView();

    render(this._boardContainerElement, this._eventsListComponent, RenderPosition.BEFOREEND);
  }


  _viewActionHandler(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.SAVING);
        this._api.updateEvent(update)
        .then((response) => {
          this._eventsModel.updateEvent(updateType, response);
        })
        .catch(() => {
          this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
        });
        break;
      case UserAction.ADD_EVENT:
        this._eventNewPresenter.setSaving();
        this._api.addEvent(update)
        .then((response) => {
          this._eventsModel.addEvent(updateType, response);
        })
        .catch(() => {
          this._eventNewPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.DELETING);
        this._api.deleteEvent(update)
        .then(() => {
          this._eventsModel.deleteEvent(updateType, update);
        })
        .catch(() => {
          this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
        });
        break;
    }
  }


  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filter[filterType](events);

    // Если фильтр поменялся, то сбросить сортировку
    if (filterType !== this._currentFilterType) {
      this._currentSortType = SortType.DEFAULT;
    }

    switch (this._currentSortType) {
      case SortType.PRICE_DOWN:
        return filteredEvents.sort(sortPriceDown);
      case SortType.TIME_DOWN:
        return filteredEvents.sort(sortTimeDown);
      case SortType.DEFAULT:
        return filteredEvents.sort(sortTimeStartUp);
    }
    return filteredEvents.sort(sortTimeStartUp);
  }


  _getAllEvents() {
    return this._eventsModel.getEvents();
  }


  _getDestinations() {
    return this._eventsModel.getDestinations();
  }


  _getOptions() {
    return this._eventsModel.getOptions();
  }


  _clearTrip({resetSortType = false, keepTripInformation = false} = {}) {
    if (this._eventNewPresenter) {
      this._eventNewPresenter.destroy();
    }

    Object
      .values(this._eventPresenter)
      .forEach((event) => event.destroy());
    this._eventPresenter = {};

    const eventsCount = this._getEvents();
    if (eventsCount === 0) {
      remove(this._noEventsNoticeComponent);
      this._noEventsNoticeComponent = null;
    }

    if (keepTripInformation === false && !!this._tripInformationComponent) {
      remove(this._tripInformationComponent);
    }

    remove(this._sortingComponent);

    if (this._eventsListComponent) {
      remove(this._eventsListComponent);
    }


    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }


  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._viewActionHandler, this._modeChangeHandler, this._getDestinations(), this._getOptions());
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
    this._tripInformationComponent = new TripInformationView(this._getAllEvents());
    render(this._headerContainerElement, this._tripInformationComponent, RenderPosition.AFTERBEGIN);
  }


  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }
    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    render(this._boardContainerElement, this._sortingComponent, RenderPosition.BEFOREEND);
  }


  _renderLoading() {
    render(this._boardContainerElement, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }


  _renderNoEventsNotice() {
    if (this._noEventsNoticeComponent) {
      return;
    }

    if (this._getAllEvents().length === 0) {
      this._noEventsNoticeComponent = new NoEventsNoticeView();
      render(this._boardContainerElement, this._noEventsNoticeComponent, RenderPosition.BEFOREEND);
    }
  }


  _clearEventsList() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }


  _modeChangeHandler() {
    if (this._eventNewPresenter) {
      this._eventNewPresenter.destroy();
    }
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }


  show() {
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  }


  hide() {
    this._clearTrip({resetSortType: true, keepTripInformation: true});
  }
}
