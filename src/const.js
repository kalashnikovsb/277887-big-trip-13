const EVENTS_COUNT = 10;
const DAYS_GAP = 7;
const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const MIN_OPTIONS_COUNT = 0;
const MAX_OPTIONS_COUNT = 4;


const DESTINATIONS = [
  {
    name: `Moscow`,
    description: `MoscowMoscow`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `MoscowMoscow`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `MoscowMoscow`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `MoscowMoscow`
      },
    ]
  },
  {
    name: `Saint-Petersburg`,
    description: `Saint-PetersburgSaint-Petersburg`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `Saint-PetersburgSaint-Petersburg`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `Saint-PetersburgSaint-Petersburg`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `Saint-PetersburgSaint-Petersburg`
      },
    ]
  },
  {
    name: `Khabarovsk`,
    description: `KhabarovskKhabarovsk`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `KhabarovskKhabarovsk`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `KhabarovskKhabarovsk`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `KhabarovskKhabarovsk`
      },
    ]
  },
  {
    name: `Krasnoyarsk`,
    description: `KrasnoyarskKrasnoyarsk`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `KrasnoyarskKrasnoyarsk`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `KrasnoyarskKrasnoyarsk`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `KrasnoyarskKrasnoyarsk`
      },
    ]
  },
  {
    name: `Omsk`,
    description: `OmskOmsk`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `OmskOmsk`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `OmskOmsk`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `OmskOmsk`
      },
    ]
  },
  {
    name: `Irkutsk`,
    description: `IrkutskIrkutsk`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `IrkutskIrkutsk`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `IrkutskIrkutsk`
      },
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `IrkutskIrkutsk`
      },
    ]
  }
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Nunc fermentum tortor ac porta dapibus.`
];


const OPTIONS = [
  {
    type: `Taxi`,
    offers: [
      {
        title: `1`,
        price: 1
      },
      {
        title: `2`,
        price: 2
      },
      {
        title: `3`,
        price: 3
      },
      {
        title: `4`,
        price: 4
      },
    ]
  },
  {
    type: `Bus`,
    offers: [
      {
        title: `5`,
        price: 5
      },
      {
        title: `6`,
        price: 6
      },
      {
        title: `7`,
        price: 7
      },
      {
        title: `8`,
        price: 8
      },
    ]
  },
  {
    type: `Train`,
    offers: [
      {
        title: `9`,
        price: 9
      },
      {
        title: `10`,
        price: 10
      },
      {
        title: `11`,
        price: 11
      },
      {
        title: `12`,
        price: 12
      },
    ]
  },
  {
    type: `Ship`,
    offers: [
      {
        title: `13`,
        price: 13
      },
      {
        title: `14`,
        price: 14
      },
      {
        title: `15`,
        price: 15
      },
      {
        title: `16`,
        price: 16
      },
    ]
  },
  {
    type: `Transport`,
    offers: [
      {
        title: `17`,
        price: 17
      },
      {
        title: `18`,
        price: 18
      },
      {
        title: `19`,
        price: 19
      },
      {
        title: `20`,
        price: 20
      },
    ]
  },
  {
    type: `Drive`,
    offers: [
      {
        title: `21`,
        price: 21
      },
      {
        title: `22`,
        price: 22
      },
      {
        title: `23`,
        price: 23
      },
      {
        title: `24`,
        price: 24
      },
    ]
  },
  {
    type: `Flight`,
    offers: [
      {
        title: `25`,
        price: 25
      },
      {
        title: `26`,
        price: 26
      },
      {
        title: `27`,
        price: 27
      },
      {
        title: `28`,
        price: 28
      },
    ]
  },
  {
    type: `Check-in`,
    offers: [
      {
        title: `29`,
        price: 29
      },
      {
        title: `30`,
        price: 30
      },
      {
        title: `31`,
        price: 31
      },
      {
        title: `32`,
        price: 32
      },
    ]
  },
  {
    type: `Sightseeing`,
    offers: [
      {
        title: `33`,
        price: 33
      },
      {
        title: `34`,
        price: 34
      },
      {
        title: `35`,
        price: 35
      },
      {
        title: `36`,
        price: 36
      },
    ]
  },
  {
    type: `Restaurant`,
    offers: [
      {
        title: `37`,
        price: 37
      },
      {
        title: `38`,
        price: 38
      },
      {
        title: `39`,
        price: 39
      },
      {
        title: `40`,
        price: 40
      },
    ]
  },
];

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
  MAJOR: `MAJOR`,
  INIT: `INIT`
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
  DESTINATIONS,
  DESCRIPTIONS,
  OPTIONS,
  RenderPosition,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  MenuItem,
  BAR_HEIGHT
};
