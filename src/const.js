const EVENTS_COUNT = 20;
const DAYS_GAP = 7;
const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 5;
const MIN_OPTIONS_COUNT = 0;
const MAX_OPTIONS_COUNT = 5;
const MIN_PHOTOS_COUNT = 0;
const MAX_PHOTOS_COUNT = 10;
const DESTINATIONS = [
  `Moscow`,
  `Khabarovsk`,
  `Krasnoyarsk`,
  `Omsk`,
  `Irkutsk`,
  `Saint-Petersburg`,
];
const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Aliquam erat volutpat.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const OPTIONS = [
  {name: `Add luggage`, price: 50, id: `luggage`},
  {name: `Switch to Comfort`, price: 80, id: `comfort`},
  {name: `Add meal`, price: 15, id: `meal`},
  {name: `Choose seats`, price: 5, id: `seats`},
  {name: `Travel by train`, price: 40, id: `train`},
  {name: `Order Uber`, price: 20, id: `uber`},
  {name: `Rent a car`, price: 200, id: `car`},
  {name: `Add breakfast`, price: 50, id: `breakfast`},
  {name: `Book tickets`, price: 40, id: `tickets`},
  {name: `Lunch in city`, price: 30, id: `linch`},
];

export {
  EVENTS_COUNT,
  DAYS_GAP,
  TYPES,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MIN_OPTIONS_COUNT,
  MAX_OPTIONS_COUNT,
  MIN_PHOTOS_COUNT,
  MAX_PHOTOS_COUNT,
  DESTINATIONS,
  DESCRIPTIONS,
  OPTIONS,
};
