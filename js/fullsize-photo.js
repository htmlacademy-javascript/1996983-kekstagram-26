import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const photoContainer = document.querySelector('.big-picture');
const photoCloseButton = photoContainer.querySelector('#picture-cancel');
const photoImg = photoContainer.querySelector('.big-picture__img img');
const photoDescription = photoContainer.querySelector('.social__caption');
const photoLikesCount = photoContainer.querySelector('.likes-count');
const commentCount = photoContainer.querySelector('.social__comment-count');
const commentContainer = photoContainer.querySelector('.social__comments');
const commentItem = photoContainer.querySelector('.social__comment');
const commentLoader = photoContainer.querySelector('.comments-loader');
const commentFragment = document.createDocumentFragment();

const cancelPhotoContainer = () => {
  photoContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
};

function onPhotoEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelPhotoContainer();
  }
}

photoCloseButton.addEventListener('click', cancelPhotoContainer);

const renderFullSizePhoto = ({ url, description, likes, comments }) => {
  photoContainer.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  body.classList.add('modal-open');
  photoImg.src = url;
  photoDescription.textContent = description;
  photoLikesCount.textContent = likes;

  comments.forEach(({ message, avatar, name }) => {
    const commentClone = commentItem.cloneNode(true);
    const commentCloneAvatar = commentClone.querySelector('img');
    commentCloneAvatar.src = avatar;
    commentCloneAvatar.alt = name;
    commentClone.querySelector('.social__text').textContent = message;
    commentFragment.append(commentClone);
  });
  commentContainer.innerHTML = '';
  commentContainer.append(commentFragment);
  document.addEventListener('keydown', onPhotoEscKeydown);
};

export { renderFullSizePhoto };
