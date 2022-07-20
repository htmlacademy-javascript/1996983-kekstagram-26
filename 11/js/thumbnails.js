import { renderFullSizePhoto } from './fullsize-photo.js';

const thumbnailsContainerNode = document.querySelector('.pictures');
const thumbnailsTemplateNode = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const thumbnailsFragmentNode = document.createDocumentFragment();


const renderThumbanails = (photos) => {
  photos
    .forEach((photo) => {
      const { url, likes, comments } = photo;
      const thumbnailsClone = thumbnailsTemplateNode.cloneNode(true);
      thumbnailsClone.querySelector('img').src = url;
      thumbnailsClone.querySelector('.picture__likes').textContent = likes;
      thumbnailsClone.querySelector('.picture__comments').textContent = comments.length;
      thumbnailsClone.addEventListener('click', () => renderFullSizePhoto(photo));
      thumbnailsFragmentNode.append(thumbnailsClone);
    });
  thumbnailsContainerNode.querySelectorAll('.picture').forEach((thumbnailNode)=>thumbnailNode.remove());
  thumbnailsContainerNode.append(thumbnailsFragmentNode);
};

export { renderThumbanails };
