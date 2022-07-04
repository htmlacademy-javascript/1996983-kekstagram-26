const MAX_COUNT_HASHTAGS = 5;
const uploadPhotoForm = document.querySelector('#upload-select-image');
const textHashtags = uploadPhotoForm.querySelector('.text__hashtags');

const pristine = new window.Pristine(uploadPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const getArrayHashtags = (value) => (value.trim().toLowerCase().split(' '));

const validateHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return value === ''|| arrayHashtags.every((hashtag) => re.test(hashtag));
};

const validateUniqueHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  return new Set(arrayHashtags).size === arrayHashtags.length;
};

const validateCountHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  return arrayHashtags.length <= MAX_COUNT_HASHTAGS;
};

pristine.addValidator(textHashtags, validateHashtags, 'Некорректно введен хэш-тег');
pristine.addValidator(textHashtags, validateUniqueHashtags, 'Хэш-теги не должны повторяться');
pristine.addValidator(textHashtags, validateCountHashtags, `Не более ${MAX_COUNT_HASHTAGS} хэш-тегов`);


const FormValidation = () => {
  uploadPhotoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      uploadPhotoForm.submit();
    }
  });
};

export { FormValidation };
