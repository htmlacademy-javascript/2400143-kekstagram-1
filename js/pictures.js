import {createPost} from './data.js';

const picturesSection = document.querySelector('.pictures');

const template = document.querySelector('#picture').content.querySelector('.picture');

const pictures = createPost();

const similarPicturesFragment = document.createDocumentFragment();

pictures.forEach(({ url, description, likes, comments}) => {
  const pictureItem = template.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  similarPicturesFragment.append(pictureItem);
});

picturesSection.append(similarPicturesFragment);

