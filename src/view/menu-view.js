import AbstractView from "./abstract-view.js";
import {MenuItem} from "../const.js";


const getMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu-item="${MenuItem.TABLE}">Table</a>
    <a class="trip-tabs__btn" href="#" data-menu-item="${MenuItem.STATS}">Stats</a>
  </nav>`;
};


export default class MenuView extends AbstractView {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }


  getTemplate() {
    return getMenuTemplate();
  }


  _menuClickHandler(evt) {
    evt.preventDefault();
    this.setMenuItem(evt.target.dataset.menuItem);
    this._callback.menuClick(evt.target.dataset.menuItem);
  }


  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }


  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-menu-item=${menuItem}]`);

    this._resetMenuItemsActiveClass();

    if (menuItem === MenuItem.ADD_NEW_EVENT) {
      this.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`).classList.add(`trip-tabs__btn--active`);
    }

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }


  _resetMenuItemsActiveClass() {
    const items = this.getElement().querySelectorAll(`.trip-tabs__btn`);
    items.forEach((item) => {
      item.classList.remove(`trip-tabs__btn--active`);
    });
  }
}
