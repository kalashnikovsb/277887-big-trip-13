const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


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


export {render, getNumberWithZero, getDuration};
