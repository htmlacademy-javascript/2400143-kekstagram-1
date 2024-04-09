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
  const errorButtonHandler = () => {
    errorButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      hideErrorMessage();
    });
  };
  const onModalClose = (evt) => {
    if (errorButtonHandler || isEscapeKey(evt) || !evt.target.closest('.error__inner') && !evt.target.closest('.error__button')) {
      hideErrorMessage();
      document.removeEventListener('click', onModalClose);
      document.removeEventListener('keydown', onModalClose);
    }
  };
  document.addEventListener('keydown', onModalClose);
  document.addEventListener('click', onModalClose);
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
  const successButtonHandler = () => {
    successButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      hideSuccessMessage();
    });
  };
  const onModalClose = (evt) => {
    if (successButtonHandler || isEscapeKey(evt) || !evt.target.closest('.success__inner') && !evt.target.closest('.success__button')) {
      hideSuccessMessage();
      document.removeEventListener('click', onModalClose);
      document.removeEventListener('keydown', onModalClose);
    }
  };
  document.addEventListener('keydown', onModalClose);
  document.addEventListener('click', onModalClose);
};

export { showErrorMessage, showSuccessMessage };
