const ALERT_SHOW_TIME = 5000;

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

// устранение дребезга
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.className = 'alert';
  const alertText = document.createElement('h2');
  alertText.className = 'error__title';
  alertText.textContent = message;
  alertContainer.append(alertText);
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomArrayElement(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showAlert, shuffleArray, debounce };
