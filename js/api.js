import { showAlert } from './util.js';
const MessagesError = {
  GET_DATA: 'Не удалось загрузить фотографии',
  SEND_DATA: 'Не удалось опубликовать фотографию',
};

// получение данных
const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error(MessagesError.GET_DATA);
      }
      return response.json();
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert(MessagesError.GET_DATA);
    });
};

// отправка данных
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(MessagesError.SEND_DATA);
      }
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
