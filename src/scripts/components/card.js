import { deleteCard, requestError } from '../components/api.js';

export function getCard(set) {
  const card = document.querySelector(`#${cardElements.cardTemplae}`).content;
  const cardElement = card.querySelector(`.${cardElements.cardElement}`).cloneNode(true);
  const cardImage = cardElement.querySelector(`.${cardElements.cardImage}`);
  const cardName = cardElement.querySelector(`.${cardElements.cardName}`);
  const cardDeleteButton = cardElement.querySelector(`.${cardElements.cardDeleteButton}`);
  const cardLikeButton = cardElement.querySelector(`.${cardElements.cardLikeButton}`);
  const cardLikeCount = cardElement.querySelector(`.${cardElements.cardLikeCount}`);
  cardName.textContent = set.item.name;
  cardImage.src = set.item.link;
  cardImage.alt = set.item.name;
  cardLikeCount.textContent = set.countLikes;
  
  set.deleteButtonStatus ? cardDeleteButton.remove() : false;

  set.item.likes.forEach(element => {
    if(element['_id'] === set.user) {
      cardLikeButton.classList.add(cardElements.cardLikeButtonIsActive);
    }
  });

  cardLikeButton.addEventListener('click', () => {
    set.handleLike(set.item['_id'], cardLikeButton, cardElements.cardLikeButtonIsActive)
    .then((card) => {
      cardLikeButton.classList.toggle(cardElements.cardLikeButtonIsActive);
      cardLikeCount.textContent = card.likes.length;
    })
    .catch(requestError);
  });

  cardElement.addEventListener('click', set.handleClick);
  
  cardDeleteButton.addEventListener('click', () => {
    deleteCard(set.item['_id'])
    .then(() => {
      cardElement.remove();
    })
    .catch(requestError);
  });

  return cardElement;
}

export const cardElements = {
  cardTemplae: 'card-template',
  cardElement: 'card',
  cardImage: 'card__image',
  cardName: 'card__title',
  cardDeleteButton: 'card__delete-button',
  cardLikeButton: 'card__like-button',
  cardLikeButtonIsActive: 'card__like-button_is-active',
  cardLikeCount: 'card__like-count'
}