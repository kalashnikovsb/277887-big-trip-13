import {RENDER_POSITION} from "../const.js";


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


export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const render = (container, element, position) => {
  switch (position) {
    case RENDER_POSITION.BEFOREBEGIN:
      container.before(element);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(element);
      break;
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case RENDER_POSITION.AFTEREND:
      container.after(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


export {getNumberWithZero, getDuration, render, createElement};
