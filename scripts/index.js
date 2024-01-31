const cardList = document.querySelector('.places__list');
const card = document.querySelector('#card-template').content;
const cardImage = card.querySelector(".card__image");
const cardName = card.querySelector(".card__title");

function getCard() {
  const cardElement = card.querySelector('.card').cloneNode(true);
  return cardElement;
}

function createCard(name, link) {
  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  const cardItem = getCard();
  cardItem.querySelector(".card__delete-button").addEventListener('click', () => {
    deleteCard(cardItem);
  });
  cardList.append(cardItem);
}

function deleteCard(item) {
  item.remove();
}

initialCards.forEach(item => createCard(item.name, item.link));