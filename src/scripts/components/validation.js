export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const isValid = (formElement, inputElement, validationConfig) => {
  const formErrorMessage = formElement.querySelector(`.${inputElement.id}-error`);
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]*$/;

  if(!regex.test(inputElement.value) && inputElement.dataset.errorMesage) {
    inputElement.setCustomValidity(inputElement.dataset.errorMesage);
  } else {
    inputElement.setCustomValidity('');
  }

  if(!inputElement.validity.valid) {
    showInputError(inputElement, formErrorMessage, validationConfig);
  } else {
    hideInputError(inputElement, formErrorMessage, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const showInputError = (element, formErrorMessage, validationConfig) => {
  element.classList.add(validationConfig.inputErrorClass);
  formErrorMessage.textContent = element.validationMessage;
};

const hideInputError = (element, formErrorMessage, validationConfig) => {
  element.classList.remove(validationConfig.inputErrorClass);
  formErrorMessage.textContent = '';
};

export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach(element => element.classList.remove(validationConfig.inputErrorClass));
  const errorList = Array.from(formElement.querySelectorAll(validationConfig.inputErrorSelector));
  errorList.forEach(element => element.textContent = '');
  toggleButtonState(inputList, formElement.querySelector(validationConfig.submitButtonSelector), validationConfig);
};