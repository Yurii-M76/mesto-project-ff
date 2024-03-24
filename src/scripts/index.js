import '../pages/index.css';
import { getCard, handleCardLikeButton, deleteCard } from './components/card.js';
import { openModal, closeModal, getClickOverlay } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserData, sendUserData, initialCards, addNewCard } from './components/api.js';

const profile = document.querySelector('.profile__info');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formEditProfile = document.forms['edit-profile'];
const nameProfile = formEditProfile.elements['name'];
const jobProfile = formEditProfile.elements['description'];
const newCardButton = document.querySelector('.profile__add-button');
const formNewCard = document.forms['new-place'];
const newCardName = formNewCard.elements['place-name'];
const newCardSrc = formNewCard.elements['link'];
const cardList = document.querySelector('.places__list');
const fullImage = document.querySelector('.popup__image');
const fullImageCaption = document.querySelector('.popup__caption');
const modals = document.querySelectorAll('.popup');
const modalProfileEdit = document.querySelector('.popup_type_edit');
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalViewImage = document.querySelector('.popup_type_image');
const buttonsCloseModal = document.querySelectorAll('.popup__close');

function getProfileEdit(name, job) {
  profileName.textContent = name.value;
  profileDescription.textContent = job.value;
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  getProfileEdit(nameProfile, jobProfile);
  sendUserData({name: nameProfile, job: jobProfile});
  closeModal(modalProfileEdit);
}

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  getNewCard(newCardName, newCardSrc);
  closeModal(modalNewCard);
}

function getNewCard(name, src) {
  createNewCard({name: name.value, link: src.value});
  addNewCard({name: newCardName, link: newCardSrc});
}

function createCard(item) {
  cardList.append(getCard(item, deleteCard, handleCardLikeButton, handleClickCardImage));
}

function createNewCard(item) {
  cardList.prepend(getCard(item, deleteCard, handleCardLikeButton, handleClickCardImage));
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
  clearValidation(formEditProfile);
});

newCardButton.addEventListener('click', () => {
  openModal(modalNewCard);
  formNewCard.reset();
  clearValidation(formNewCard);
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

getUserData({name: profileName, job: profileDescription, image: profileImage});
initialCards(createCard);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});