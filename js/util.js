// генератор рандомных чисел (без ограничений повторяемости при заданном промежутке)
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// переменная для перебора значений в массивах (комментарии, описания, имена)
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// функция для создания уникального id (при заданном промежутке значений)
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// функция для создания уникального id (без лимита значений)
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

export {getRandomInteger,getRandomArrayElement,createRandomIdFromRangeGenerator,createIdGenerator};
