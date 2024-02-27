import '../pages/index.css';
import { initialCards } from './components/cards.js';
import { cardList, getCard, getLike, deleteCard, fullImage, fullImageCaption } from './components/card.js';
import { openModal, closeModal, modalNewCard, modalProfileEdit, getClickOverlay, modalViewImage } from './components/modal.js';

const profile = document.querySelector('.profile__info');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const formEditProfile = document.forms['edit-profile'];
const nameProfile = formEditProfile.elements['name'];
const jobProfile = formEditProfile.elements['description'];
const newCardButton = document.querySelector('.profile__add-button');
const formNewCard = document.forms['new-place'];
const newCardName = formNewCard.elements['place-name'];
const newCardSrc = formNewCard.elements['link'];
const modals = document.querySelectorAll('.popup');
const buttonsCloseModal = document.querySelectorAll('.popup__close');

function getProfileEdit(name, job) {
  profileName.textContent = name.value;
  profileDescription.textContent = job.value;
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  getProfileEdit(nameProfile, jobProfile);
  closeModal(modalProfileEdit);
}

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  getNewCard(newCardName, newCardSrc);
  closeModal(modalNewCard);
}

function getNewCard(name, src) {
  createNewCard({name: name.value, link: src.value});
}

function createCard(item) {
  cardList.append(getCard(item, deleteCard, getLike, handleClickCardImage));
}

function createNewCard(item) {
  cardList.prepend(getCard(item, deleteCard, getLike, handleClickCardImage));
}

function handleClickCardImage(evt) {
  if(evt.target.className === 'card__image') {
    fullImage.src = evt.target.src;
    fullImage.alt = evt.target.alt;
    fullImageCaption.textContent = evt.target.alt;
    openModal(modalViewImage);
  }
}

profileEditButton.addEventListener('click', () => {
  openModal(modalProfileEdit);
  nameProfile.value = profileName.textContent;
  jobProfile.value = profileDescription.textContent;
});

newCardButton.addEventListener('click', () => {
  openModal(modalNewCard);
  formNewCard.reset();
});

buttonsCloseModal.forEach(elem => {
  elem.addEventListener('click', () => {
    closeModal(elem.parentElement.parentNode);
  });
});

modals.forEach(elem => {
  elem.classList.add('popup_is-animated');
  getClickOverlay(elem);
});

formEditProfile.addEventListener('submit', handleFormSubmitProfile);
formNewCard.addEventListener('submit', handleFormSubmitNewCard);
initialCards.forEach(createCard);