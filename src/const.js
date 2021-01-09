const EVENTS_COUNT = 10;
const DAYS_GAP = 7;
const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const MIN_OPTIONS_COUNT = 0;
const MAX_OPTIONS_COUNT = 3;
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
  `Fusce tristique felis at fermentum pharetra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Nunc fermentum tortor ac porta dapibus.`
];

// Каждому городу свое описание
const DESTINATIONS_TO_DESCRIPTIONS = {
  [DESTINATIONS[0]]: [DESCRIPTIONS[0]],
  [DESTINATIONS[1]]: [DESCRIPTIONS[1]],
  [DESTINATIONS[2]]: [DESCRIPTIONS[2]],
  [DESTINATIONS[3]]: [DESCRIPTIONS[3]],
  [DESTINATIONS[4]]: [DESCRIPTIONS[4]],
  [DESTINATIONS[5]]: [DESCRIPTIONS[5]],
};

const OPTIONS = [
  {name: `Add luggage`, price: 50},
  {name: `Switch to Comfort`, price: 80},
  {name: `Add meal`, price: 15},
  {name: `Choose seats`, price: 5},
  {name: `Travel by train`, price: 40},
  {name: `Order Uber`, price: 20},
  {name: `Rent a car`, price: 200},
  {name: `Add breakfast`, price: 50},
  {name: `Book tickets`, price: 40},
  {name: `Lunch in city`, price: 30},
];

// Каждому событию доступны свои рандомные опции, но выбраны будут рандомные
const TYPES_TO_OPTIONS = {
  [TYPES[0]]: [OPTIONS[0], OPTIONS[1], OPTIONS[2], OPTIONS[3]],
  [TYPES[1]]: [OPTIONS[1], OPTIONS[2], OPTIONS[3]],
  [TYPES[2]]: [OPTIONS[2], OPTIONS[3], OPTIONS[4], OPTIONS[5]],
  [TYPES[3]]: [OPTIONS[3], OPTIONS[4], OPTIONS[5]],
  [TYPES[4]]: [OPTIONS[4], OPTIONS[5], OPTIONS[6], OPTIONS[7]],
  [TYPES[5]]: [OPTIONS[5], OPTIONS[6], OPTIONS[7]],
  [TYPES[6]]: [OPTIONS[6], OPTIONS[7], OPTIONS[8], OPTIONS[9]],
  [TYPES[7]]: [OPTIONS[7], OPTIONS[8], OPTIONS[9]],
  [TYPES[8]]: [OPTIONS[8], OPTIONS[9], OPTIONS[0], OPTIONS[1]],
  [TYPES[9]]: [OPTIONS[9], OPTIONS[0], OPTIONS[1]],
};

const EMPTY_EVENT = {
  type: TYPES[6], // Flight по умолчанию
  destination: ``,
  description: ``,
  options: [],
  price: ``,
  photos: [],
  timeStart: new Date(),
  timeEnd: new Date(),
  isFavorite: false,
};

const RenderPosition = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

const SortType = {
  DEFAULT: `default`,
  PRICE_DOWN: `price-down`,
  TIME_DOWN: `time-down`,
};

const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const MenuItem = {
  ADD_NEW_EVENT: `ADD_NEW_EVENT`,
  TABLE: `TABLE`,
  STATS: `STATS`
};

const BAR_HEIGHT = 100;

export {
  EVENTS_COUNT,
  DAYS_GAP,
  TYPES,
  MIN_OPTIONS_COUNT,
  MAX_OPTIONS_COUNT,
  MIN_PHOTOS_COUNT,
  MAX_PHOTOS_COUNT,
  DESTINATIONS,
  DESCRIPTIONS,
  DESTINATIONS_TO_DESCRIPTIONS,
  OPTIONS,
  TYPES_TO_OPTIONS,
  EMPTY_EVENT,
  RenderPosition,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  MenuItem,
  BAR_HEIGHT
};
