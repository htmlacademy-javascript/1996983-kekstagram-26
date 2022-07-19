const ERROR_SHOW_TIME = 5000;

//Функция, возвращающая случайное целое число из переданного диапазона

const getRandomInt = (min, max)  => {
  if (min < 0 || max < 0) {
    return false;
  }

  return (max > min) ? Math.floor(Math.random() * (max - min + 1) + min)
    : Math.floor(Math.random() * (min - max + 1) + max);
};

// Функция проверки длины введённого комментария

const checkLine = (line, maxLength) =>
  (line.length <= maxLength);

//Временный вызов функции checkLine
checkLine('Hello, world!', 10);

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';


//ошибка
const showError = () => {
  const errorSectionNode = document.createElement('section');
  errorSectionNode.className = 'error';
  errorSectionNode.insertAdjacentHTML('afterbegin',
    '<div class="error__inner"><h2 class="error__title">Не удалось загрузить фотографии</h2></div>');
  document.body.append(errorSectionNode);
  setTimeout(() => {
    errorSectionNode.remove();
  }, ERROR_SHOW_TIME);
};

export { getRandomInt, getRandomArrayElement, isEscapeKey, showError};
