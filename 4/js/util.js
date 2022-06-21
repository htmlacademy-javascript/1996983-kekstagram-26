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

export { getRandomInt };
export { getRandomArrayElement };
