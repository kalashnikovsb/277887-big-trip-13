const sortTimeStartUp = (eventA, eventB) => {
  return eventA.timeStart.getTime() - eventB.timeStart.getTime();
};


const sortTimeEndUp = (eventA, eventB) => {
  return eventA.timeEnd.getTime() - eventB.timeEnd.getTime();
};


export {sortTimeStartUp, sortTimeEndUp};
