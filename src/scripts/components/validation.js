export const enableValidation = (set) => {
  const setting = set;
  const formList = Array.from(document.querySelectorAll(set.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(set, formElement);
  });
};

const setEventListeners = (set, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(set.inputSelector));
  const buttonElement = formElement.querySelector(set.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const isValid = (formElement, inputElement) => {
  const formErrorMessage = formElement.querySelector(`.${inputElement.id}-error`);
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]*$/;
  if(!regex.test(inputElement.value) &&
    (inputElement.name === 'name' || inputElement.name === 'place-name')) {
    inputElement.setCustomValidity(inputElement.dataset.errorMesage);
  } else {
    inputElement.setCustomValidity('');
  }
  if(!inputElement.validity.valid) {
    showInputError(inputElement, formErrorMessage);
  } else {
    hideInputError(inputElement, formErrorMessage);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
};

const showInputError = (element, formErrorMessage) => {
  element.classList.add('popup__input_type_error');
  formErrorMessage.textContent = element.validationMessage;
};

const hideInputError = (element, formErrorMessage) => {
  element.classList.remove('popup__input_type_error');
  formErrorMessage.textContent = '';
};

export const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const errorList = Array.from(formElement.querySelectorAll('.form__input-error'));
  inputList.forEach(element => element.classList.remove('popup__input_type_error'));
  errorList.forEach(element => element.textContent = '');
  toggleButtonState(inputList, formElement.querySelector('button'));
};