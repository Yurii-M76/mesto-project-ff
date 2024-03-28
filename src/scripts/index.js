import '../pages/index.css';
import { 
  userData,
  cardsData,
  updateUserProfile,
  addNewCard,
  updateUserAvatar,
  handleLikeButton,
  requestError
} from './components/api.js';
import { getCard } from './components/card.js';
import { openModal, closeModal, getClickOverlay } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { handleSubmit, validationConfig } from './components/utils.js';

const userProfile = document.querySelector('.profile__info');
const userProfileEditButton = userProfile.querySelector('.profile__edit-button');
const userProfileTitle = userProfile.querySelector('.profile__title');
const userProfileDescription = userProfile.querySelector('.profile__description');
const userProfileImage = document.querySelector('.profile__image');
const formUpdateUserAvatar = document.forms['edit-avatar'];
const inputLinkUserAvatar = formUpdateUserAvatar.elements['avatar-link-input'];
const formUserProfileEdit = document.forms['edit-profile'];
const userName = formUserProfileEdit.elements['name'];
const userAbout = formUserProfileEdit.elements['description'];
const newCardButton = document.querySelector('.profile__add-button');
const formNewCard = document.forms['new-place'];
const newCardName = formNewCard.elements['place-name'];
const newCardLink = formNewCard.elements['link'];
const cardList = document.querySelector('.places__list');
const fullImage = document.querySelector('.popup__image');
const fullImageCaption = document.querySelector('.popup__caption');
const modals = document.querySelectorAll('.popup');
const modalUpdateUserAvatar = document.querySelector('.popup_type_avatar');
const modalProfileEdit = document.querySelector('.popup_type_edit');
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalViewImage = document.querySelector('.popup_type_image');
const modalCloseButtons = document.querySelectorAll('.popup__close');

function getUserDataToDom(name, about) {
  userProfileTitle.textContent = name;
  userProfileDescription.textContent = about;
}

function handleClickCardImage(evt) {
  if(evt.target.className === 'card__image') {
    fullImage.src = evt.target.src;
    fullImage.alt = evt.target.alt;
    fullImageCaption.textContent = evt.target.alt;
    openModal(modalViewImage);
  }
};

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return updateUserProfile(userName.value, userAbout.value)
    .then((userData) => {
      getUserDataToDom(userData.name, userData.about);
      closeModal(modalProfileEdit);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleNewCardFormSubmit(evt) {
  function makeRequest() {
    return addNewCard(newCardName.value, newCardLink.value)
    .then((card) => {
      cardList.prepend(getCard({
        item: card,
        handleClick: handleClickCardImage,
        handleLike: handleLikeButton,
        countLikes: 0,
      }));
      closeModal(modalNewCard);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleUpdateUserAvatar(evt) {
  function makeRequest() {
    return updateUserAvatar(inputLinkUserAvatar.value)
    .then((user) => {
      userProfileImage.style = `background-image: url(${user.avatar});`;
      closeModal(modalUpdateUserAvatar);
    });
  }
  handleSubmit(makeRequest, evt);
}

userProfileEditButton.addEventListener('click', () => {
  openModal(modalProfileEdit);
  userName.value = userProfileTitle.textContent;
  userAbout.value = userProfileDescription.textContent;
  clearValidation(formUserProfileEdit, validationConfig);
});

formUserProfileEdit.addEventListener('submit', handleProfileFormSubmit);

newCardButton.addEventListener('click', () => {
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  openModal(modalNewCard);
});

formNewCard.addEventListener('submit', handleNewCardFormSubmit);

userProfileImage.addEventListener('click', () => {
  formUpdateUserAvatar.reset();
  clearValidation(formUpdateUserAvatar, validationConfig);
  openModal(modalUpdateUserAvatar);
});

modalUpdateUserAvatar.addEventListener('submit', handleUpdateUserAvatar);

modalCloseButtons.forEach(elem => {
  elem.addEventListener('click', () => {
    closeModal(elem.parentElement.parentNode);
  });
});

modals.forEach(elem => {
  elem.classList.add('popup_is-animated');
  getClickOverlay(elem);
});

enableValidation(validationConfig);

Promise.all([userData, cardsData])
  .then(([user, cards]) => {
    getUserDataToDom(user.name, user.about);
    userProfileImage.style = `background-image: url(${user.avatar});`;
    
    cards.forEach(card => {
      cardList.append(getCard({
        item: card,
        handleClick: handleClickCardImage,
        handleLike: handleLikeButton,
        countLikes: card.likes.length,
        user: user['_id'],
        deleteButtonStatus: user['_id'] !== card.owner['_id']
      }));
    })
  })
  .catch(requestError);