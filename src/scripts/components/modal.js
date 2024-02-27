const page = document.querySelector('.page');
export const modalProfileEdit = document.querySelector('.popup_type_edit');
export const modalNewCard = document.querySelector('.popup_type_new-card');
export const modalViewImage = document.querySelector('.popup_type_image');

export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  page.addEventListener('keydown', closeModalToEscape);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  page.removeEventListener('keydown', closeModalToEscape);
}

export function getClickOverlay(elem) {
  elem.addEventListener('click', (evt) => {
    closeModal(evt.target);
  });
}

function closeModalToEscape(evt) {
  if(evt.key === 'Escape') {
    closeModal(modalViewImage);
    closeModal(modalNewCard);
    closeModal(modalProfileEdit);
  }
}