const sortTimeStartUp = (eventA, eventB) => {
  return eventA.timeStart.getTime() - eventB.timeStart.getTime();
};


const sortTimeEndUp = (eventA, eventB) => {
  return eventA.timeEnd.getTime() - eventB.timeEnd.getTime();
};


const sortPriceDown = (eventA, eventB) => {
  return eventB.price - eventA.price;
};


const sortTimeDown = (eventA, eventB) => {
  const durationA = eventA.timeEnd.getTime() - eventA.timeStart.getTime();
  const durationB = eventB.timeEnd.getTime() - eventB.timeStart.getTime();
  return durationB - durationA;
};


// Функция добавляет или удаляет опцию в массив в зависимости от ее наличия
const addOrDeleteOption = (array, option) => {
  let result = array.slice();
  let index = -1;
  result.forEach((item, i) => {
    if (item.name === option.name) {
      index = i;
    }
  });
  if (index === -1) {
    result.push(option);
  } else {
    result = [
      ...result.slice(0, index),
      ...result.slice(index + 1)
    ];
  }
  return result;
};


const isFutureEvent = (time) => {
  const currentTime = new Date().getTime();
  const targetTime = time.getTime();
  return (targetTime > currentTime) ? true : false;
};

const isPastEvent = (time) => {
  const currentTime = new Date().getTime();
  const targetTime = time.getTime();
  return (targetTime < currentTime) ? true : false;
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export {sortTimeStartUp, sortTimeEndUp, sortPriceDown, sortTimeDown, addOrDeleteOption, isFutureEvent, isPastEvent, generateId};
