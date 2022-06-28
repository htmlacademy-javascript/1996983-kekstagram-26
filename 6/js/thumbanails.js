import { renderFullSizePhoto } from './fullsize-photo.js';

const renderThumbanails = (photos) => {

  const thumbnailsContainer = document.querySelector('.pictures');
  const thumbnailsTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const thumbnailsFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const { url, likes, comments } = photo;
    const thumbnailsClone = thumbnailsTemplate.cloneNode(true);
    thumbnailsClone.querySelector('img').src = url;
    thumbnailsClone.querySelector('.picture__likes').textContent = likes;
    thumbnailsClone.querySelector('.picture__comments').textContent = comments.length;
    thumbnailsClone.addEventListener('click', () => renderFullSizePhoto(photo));
    thumbnailsFragment.append(thumbnailsClone);
  });

  thumbnailsContainer.append(thumbnailsFragment);
};

export { renderThumbanails };
