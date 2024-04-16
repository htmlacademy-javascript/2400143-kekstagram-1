import { renderGallery} from './pictures.js';
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

const getImagesByFilter = (pictures,setFilter) => {
  if (Filter.RANDOM === setFilter) {
    return [...pictures].sort(sortRandomly).slice(0, PICTURES_AMOUNT);
  }
  if (Filter.DISCUSSED === setFilter) {
    return [...pictures].sort(sortByComments);
  } else {
    return [...pictures];
  }
};

const onGalleryDebounce = debounce(renderGallery);

const renderFilteredImages = (data) => {
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
    onGalleryDebounce(getImagesByFilter(data,currentFilter));
  });
};

export { renderFilteredImages};


