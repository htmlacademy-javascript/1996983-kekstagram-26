import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const uploadPhotoForm = document.querySelector('#upload-select-image');
const uploadPhotoFile = document.querySelector('#upload-file');
const photoEditContainer = document.querySelector('.img-upload__overlay');
const cancelPhotoButton = photoEditContainer.querySelector('#upload-cancel');
const textHashtags = uploadPhotoForm.querySelector('.text__hashtags');
const textComment = uploadPhotoForm.querySelector('.text__description');
const MAX_COUNT_HASHTAGS = 5;

const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)
    && document.activeElement !== textHashtags
    && document.activeElement !== textComment) {
    evt.preventDefault();
    cancelPhotoContainer();
  }
};

function cancelPhotoContainer() {
  photoEditContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
  uploadPhotoFile.value = '';
  textHashtags.value = '';
  textComment.value = '';
}

cancelPhotoButton.addEventListener('click', cancelPhotoContainer);

const onUploadFileChange = () => {
  photoEditContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEscKeydown);
};
uploadPhotoFile.addEventListener('change', onUploadFileChange);


const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const validateTextHashtags = (text) => {
  if (text === '') {
    return true;
  }
  const arrayHashtags = text.trim().toLowerCase().split(' ');
  if (arrayHashtags.length > MAX_COUNT_HASHTAGS) {
    return false;
  }
  if (new Set(arrayHashtags).size !== arrayHashtags.length) {
    return false;
  }
  return arrayHashtags.every((hashtag) => /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(hashtag));
};

pristine.addValidator(
  textHashtags,
  validateTextHashtags,
  'Некорректно введен хэштег'
);

uploadPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadPhotoForm.submit();
  }
});
