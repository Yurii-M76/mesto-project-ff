const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const formNewCard = document.querySelector('.popup_type_new-card');
const closeFormNewCardButton = formNewCard.querySelector('.popup__close');

function cardCreate(name, link) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardItem.querySelector('.card__title').textContent = name;
  cardItem.querySelector('.card__image').src = link;

  cardItem.querySelector('.card__delete-button').addEventListener('click', () => {
    cardDelete(cardItem);
  });

  cardItem.querySelector('.card__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  cardList.append(cardItem);
}

function cardDelete(id) {
  id.remove();
}

function popupToggler() {
  formNewCard.classList.toggle('popup_is-opened');
}

addCardButton.addEventListener('click', popupToggler);
closeFormNewCardButton.addEventListener('click', popupToggler);

initialCards.forEach(item => {
  cardCreate(item.name, item.link);
});