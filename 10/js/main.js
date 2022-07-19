import { renderThumbanails } from './thumbanails.js';
import { getData } from './api.js';
import { showError } from './util.js';
import { setUploadFormSubmit } from './form.js';

getData(renderThumbanails, showError);
setUploadFormSubmit();
