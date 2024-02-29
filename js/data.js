import {getRandomInteger,getRandomArrayElement,createRandomIdFromRangeGenerator,createIdGenerator} from './util.js';

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

// константы с заданными значениями диапазонов
const AVATARS_COUNT = 6;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const PHOTO_ID_MAX = 25;
const PHOTO_URL_MAX = 25;

// переменные для создания уникального id в объекте createPhotoDescription
const createPhotoId = createRandomIdFromRangeGenerator(1,PHOTO_ID_MAX);
const createPhotoUrl = createRandomIdFromRangeGenerator(1,PHOTO_URL_MAX);

// переменная для создания уникального id комментария
const createCommentId = createIdGenerator();

// функция-генератор комментариев
const createMessage = () => Array.from({length: getRandomInteger(1,2)}, () =>
  getRandomArrayElement(MESSAGES))
  .join(' ');

//функция, которая создает объект-комментарий
const createComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,AVATARS_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

// функция, которая создает объект-фото
const createPhotoDescription = () => ({
  id: createPhotoId(),
  url: `photos/${createPhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN_COUNT,LIKES_MAX_COUNT),
  comments: Array.from({length: 20}, createComment)
});

//функция, которая создаст финальный массив из комментариев и фото
const createPost = () => Array.from({length:DESCRIPTIONS_COUNT},createPhotoDescription);

export {createPost};
