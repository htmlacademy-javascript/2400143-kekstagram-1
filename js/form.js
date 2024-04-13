import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_COUNT = 5;
const TAG_ERROR_MESSAGE = 'нарушены требования к хэштегам';

const imageOverlay = document.querySelector('.img-upload__overlay');
const imageForm = document.querySelector('.img-upload__form');
const uploadFieldOpen = document.querySelector('#upload-file');
const uploadFieldClose = document.querySelector('#upload-cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const captureInput = document.querySelector('.text__description');
const imageSubmitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const blockSubmitButton = () => {
  imageSubmitButton.disabled = true;
};

const unblockSubmitButton = () => {
  imageSubmitButton.disabled = false;
};

const closeUpload = () => {
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  resetEffects();
  imageForm.reset();
  pristine.reset();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUpload();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onCancelClick = () => {
  closeUpload();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseUpload = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFieldClose.removeEventListener('click', onCancelClick);
};

const openUpload = () => {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadFieldClose.addEventListener('click', onCancelClick);
};

const onUploadClick = () => {
  openUpload();
};

captureInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});

hashtagInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});

const isValidTag = (tag) => VALID_HASHTAG.test(tag);

const isValidTagCount = (tags) => tags.length <= TAG_COUNT;

const checkIfTagIsUnique = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return isValidTagCount(tags) && checkIfTagIsUnique(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagInput,
  validateTags,
  TAG_ERROR_MESSAGE
);

uploadFieldOpen.addEventListener('change', onUploadClick);

imageForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    try {
      await sendData(new FormData(evt.target));
      closeUpload();
      onCloseUpload();
      showSuccessMessage();
    } catch {
      showErrorMessage();
    } finally {
      unblockSubmitButton();
    }
  }
});

