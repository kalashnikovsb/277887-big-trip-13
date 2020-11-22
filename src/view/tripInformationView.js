import dayjs from "dayjs";

const getDestinations = (events) => {
  if (events.length === 0) {
    return ``;
  }
  let destinations = [];
  for (let item of events) {
    destinations.push(item.destination);
  }
  const uniqueDestinations = new Set(destinations);
  return Array.from(uniqueDestinations).join(` &mdash; `);
};

const getTripDates = (events) => {
  let eventsCopy = events.slice();
  eventsCopy.sort(sortingTimeUp);
  const startDate = dayjs(eventsCopy[0].timeStart).format(`MMM DD`);
  const endDate = dayjs(eventsCopy[eventsCopy.length - 1].timeEnd).format(`DD`);
  return `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
};

const sortingTimeUp = (eventA, eventB) => {
  return eventA.timeEnd.getTime() - eventB.timeEnd.getTime();
};

export const tripInformationView = (events) => {
  return `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getDestinations(events)}</h1>

      <p class="trip-info__dates">${getTripDates(events)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`;
};
