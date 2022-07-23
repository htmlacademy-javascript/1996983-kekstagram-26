import { sendData } from './api.js';
import { FormValidation } from './validation.js';
import { isEscapeKey } from './util.js';
import { cancelPhotoContainer, uploadPhotoFormNode } from './upload-form.js';

const body = document.querySelector('body');
const successContainerNode = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButtonNode = successContainerNode.querySelector('.success__button');
const errorContainerNode = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButtonNode = errorContainerNode.querySelector('.error__button');
const submitButtonNode = document.querySelector('#upload-submit');

//блокировка кнопки
const blockSubmitButton = () => {
  submitButtonNode.disabled = true;
  submitButtonNode.textContent = 'Публикую...';
};

//разблокировка кнопки
const unblockSubmitButton = () => {
  submitButtonNode.disabled = false;
  submitButtonNode.textContent = 'Опубликовать';
};

//успешная отправка
const onSuccessContainerEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelSuccessMessage();
  }
};

const onDocumentExceptSuccessContainerClick = (evt) => {
  if (evt.target === successContainerNode) {
    cancelSuccessMessage();
  }
};

successButtonNode.addEventListener('click', cancelSuccessMessage);

function cancelSuccessMessage() {
  successContainerNode.remove();
  document.removeEventListener('keydown', onSuccessContainerEscKeydown);
  document.removeEventListener('click', onDocumentExceptSuccessContainerClick);
}

const showSuccessMessage = () => {
  body.append(successContainerNode);
  document.addEventListener('keydown', onSuccessContainerEscKeydown);
  document.addEventListener('click', onDocumentExceptSuccessContainerClick);
};

//ошибка отправки
const onErrorContainerEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelErrorMessage();
  }
};

const onDocumentExceptErrorContainerClick = (evt) => {
  if (evt.target === errorContainerNode) {
    cancelErrorMessage();
  }
};

errorButtonNode.addEventListener('click', cancelErrorMessage);

function cancelErrorMessage() {
  errorContainerNode.remove();
  document.removeEventListener('keydown', onErrorContainerEscKeydown);
  document.removeEventListener('click', onDocumentExceptErrorContainerClick);
}

const showErrorMessage = () => {
  body.append(errorContainerNode);
  document.addEventListener('keydown', onErrorContainerEscKeydown);
  document.addEventListener('click', onDocumentExceptErrorContainerClick);
};

const setUploadFormSubmit = () => {
  uploadPhotoFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (FormValidation()) {
      blockSubmitButton();
      sendData(() => {
        cancelPhotoContainer();
        showSuccessMessage();
        unblockSubmitButton();
      },
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
      new FormData(evt.target));
    }
  });
};

export { setUploadFormSubmit };
