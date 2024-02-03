const cardList = document.querySelector('.places__list');
const card = document.querySelector('#card-template').content;

function getCard(item, deleteCard) {
  const cardElement = card.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCard(cardElement);
  });
  return cardElement;
}

function createCard(name, link) {
  item = {
    name,
    link
  }
  cardList.append(getCard(item, deleteCard));
}

function deleteCard(item) {
  item.remove();
}

initialCards.forEach(elem => createCard(elem.name, elem.link));