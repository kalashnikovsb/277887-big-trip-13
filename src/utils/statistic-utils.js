const getEventsPricesByTypes = (types, events) => {
  const eventsPricesByTypes = [];

  types.forEach((type) => {
    let result = 0;
    events.forEach((event) => {
      if (event.type === type) {
        result += Number(event.price);
        event.options.forEach((option) => {
          result += option.price;
        });
      }
    });
    eventsPricesByTypes.push(result);
  });

  return eventsPricesByTypes;
};


const geteventsCountsByTypes = (types, events) => {
  const eventsCountsByTypes = [];

  types.forEach((type) => {
    let result = 0;
    events.forEach((event) => {
      if (event.type === type) {
        result += 1;
      }
    });
    eventsCountsByTypes.push(result);
  });

  return eventsCountsByTypes;
};


const getDurationsByTypes = (types, events) => {
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const eventsDurationsByTypes = [];

  types.forEach((type) => {
    let result = 0;
    events.forEach((event) => {
      if (event.type === type) {
        result += (event.timeEnd.getTime() - event.timeStart.getTime());
      }
    });
    eventsDurationsByTypes.push(result);
  });

  const durations = eventsDurationsByTypes.map((item) => {
    return Math.trunc(item / millisecondsInDay);
  });

  return durations;
};


export {getEventsPricesByTypes, geteventsCountsByTypes, getDurationsByTypes};
