import { renderThumbanails } from './thumbnails.js';
import { getData } from './api.js';
import { setUploadFormSubmit } from './submit-form.js';
import { initalizeFilters} from './filters.js';

getData((photos) => {
  renderThumbanails(photos);
  initalizeFilters(photos);
});

setUploadFormSubmit();
