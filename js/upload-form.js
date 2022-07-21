import { isEscapeKey } from './util.js';
import { addScaleHandler, removeScaleHandler } from './changing-image-scale.js';
import { resetEffect } from './image-slider-effects.js';
import { showPhotoPreview, fileChooserNode } from './preview-photo.js';

const body = document.querySelector('body');
const photoEditContainerNode = document.querySelector('.img-upload__overlay');
const cancelPhotoButtonNode = photoEditContainerNode.querySelector('#upload-cancel');
const uploadPhotoFormNode = document.querySelector('#upload-select-image');
const textHashtags = uploadPhotoFormNode.querySelector('.text__hashtags');
const textComment = uploadPhotoFormNode.querySelector('.text__description');

const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !body.contains(document.querySelector('.error'))) {
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

cancelPhotoButtonNode.addEventListener('click', () => cancelPhotoContainer());

const onUploadFileChange = () => {
  photoEditContainerNode.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEscKeydown);
  addScaleHandler();
  resetEffect();
  showPhotoPreview();
};

fileChooserNode.addEventListener('change', onUploadFileChange);

const onFocusInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

textHashtags.addEventListener('keydown', onFocusInputEscKeydown);
textComment .addEventListener('keydown', onFocusInputEscKeydown);

export { cancelPhotoContainer, uploadPhotoFormNode, body};
