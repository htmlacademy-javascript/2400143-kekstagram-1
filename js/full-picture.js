
import {isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const pictureComments = document.querySelector('.social__comments');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach(({avatar,name,message}) => {
    const comment = document.createElement('li');
    comment.innerHTML = '<img class="social__picture" src="" alt="" widht="35" heigh="35" ><p class="social__text"></p>';
    comment.classList.add('social__comment');
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;
    commentsFragment.append(comment);
  });

  pictureComments.innerHTML = '';
  pictureComments.append(commentsFragment);
};

const renderPicture = ({url,description,likes}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const openPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  renderPicture(data);
  renderComments(data.comments);
};

const closePicture = () => {
  bigPicture.classList.add('hidden');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

bigPictureClose.addEventListener ('click', () => {
  closePicture();
});

document.addEventListener ('keydown', onDocumentKeydown);

export {openPicture};

