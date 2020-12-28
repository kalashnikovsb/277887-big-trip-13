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
    this._callback.menuClick(evt.target.dataset.MenuItem);
  }


  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }


  // Сброс класса выделяющего как активный у всех ссылок
  resetAllActivesMenuItems() {
    const allItems = this.getElement().querySelectorAll(`.trip-tabs__btn`);
    Array.from(allItems).forEach((item) => {
      item.classList.remove(`trip-tabs__btn--active`);
    });
  }


  setMenuItem(menuItem) {
    this.resetAllActivesMenuItems();
    const item = this.getElement().querySelector(`[data-menu-item=${menuItem}]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
