export const cardList = document.querySelector('.places__list');
const card = document.querySelector('#card-template').content;
export const fullImage = document.querySelector('.popup__image');
export const fullImageCaption = document.querySelector('.popup__caption');

export function getCard(item, deleteCard, getLike, handleClickCardImage) {
  const cardElement = card.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const cardDelete = cardElement.querySelector('.card__delete-button');

  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  
  cardDelete.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardElement.addEventListener('click', handleCardLikeButton);
  cardElement.addEventListener('click', handleClickCardImage);

  return cardElement;
}

function handleCardLikeButton(evt) {
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