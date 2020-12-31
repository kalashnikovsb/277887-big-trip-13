import FiltersView from "../view/filters-view.js";
import {RenderPosition, FilterType, UpdateType} from "../const.js";
import {render, replace, remove} from "../utils/render-utils.js";
import {filter} from "../utils/filter.js";


export default class FilterPresenter {
  constructor(filterContainer, filterModel, eventsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;
    this._currentFilter = null;
    this._filterComponent = null;

    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this._eventsModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);
  }


  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FiltersView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._filterTypeChangeHandler);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTEREND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }


  _modelEventHandler() {
    this.init();
  }


  _filterTypeChangeHandler(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }


  _getFilters() {
    const events = this._eventsModel.getEvents();
    return [
      {
        type: FilterType.EVERYTHING,
        name: `Everything`,
        count: filter[FilterType.EVERYTHING](events).length
      },
      {
        type: FilterType.FUTURE,
        name: `Future`,
        count: filter[FilterType.FUTURE](events).length
      },
      {
        type: FilterType.PAST,
        name: `Past`,
        count: filter[FilterType.PAST](events).length
      }
    ];
  }


  filtersDisable() {
    this._filterComponent.filtersDisable();
  }

  filtersEnable() {
    this._filterComponent.filtersEnable();
  }
}
