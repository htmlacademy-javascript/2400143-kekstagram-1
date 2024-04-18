const EFFECTS = [
  {name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },

  {name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  {name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  {name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  {name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  {name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const imagePreview = document.querySelector('.img-upload__preview img');
const effectsSection = document.querySelector('.effects');
const effectLevel = document.querySelector('.effect-level__value');
const effectContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => {
  effectContainer.classList.remove('hidden');
};

const hideSlider = () => {
  effectContainer.classList.add('hidden');
};

const updateSliderSettings = () => {
  effectLevelSlider.noUiSlider.updateOptions(
    {range:
      {min: chosenEffect.min,
        max: chosenEffect.max,
      },
    step: chosenEffect.step,
    start: chosenEffect.max,
    });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const changeEffect = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imagePreview.className = `effects__preview--${chosenEffect.name}`;
  updateSliderSettings();
};

const updateSliderValue = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  imagePreview.style.filter = isDefault() ?
    DEFAULT_EFFECT.style :
    `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevel.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSliderSettings();
};

noUiSlider.create(effectLevelSlider,
  {range:
    {min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max,
    },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
  });
hideSlider();

effectsSection.addEventListener('change', changeEffect);
effectLevelSlider.noUiSlider.on('update', updateSliderValue);

export {resetEffects};
