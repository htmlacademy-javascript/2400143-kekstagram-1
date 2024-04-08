import { isEscapeKey } from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const showErrorMessage = () => {
  document.body.classList.add('modal-open');
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.append(errorMessage);
  const errorButton = document.querySelector('.error__button');
  const hideErrorMessage = () => {
    errorMessage.remove();
    document.body.classList.remove('modal-open');
  };
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    hideErrorMessage();
  });
  document.addEventListener('keydown', () => {
    if (isEscapeKey) {
      hideErrorMessage();
    }
  });
  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner') && !evt.target.closest('.error__button')) {
      hideErrorMessage();
    }
  });
};

const showSuccessMessage = () => {
  document.body.classList.add('modal-open');
  const successMessage = successTemplate.cloneNode(true);
  document.body.append(successMessage);
  const successButton = document.querySelector('.success__button');
  const hideSuccessMessage = () => {
    successMessage.remove();
    document.body.classList.remove('modal-open');
  };
  successButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    hideSuccessMessage();
  });
  document.addEventListener('keydown', () => {
    if (isEscapeKey) {
      hideSuccessMessage();
    }
  });
  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner') && !evt.target.closest('.success__button')) {
      hideSuccessMessage();
    }
  });
};


export { showErrorMessage, showSuccessMessage };
