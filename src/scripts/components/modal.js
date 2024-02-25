export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      closeModal(modal);
    }
  });
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', document);
}

export function getClickOverlay(elem) {
  elem.addEventListener('click', (evt) => {
    closeModal(evt.target);
  });
}