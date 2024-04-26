import { clearGallery,renderPictures } from './pictures.js';
import { debounce } from './util.js';

const PICTURES_AMOUNT = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imageFilters = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (picture1, picture2) => picture2.comments.length - picture1.comments.length;

const getImagesByFilter = (pictures, activeFilter) => {
  if (Filter.RANDOM === activeFilter) {
    return [...pictures].sort(sortRandomly).slice(0, PICTURES_AMOUNT);
  }
  if (Filter.DISCUSSED === activeFilter) {
    return [...pictures].sort(sortByComments);
  } else {
    return [...pictures];
  }
};

const debouncedGallery = debounce((pictures) => {
  clearGallery();
  renderPictures(pictures);
});

const setFiltersClickHandler = (data) => {
  imageFilters.classList.remove('img-filters--inactive');
  imageFilters.addEventListener('click', (evt) => {
    const activeButton = evt.target;
    if (!activeButton.classList.contains('img-filters__button') || activeButton.id === currentFilter) {
      return;
    }
    imageFilters
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    activeButton.classList.add('img-filters__button--active');
    currentFilter = activeButton.id;
    debouncedGallery(getImagesByFilter(data, currentFilter));
  });
};

export { setFiltersClickHandler };


