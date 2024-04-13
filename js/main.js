import { renderGallery} from './pictures.js';
import './form.js';
import { getData } from './api.js';
import { showAlert} from './util.js';

try {
  const data = await getData ();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}

