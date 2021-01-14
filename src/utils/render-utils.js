import {RenderPosition} from "../const.js";
import AbstractView from "../view/abstract-view.js";


const getNumberWithZero = (number) => {
  return (number >= 0 && number < 10) ? `0` + number : number;
};


const getDuration = (timeStart, timeEnd) => {
  let days = timeEnd.diff(timeStart, `day`);
  timeEnd = timeEnd.subtract(days, `day`);
  let hours = timeEnd.diff(timeStart, `hour`);
  timeEnd = timeEnd.subtract(hours, `hour`);
  let minutes = timeEnd.diff(timeStart, `minute`);
  timeEnd = timeEnd.subtract(minutes, `minute`);
  days = (days === 0) ? `` : getNumberWithZero(days) + `D`;
  minutes = (minutes === 0) ? `00M` : getNumberWithZero(minutes) + `M`;
  if (days !== 0 && hours === 0) {
    hours = `00H`;
  } else if (days === 0 && hours === 0) {
    hours = ``;
  } else {
    hours = getNumberWithZero(hours) + `H`;
  }
  return `${days} ${hours} ${minutes}`;
};


const renderTemplate = (container, template, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }
  container.insertAdjacentHTML(place, template);
};


const render = (container, child, position) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }
  if (child instanceof AbstractView) {
    child = child.getElement();
  }
  switch (position) {
    case RenderPosition.BEFOREBEGIN:
      container.before(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.AFTEREND:
      container.after(child);
      break;
  }
};


const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }
  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }
  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }
  parent.replaceChild(newChild, oldChild);
};


const remove = (component) => {
  if (component === null) {
    return;
  }
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};

export {getNumberWithZero, getDuration, renderTemplate, render, createElement, replace, remove};
