
import { isEscapeKey } from './util.js';

const COMMENTS_PER_LOADING = 5;
const bigPicture = document.querySelector('.big-picture');
const pictureComments = document.querySelector('.social__comments');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let comments = [];
let commentShown = 0;

const renderComments = () => {
  commentShown += COMMENTS_PER_LOADING;

  if (commentShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();
  comments.slice(0, commentShown).forEach(({ avatar, name, message }) => {
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
  commentsCounter.innerHTML = `${commentShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

commentsLoader.addEventListener('click', () => {
  renderComments(comments);
});

const renderPicture = ({ url, description, likes }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const closePicture = () => {
  bigPicture.classList.add('hidden');
  comments = [];
  commentShown = 0;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const openPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  renderPicture(data);
  commentShown = 0;
  comments = data.comments;
  renderComments(comments);
  document.addEventListener('keydown', onDocumentKeydown);
};

bigPictureClose.addEventListener('click', () => {
  closePicture();
  document.removeEventListener('keydown', onDocumentKeydown);
});

export { openPicture };

