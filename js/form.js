import { isEscapeKey } from './util.js';
import { FormValidation } from './validation.js';
import { addScaleHandler, removeScaleHandler } from './changing-image-scale.js';
import { setNoneEffect } from './image-slider-effects.js';

const PREVIEW_SCALE_DEFAULT = 100;

const body = document.querySelector('body');
const uploadPhotoFormNode = document.querySelector('#upload-select-image');
const uploadPhotoFileNode = document.querySelector('#upload-file');
const photoEditContainerNode = document.querySelector('.img-upload__overlay');
const cancelPhotoButton = photoEditContainerNode.querySelector('#upload-cancel');
const textHashtags = uploadPhotoFormNode.querySelector('.text__hashtags');
const textComment = uploadPhotoFormNode.querySelector('.text__description');
const scaleControlValue = photoEditContainerNode.querySelector('.scale__control--value');
const photoPreviewImageNode = photoEditContainerNode.querySelector('.img-upload__preview');

const clearEnterData = () => {
  scaleControlValue.value = `${PREVIEW_SCALE_DEFAULT}%`;
  photoPreviewImageNode.style = 'transform: scale(1)';

  uploadPhotoFormNode.reset();
  photoPreviewImageNode.style.filter = 'none';
  photoPreviewImageNode.src = '';
};

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
  clearEnterData();
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
