//Функция, возвращающая случайное целое число из переданного диапазона

const getRandomInt = (min, max)  => {
  if (min < 0 || max < 0) {
    return false;
  }

  return (max > min) ? Math.floor(Math.random() * (max - min + 1) + min)
    : Math.floor(Math.random() * (min - max + 1) + max);
};

getRandomInt(10, 20);


// Функция проверки длины введённого комментария

const checkLine = (line, maxLength) =>
  (line.length <= maxLength);

checkLine('Hello, world!', 10);

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

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const imageId = [];
for (let i = 1; i <= PHOTO_COUNT; i++) {
  imageId.push(i);
}

const imageIdComments = [];
for (let i=1; i<=1000; i++) {
  imageIdComments.push(i);
}

const getComments = () => {
  const comments = [];

  for (let i = 0; i <=getRandomInt(1, PHOTO_COMMENT); i++) {
    comments.push({
      id: imageIdComments.shift(),
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

// eslint-disable-next-line no-console
console.log(photoDescription);
