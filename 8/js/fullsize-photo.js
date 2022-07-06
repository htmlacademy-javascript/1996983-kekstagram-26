import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const photoContainerNode = document.querySelector('.big-picture');
const photoCloseButton = photoContainerNode.querySelector('#picture-cancel');
const photoImgNode = photoContainerNode.querySelector('.big-picture__img img');
const photoDescriptionNode = photoContainerNode.querySelector('.social__caption');
const photoLikesNode = photoContainerNode.querySelector('.likes-count');
const commentCountNode = photoContainerNode.querySelector('.social__comment-count');
const commentsLoaderButton = photoContainerNode.querySelector('.social__comments-loader');
const commentContainerNode = photoContainerNode.querySelector('.social__comments');
const commentItemNode = photoContainerNode.querySelector('.social__comment');
const commentFragmentNode = document.createDocumentFragment();
const COMMENTS_BLOCK = 5;

const cancelPhotoContainer = () => {
  photoContainerNode.classList.add('hidden');
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

const renderComment = ({ message, avatar, name }) => {
  const commentCloneNode = commentItemNode.cloneNode(true);
  const commentCloneAvatarNode = commentCloneNode.querySelector('img');
  commentCloneAvatarNode.src = avatar;
  commentCloneAvatarNode.alt = name;
  commentCloneNode.querySelector('.social__text').textContent = message;
  commentFragmentNode.append(commentCloneNode);
};

const renderComments = (comments, countClickLoadComments) => {
  let countComment = 0;
  const countLoadComments = countClickLoadComments * COMMENTS_BLOCK;
  const countCommentsTotal = comments.length;
  if (countCommentsTotal <= countLoadComments) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  for (let i = 0; i < (countCommentsTotal <= countLoadComments ? countCommentsTotal : countLoadComments); i++) {
    renderComment(comments[i]);
    countComment++;
  }
  commentCountNode.textContent = `${countComment} из ${countCommentsTotal} комментариев`;
  commentContainerNode.innerHTML = '';
  commentContainerNode.append(commentFragmentNode);
};

const renderFullSizePhoto = ({ url, description, likes, comments }) => {
  let countClickLoadComments = 1;
  photoContainerNode.classList.remove('hidden');
  body.classList.add('modal-open');
  photoImgNode.src = url;
  photoDescriptionNode.textContent = description;
  photoLikesNode.textContent = likes;

  renderComments(comments, countClickLoadComments);
  commentsLoaderButton.addEventListener('click', () => {
    countClickLoadComments++;
    renderComments(comments, countClickLoadComments);
  });
  document.addEventListener('keydown', onPhotoEscKeydown);
};

export { renderFullSizePhoto };
