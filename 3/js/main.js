// массив с именами
const NAMES = [
  'Мария',
  'Николай',
  'Наталья',
  'Андрей',
  'Александр',
  'Елена',
  'Семен',
  'Иван',
  'Петр',
  'Ольга'
];

// массив с описанием фото
const DESCRIPTIONS = [
  'Здесь могла быть Ваша реклама',
  'Мяу!',
  'Какой-то непонятный текст',
  'Ничего не понятно, но очень интересно',
  'А я томат'
];

// массив с комментариями
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// количество объектов, из которых должен состоять итоговый массив
const DESCRIPTIONS_COUNT = 25;

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

// переменные для создания уникального id в объекте createPhotoDescription
const createPhotoId = createRandomIdFromRangeGenerator(1,25);
const createPhotoUrl = createRandomIdFromRangeGenerator(1,25);

// функция для создания уникального id (без лимита значений)
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

// переменная для создания уникального id комментария
const createCommentId = createIdGenerator();

//функция, которая создает объект-комментарий
const createComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// функция, которая создает объект-фото
const createPhotoDescription = () => ({
  id: createPhotoId(),
  url: `photos/${createPhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15,200),
  comments: Array.from({length: 20}, createComment)
});

//функция, которая создаст финальный массив из комментариев и фото
/* eslint-disable */
const createPost = Array.from({length:DESCRIPTIONS_COUNT},createPhotoDescription);



