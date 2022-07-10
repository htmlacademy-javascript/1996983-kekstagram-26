const SettingsEffects = {
  chrome: {
    filter: 'grayscale',
    minValueSlider: 0,
    maxValueSlider: 1,
    stepSlider: 0.1,
    unitOfMeasure: '',
  },
  sepia: {
    filter: 'sepia',
    minValueSlider: 0,
    maxValueSlider: 1,
    stepSlider: 0.1,
    unitOfMeasure: '',
  },
  marvin: {
    filter: 'invert',
    minValueSlider: 0,
    maxValueSlider: 100,
    stepSlider: 1,
    unitOfMeasure: '%',
  },
  phobos: {
    filter: 'blur',
    minValueSlider: 0,
    maxValueSlider: 3,
    stepSlider: 0.1,
    unitOfMeasure: 'px',
  },
  heat: {
    filter: 'brightness',
    minValueSlider: 1,
    maxValueSlider: 3,
    stepSlider: 0.1,
    unitOfMeasure: '',
  }
};

const photoEditContainerNode = document.querySelector('.img-upload__overlay');
const photoPreviewImageNode = photoEditContainerNode.querySelector('.img-upload__preview');
const effectListNode = photoEditContainerNode.querySelector('.effects__list');
const effectLevelValueNode = photoEditContainerNode.querySelector('.effect-level__value');
const rangeSliderNode = photoEditContainerNode.querySelector('.effect-level__slider');
const rangeSliderContainerNode = photoEditContainerNode.querySelector('.img-upload__effect-level');

// создание слайдера
noUiSlider.create(rangeSliderNode, {
  range: {
    min: 0,
    max: 1
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

// скрытие эффектов
const setNoneEffect = () => {
  rangeSliderContainerNode.classList.add('hidden');
  photoPreviewImageNode.className = 'img-upload__preview';
  photoPreviewImageNode.style.filter = '';
};

// смена эффектов
const onEffectListChange = (evt) => {

  const selectedEffect = evt.target.value;

  if (selectedEffect === 'none') {
    setNoneEffect();
  } else {
    rangeSliderContainerNode.classList.remove('hidden');
    photoPreviewImageNode.className = 'img-upload__preview';
    photoPreviewImageNode.classList.add(`effects__preview--${selectedEffect}`);
    const objectSelectedEffect = SettingsEffects[selectedEffect];
    const { minValueSlider, maxValueSlider, stepSlider } = objectSelectedEffect;
    rangeSliderNode.noUiSlider.updateOptions({
      range: {
        min: minValueSlider,
        max: maxValueSlider,
      },
      start: maxValueSlider,
      step: stepSlider,
    });
    rangeSliderNode.noUiSlider.set(maxValueSlider);
  }
};

effectListNode.addEventListener('change', onEffectListChange);

// изменение интенсивности эффекта
rangeSliderNode.noUiSlider.on('update', () => {
  const valueRangeSlider = rangeSliderNode.noUiSlider.get();
  effectLevelValueNode.value = valueRangeSlider;
  const objectSelectedEffect = SettingsEffects[photoEditContainerNode.querySelector('input[name="effect"]:checked').value];
  if (objectSelectedEffect !== undefined) {
    const { filter, unitOfMeasure } = objectSelectedEffect;
    photoPreviewImageNode.style.filter = `${filter}(${valueRangeSlider}${unitOfMeasure})`;
  }
});

export { setNoneEffect };
