import { photoDescription } from './data.js';
import { renderThumbanails } from './thumbanails.js';
import { uploadFile } from './form.js';

renderThumbanails(photoDescription);
uploadFile();

// eslint-disable-next-line no-console
console.log(photoDescription);
