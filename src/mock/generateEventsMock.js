import {
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
} from "../const.js";
import {getRandomInteger, getRandomElement, getRandomItems} from "../utils/commonUtils.js";
import dayjs from "dayjs";

// Прибавляет к текущему времени от -7 до 7 дней и от -30 до 30 минут
const generateTimeStart = () => {
  let timeStart = dayjs().add(getRandomInteger(-DAYS_GAP, DAYS_GAP), `day`).add(getRandomInteger(-30, 30), `minute`);
  return timeStart.toDate();
};

// Прибавляет от 15 минут до 2х суток к начальному времени
const generateTimeEnd = (timeStart) => {
  const minDuration = 15;
  const maxDuration = 60 * 24 * 2;
  const timeEnd = dayjs(timeStart).add(getRandomInteger(minDuration, maxDuration), `minute`);
  return timeEnd.toDate();
};

const generatePhotos = () => {
  let count = getRandomInteger(MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT);
  let photosList = [];
  while (count--) {
    photosList.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photosList;
};

export const generateEventsMock = () => {
  const type = getRandomElement(TYPES);
  const destination = getRandomElement(DESTINATIONS);
  const description = getRandomItems(DESCRIPTIONS, MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH).join(` `);
  const options = getRandomItems(OPTIONS, MIN_OPTIONS_COUNT, MAX_OPTIONS_COUNT);
  const price = getRandomInteger(10, 100);
  const photos = generatePhotos();
  const timeStart = generateTimeStart();
  const timeEnd = generateTimeEnd(timeStart);
  const isFavorite = Boolean(getRandomInteger(0, 1));

  return {
    type,
    destination,
    description,
    options,
    price,
    photos,
    timeStart,
    timeEnd,
    isFavorite,
  };
};
