import {RenderPosition, SortType, UpdateType, UserAction, FilterType} from "../const.js";
import {render, remove} from "../utils/render-utils.js";
import {sortPriceDown, sortTimeDown, sortTimeStartUp} from "../utils/events-utils.js";
import TripInformationView from "../view/trip-information-view.js";
import SortingView from "../view/sorting-view.js";
import EventsListView from "../view/events-list-view.js";
import NoEventsNoticeView from "../view/no-events-notice-view.js";
import EventPresenter from "../presenter/event-presenter.js";
import {filter} from "../utils/filter.js";
import EventNewPresenter from "./event-new-presenter.js";


export default class TripPresenter {
  constructor(headerContainer, boardContainer, eventsModel, filterModel) {
    this._headerContainerElement = headerContainer;
    this._boardContainerElement = boardContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;

    this._eventPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._tripEventsElement = document.querySelector(`.trip-events`);

    // this._eventChangeHandler = this._eventChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._viewActionHandler = this._viewActionHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);

    this._eventsModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);

    this._sortingComponent = null;
  }


  init() {
    this._renderTrip();
  }


  _renderTrip() {
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

    this._removeNoEventsNoticeIfExist();
    this._renderSorting();
    this._renderEventsList();
    this._renderEvents();

    this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this._viewActionHandler);
  }


  createEvent() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    if (this._noEventsNoticeComponent) {
      this._removeNoEventsNoticeIfExist();
      this._renderEventsList();
      this._renderNoEventsNotice();
      this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this._viewActionHandler);
    }
    this._eventNewPresenter.init();
  }


  _removeNoEventsNoticeIfExist() {
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


  // get currentSortType() {
  //   return this._currentSortType;
  // }
  //
  //
  // set currentSortType(value) {
  //   this._currentSortType = value;
  // }


  _getAllEvents() {
    return this._eventsModel.getEvents();
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

    if (keepTripInformation === false) {
      remove(this._tripInformationComponent);
    }

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


  _renderNoEventsNotice() {
    if (this._noEventsNoticeComponent) {
      return;
    }
    this._noEventsNoticeComponent = new NoEventsNoticeView();
    render(this._boardContainerElement, this._noEventsNoticeComponent, RenderPosition.BEFOREEND);
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
    }
  }


  // destroy() {
  //   this._clearTrip({resetSortType: true, keepTripInformation: true});
  // }


  show() {
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  }


  hide() {
    this._clearTrip({resetSortType: true, keepTripInformation: true});
  }
}
