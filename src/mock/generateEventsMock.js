import {
  DAYS_GAP,
  TYPES,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MIN_OPTIONS_COUNT,
  MAX_OPTIONS_COUNT,
  MIN_PHOTOS_COUNT,
  MAX_PHOTOS_COUNT,
  PHOTO_URL,
  DESTINATIONS,
  DESCRIPTIONS,
  OPTIONS,
} from "../const.js";
import {getRandomInteger, getRandomArrayElement, getRandomSubArray} from "../utils/commonUtils.js";
import dayjs from "dayjs";

const generateTimeStart = () => {
  let timeStart = dayjs().add(getRandomInteger(-DAYS_GAP, DAYS_GAP), `day`);
  return timeStart.toDate();
};

// Прибавляет от 15 минут до 2х суток к начальному времени
const generateTimeEnd = (timeStart) => {
  const minDuration = 15;
  const maxDuration = 60 * 24 * 2;
  const timeEnd = dayjs(timeStart).add(getRandomInteger(minDuration, maxDuration), `minute`);
  return timeEnd.toDate();
};

export const generateEventsMock = () => {
  const type = getRandomArrayElement(TYPES);
  const destination = getRandomArrayElement(DESTINATIONS);
  const description = getRandomSubArray(DESCRIPTIONS, MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH).join(` `);
  const options = getRandomSubArray(OPTIONS, MIN_OPTIONS_COUNT, MAX_OPTIONS_COUNT);
  const price = getRandomInteger(10, 100);
  const photos = getRandomSubArray([PHOTO_URL], MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT);
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
