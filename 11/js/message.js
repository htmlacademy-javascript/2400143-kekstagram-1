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
    if (errorButtonHandler || isEscapeKey || !evt.target.closest('.error__inner') && !evt.target.closest('.error__button')) {
      evt.stopPropagation();
      hideErrorMessage();
      document.body.removeEventListener('click', onModalClose);
      document.body.removeEventListener('keydown', onModalClose);
    }
  };
  document.body.addEventListener('keydown', onModalClose);
  document.body.addEventListener('click', onModalClose);
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
    if (successButtonHandler || isEscapeKey || !evt.target.closest('.success__inner') && !evt.target.closest('.success__button')) {
      evt.stopPropagation();
      hideSuccessMessage();
      document.body.removeEventListener('click', onModalClose);
      document.body.removeEventListener('keydown', onModalClose);
    }
  };
  document.body.addEventListener('keydown', onModalClose);
  document.body.addEventListener('click', onModalClose);
};

export { showErrorMessage, showSuccessMessage };
