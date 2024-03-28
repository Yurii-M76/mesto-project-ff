const page = document.querySelector('.page');

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
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(evt.target);
    }
  });
}

function closeModalToEscape(evt) {
  if(evt.key === 'Escape') {
    closeModal(page.querySelector('.popup_is-opened'));
  }
}