import '../pages/index.css';
import { config, request, checkResponse, requestError, userData, cardsData } from './components/api.js';
import { getCard, handleCardLikeButton, removeElement } from './components/card.js';
import { openModal, closeModal, getClickOverlay } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

const profile = document.querySelector('.profile__info');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formUpdateUserAvatar = document.forms['edit-avatar'];
const newUserAvatar = formUpdateUserAvatar.elements['avatar-link-input'];
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
const modalUpdateUserAvatar = document.querySelector('.popup_type_avatar');
const modalProfileEdit = document.querySelector('.popup_type_edit');
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalViewImage = document.querySelector('.popup_type_image');
const buttonsCloseModal = document.querySelectorAll('.popup__close');

function getUserProfile(name, about) {
  request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({
      name: name.value,
      about: about.value
    }),
    headers: config.headers
  })
  .then(checkResponse)
  .then((user) => {
    getUserProfileToDom(user.name, user.about);
  })
  .catch(requestError);
}

function createNewCard(name, src) {
  request('/cards', {
    method: 'POST',
    body: JSON.stringify({
      name: name.value,
      link: src.value
    }),
    headers: config.headers
  })
  .then(checkResponse)
  .then((card) => {
    cardList.prepend(getCard(card, removeElement, handleCardLikeButton, handleClickCardImage));
  })
  .catch(requestError);
}

function updateUserAvatar(src) {
  request(`/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: src
    }),
    headers: config.headers
  })
  .then(checkResponse)
  .then(() => {
    profileImage.style = `background-image: url(${src})`;
  })
  .catch(requestError);
}

function getUserProfileToDom(name, about) {
  profileName.textContent = name;
  profileDescription.textContent = about;
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  getUserProfile(nameProfile, jobProfile);
  closeModal(modalProfileEdit);
}

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  createNewCard(newCardName, newCardSrc);
  closeModal(modalNewCard);
}

function handleClickCardImage(evt) {
  if(evt.target.className === 'card__image') {
    fullImage.src = evt.target.src;
    fullImage.alt = evt.target.alt;
    fullImageCaption.textContent = evt.target.alt;
    openModal(modalViewImage);
  }
}

function handleFormSubmitNewAvatar(evt) {
  evt.preventDefault();
  updateUserAvatar(newUserAvatar.value);
  closeModal(modalUpdateUserAvatar);
}

profileImage.addEventListener('click', () => {
  openModal(modalUpdateUserAvatar);
  formUpdateUserAvatar.reset();
  clearValidation(formUpdateUserAvatar);
});

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

formUpdateUserAvatar.addEventListener('submit', handleFormSubmitNewAvatar);
formEditProfile.addEventListener('submit', handleFormSubmitProfile);
formNewCard.addEventListener('submit', handleFormSubmitNewCard);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

Promise.all([userData, cardsData])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style = `background-image: url(${user.avatar});`;
   
    cards.forEach(card => {
      cardList.append(getCard(card, removeElement, handleCardLikeButton, handleClickCardImage, user['_id'], card.likes.length));
    })
  })
  .ful
