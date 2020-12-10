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

export {sortTimeStartUp, sortTimeEndUp, sortPriceDown, sortTimeDown};
