const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const onScaleSmallerClick = () => {
  const currentScaleValue = parseInt(scaleValue.value, 10);
  let newValue = currentScaleValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onScaleBiggerClick = () => {
  const currentScaleValue = parseInt(scaleValue.value, 10);
  let newValue = currentScaleValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

scaleSmaller.addEventListener('click', onScaleSmallerClick);
scaleBigger.addEventListener('click', onScaleBiggerClick);

export {resetScale};
