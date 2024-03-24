import { config, request, checkResponse, requestError } from '../components/api.js';

export function getCard(item, deleteCard, handleCardLikeButton, handleClickCardImage) {
  const card = document.querySelector('#card-template').content;
  const cardElement = card.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const cardDelete = cardElement.querySelector('.card__delete-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  getCountOfLikes(item.likes, cardLikeCount)
  removeDeleteButton(item, cardDelete);
  cardDelete.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardElement.addEventListener('click', handleCardLikeButton);
  cardElement.addEventListener('click', handleClickCardImage);
  return cardElement;
}

function removeDeleteButton (item, button) {
  request('/users/me', { headers: config.headers })
    .then(checkResponse)
    .then((user) => {
      if(item.owner._id !== user._id) {
        button.remove();
      }
    })
    .catch(requestError);
}

function getCountOfLikes(likes, selector) {
  if(likes !== undefined) {
    selector.textContent = likes.length;
  } else {
    selector.textContent = 0;
  }
}

export function handleCardLikeButton(evt) {
  if(Array.from(evt.target.classList).includes('card__like-button')) {
    getLike(evt.target);
  }
}

export function getLike(evt) {
  evt.classList.toggle('card__like-button_is-active');
}

export function deleteCard(item) {
  item.remove();
}