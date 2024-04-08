import { openPicture } from './full-picture.js';

const picturesSection = document.querySelector('.pictures');

const template = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (pictures) => {
  const similarPicturesFragment = document.createDocumentFragment();
  pictures.forEach(({ url, description, likes, comments, id}) => {
    const pictureItem = template.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = url;
    pictureItem.querySelector('.picture__img').alt = description;
    pictureItem.querySelector('.picture__comments').textContent = comments.length;
    pictureItem.querySelector('.picture__likes').textContent = likes;
    pictureItem.dataset.pictureId = id;
    similarPicturesFragment.append(pictureItem);
  });

  picturesSection.append(similarPicturesFragment);
};

const renderGallery = (pictures) => {
  picturesSection.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-picture-id]');
    if (!thumbnail) {
      return;
    }
    const picture = pictures.find((item) => item.id === +thumbnail.dataset.pictureId);
    openPicture(picture);
  });

  renderPictures(pictures);
};

export {renderGallery};


