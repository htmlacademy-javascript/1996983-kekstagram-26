const PREVIEW_SCALE_STEP = 25;
const PREVIEW_MIN_SCALE = 25;
const PREVIEW_MAX_SCALE = 100;
const PREVIEW_SCALE_DEFAULT = 100;

const photoPreviewImageNode = document.querySelector('.img-upload__preview');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');

// Уменьшение масштаба
const onReduceScale = () => {
  let scale = parseInt(scaleControlValue.value, 10);
  if (scale > PREVIEW_MIN_SCALE) {
    scale -= PREVIEW_SCALE_STEP;
    scaleControlValue.value = `${scale}%`;
    photoPreviewImageNode.style = `transform: scale(${scale / 100})`;
  }
};

// Увеличение масштаба
const onIncreaseScale = () => {
  let scale = parseInt(scaleControlValue.value, 10);
  if (scale < PREVIEW_MAX_SCALE) {
    scale += PREVIEW_SCALE_STEP;
    scaleControlValue.value = `${scale}%`;
    photoPreviewImageNode.style = `transform: scale(${scale / 100})`;
  }
};

const addScaleHandler = () => {
  scaleControlValue.value = `${PREVIEW_SCALE_DEFAULT}%`;
  scaleControlSmaller.addEventListener('click', onReduceScale);
  scaleControlBigger.addEventListener('click', onIncreaseScale);
};

const removeScaleHandler = () => {
  scaleControlSmaller.removeEventListener('click', onReduceScale);
  scaleControlBigger.removeEventListener('click', onIncreaseScale);
};

export { addScaleHandler, removeScaleHandler };
