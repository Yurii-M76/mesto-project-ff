import {
  cardList,
  card,
  modalAddCard
} from '../index.js';

import { closeModal } from '../components/modal.js';

function getCard(item, deleteCard, getLike) {
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

  return cardElement;
}

export function getNewCard(name, src) {
  createNewCard({name: name.value, link: src.value});
  closeModal(modalAddCard);
}

export function createCard(item) {
  cardList.append(getCard(item, deleteCard, getLike));
}

function createNewCard(item) {
  cardList.prepend(getCard(item, deleteCard, getLike));
}

export function getLike(item) {
  item.classList.toggle('card__like-button_is-active');
}

function deleteCard(item) {
  item.remove();
}