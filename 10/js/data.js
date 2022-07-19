import { getRandomArrayElement } from './util.js';
import { getRandomInt } from './util.js';

// Имена авторов
const NAMES = [
  'Марина',
  'Света',
  'Екатерина',
  'Мария',
  'Ксения',
  'Михаил',
  'Матвей',
  'Егор',
  'Максим',
  'Олег',
];

// Текст комментария
const MASSAGES_SET = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

//Описание фотографии
const DESCRIPTION_SET = [
  'Просто фото.',
  'Хорошая фотография.',
  'Очень красивая фотография!',
  'Великолепная фотография!',
];

//количество фото
const PHOTO_COUNT = 25;

//количество комментариев
const PHOTO_COMMENT = 4;

const imageId = [];
for (let i = 1; i <= PHOTO_COUNT; i++) {
  imageId.push(i);
}

let commentCounter = 0;

const getComments = () => {
  const comments = [];

  for (let i = 0; i <= getRandomInt(1, PHOTO_COMMENT); i++) {
    comments.push({
      id: commentCounter++,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomArrayElement(MASSAGES_SET),
      name: getRandomArrayElement(NAMES),
    });
  }
  return comments;
};

const getRandomPhotoDescription = () => ({
  id: imageId.shift(),
  url: `photos/${getRandomInt(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION_SET),
  likes: getRandomInt(15, 200),
  comments: getComments(),
});

const photoDescription = Array.from({ length: PHOTO_COUNT }, getRandomPhotoDescription);

export { photoDescription };
