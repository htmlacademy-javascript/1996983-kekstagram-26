import { isEscapeKey } from './util.js';
import { FormValidation } from './validation.js';
import { addScaleHandler, removeScaleHandler } from './changing-image-scale.js';
import { setNoneEffect } from './image-slider-effects.js';

const body = document.querySelector('body');
const uploadPhotoFormNode = document.querySelector('#upload-select-image');
const uploadPhotoFileNode = document.querySelector('#upload-file');
const photoEditContainerNode = document.querySelector('.img-upload__overlay');
const cancelPhotoButton = photoEditContainerNode.querySelector('#upload-cancel');
const textHashtags = uploadPhotoFormNode.querySelector('.text__hashtags');
const textComment = uploadPhotoFormNode.querySelector('.text__description');

const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelPhotoContainer();
  }
};

function cancelPhotoContainer() {
  photoEditContainerNode.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
  uploadPhotoFormNode.reset();
  removeScaleHandler();
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
  photoEditContainerNode.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEscKeydown);
  addScaleHandler();
  setNoneEffect();
};

const uploadFile = () => {
  uploadPhotoFileNode.addEventListener('change', onUploadFileChange);
  FormValidation();
};

export { uploadFile };