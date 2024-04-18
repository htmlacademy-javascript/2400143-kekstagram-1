import { renderGallery} from './pictures.js';
import './form.js';
import { getData } from './api.js';
import { showAlert} from './util.js';
import { setFiltersClickHandler } from './filters.js';

try {
  const data = await getData ();
  renderGallery(data);
  setFiltersClickHandler(data);
} catch (err) {
  showAlert(err.message);
}

