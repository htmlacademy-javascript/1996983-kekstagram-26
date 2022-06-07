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
