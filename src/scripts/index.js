import '../pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, getNewCard, getLike } from './components/card.js';
import { openModal, closeModal, getClickOverlay } from './components/modal.js';

export const cardList = document.querySelector('.places__list');
export const card = document.querySelector('#card-template').content;
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
const fullImage = document.querySelector('.popup__image');
const fullImageCaption = document.querySelector('.popup__caption');
const modals = document.querySelectorAll('.popup');
const modalCloseButton = document.querySelectorAll('.popup__close');
const modalProfileEdit = document.querySelector('.popup_type_edit');
export const modalAddCard = document.querySelector('.popup_type_new-card');
const modalViewImage = document.querySelector('.popup_type_image');

function getProfileEdit(name, job) {
  profileName.textContent = name.value;
  profileDescription.textContent = job.value;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  if(nameProfile.value && jobProfile.value) {
    getProfileEdit(nameProfile, jobProfile);
    closeModal(modalProfileEdit);
  }
  
  if (newCardName.value && newCardSrc.value) {
    getNewCard(newCardName, newCardSrc);
    closeModal(modalAddCard);
  }
}

cardList.addEventListener('click', (evt) => {
  if(Array.from(evt.target.classList).includes('card__like-button')) {
    getLike(evt.target);
  }
});

cardList.addEventListener('click', (evt) => {
  if(evt.target.className === 'card__image') {
    fullImage.src = evt.target.src;
    fullImage.alt = evt.target.alt;
    fullImageCaption.textContent = evt.target.alt;
    openModal(modalViewImage);
  }
});

profileEditButton.addEventListener('click', () => {
  openModal(modalProfileEdit);
  formEditProfile.reset();
  nameProfile.value = profileName.textContent;
  jobProfile.value = profileDescription.textContent;
  formEditProfile.addEventListener('submit', handleFormSubmit);
  profileEditButton.removeEventListener('click', profileEditButton);
});

newCardButton.addEventListener('click', () => {
  openModal(modalAddCard);
  formNewCard.reset();
  formNewCard.addEventListener('submit', handleFormSubmit);
  newCardButton.removeEventListener('click', newCardButton);
});

modalCloseButton.forEach(elem => {
  elem.addEventListener('click', () => {
    closeModal(elem.parentElement.parentNode);
  });
});

modals.forEach(elem => {
  elem.classList.add('popup_is-animated');
  getClickOverlay(elem);
});

initialCards.forEach(createCard);