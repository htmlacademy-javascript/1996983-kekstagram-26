import { isEscapeKey } from './util.js';
import { FormValidation } from './validation.js';

const body = document.querySelector('body');
const uploadPhotoForm = document.querySelector('#upload-select-image');
const uploadPhotoFile = document.querySelector('#upload-file');
const photoEditContainer = document.querySelector('.img-upload__overlay');
const cancelPhotoButton = photoEditContainer.querySelector('#upload-cancel');
const textHashtags = uploadPhotoForm.querySelector('.text__hashtags');
const textComment = uploadPhotoForm.querySelector('.text__description');

const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelPhotoContainer();
  }
};

function cancelPhotoContainer() {
  photoEditContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
  uploadPhotoForm.reset();
}

cancelPhotoButton.addEventListener('click', () => cancelPhotoContainer());

const onFocusInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};
textHashtags.addEventListener('keydown', onFocusInputEscKeydown);
textComment .addEventListener('keydown', onFocusInputEscKeydown);

const onUploadFileChange = () => {
  photoEditContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEscKeydown);
};

const uploadFile = () => {
  uploadPhotoFile.addEventListener('change', onUploadFileChange);
  FormValidation();
};

export { uploadFile };
