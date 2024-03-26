import { config, request, checkResponse, requestError} from '../components/api.js';

export function getCard(item, removeElement, handleCardLikeButton, handleClickCardImage, userId, countLikes = 0) {
  const card = document.querySelector(`#${cardElements.cardTemplae}`).content;
  const cardElement = card.querySelector(`.${cardElements.cardElement}`).cloneNode(true);
  const cardImage = cardElement.querySelector(`.${cardElements.cardImage}`);
  const cardName = cardElement.querySelector(`.${cardElements.cardName}`);
  const cardDeleteButton = cardElement.querySelector(`.${cardElements.cardDeleteButton}`);
  const cardLikeButton = cardElement.querySelector(`.${cardElements.cardLikeButton}`);
  const cardLikeCount = cardElement.querySelector(`.${cardElements.cardLikeCount}`);
  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardLikeCount.textContent = countLikes;

  if(item.owner['_id'] !== userId) {
    removeElement(cardDeleteButton);
  }

  item.likes.forEach(element => {
    if(element['_id'] === userId) {
      cardLikeButton.classList.toggle(cardElements.cardLikeButtonIsActive);
    }
  });

  cardLikeButton.addEventListener('click', () => {
    handleCardLikeButton(item, cardLikeButton, cardLikeCount);
  });

  cardElement.addEventListener('click', handleClickCardImage);
  
  cardDeleteButton.addEventListener('click', () => {
    deleteCard(item, cardElement);
  });

  return cardElement;
}

export function handleCardLikeButton(item, button, cardLikeCount) {
  if(!button.classList.contains(cardElements.cardLikeButtonIsActive)) {
    request(`/cards/likes/${item['_id']}`, {
      method: 'PUT',
      headers: config.headers
    })
      .then(checkResponse)
      .then(() => {
        button.classList.toggle(cardElements.cardLikeButtonIsActive);
        cardLikeCount.textContent++;
      })
      .catch(requestError);
  } else {
    request(`/cards/likes/${item['_id']}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse)
      .then(() => {
        button.classList.toggle(cardElements.cardLikeButtonIsActive);
        cardLikeCount.textContent--;
      })
      .catch(requestError);
  }
}

export function removeElement(item) {
  item.remove();
}

function deleteCard(item, card) {
  request(`/cards/${item['_id']}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse)
    .then(() => {
      removeElement(card);
    })
    .catch(requestError);
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