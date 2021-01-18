const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const getRandomElement = (array) => {
  const lastIndex = array.length - 1;
  const randomIndex = getRandomInteger(0, lastIndex);
  return array[randomIndex];
};


// Функция возвращает подмассив переданного массива, имеющий случайную длину (в т.ч. пустой) и состоящий из случайных элементов
const getRandomItems = (array, minLength, maxLength) => {
  let length = getRandomInteger(minLength, maxLength);
  if (length === 0) {
    return [];
  }
  let subArray = [];
  while (length) {
    subArray.push(getRandomElement(array));
    length--;
  }
  return subArray;
};


const isOnline = () => {
  return window.navigator.onLine;
};


export {getRandomInteger, getRandomElement, getRandomItems, isOnline};
