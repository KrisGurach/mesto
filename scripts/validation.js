const validationVariables = {
  allFormsSelector: '.popup__form',
  inputSelector: '.popup__fieldset',
  fieldsetErrorClass: 'popup__fieldset_error',
  saveButtonSelector: '.popup__save-button',
  saveButtonDisabledClass: 'popup__save-button_disabled',
  spanErrorClass: 'popup__error_visible'
};

// Функции, отвечающие за проверку, показ и скрытие ошибки
const showInputError = (input, fieldsetErrorClass, spanErrorClass, errorFieldsetType, errorMessage) => {
  errorFieldsetType.textContent = errorMessage;
  errorFieldsetType.classList.add(spanErrorClass);
  input.classList.add(fieldsetErrorClass);
};

const hideInputError = (input, fieldsetErrorClass, spanErrorClass, errorFieldsetType) => {
  errorFieldsetType.textContent = '';
  errorFieldsetType.classList.remove(spanErrorClass);
  input.classList.remove(fieldsetErrorClass);
};

const checkInputValidity = (form, input, fieldsetErrorClass, spanErrorClass) => {
  const errorFieldsetType = form.querySelector(`.popup__error_type_${input.name}`);
  if (input.validity.valid) {
    hideInputError(input, fieldsetErrorClass, spanErrorClass, errorFieldsetType);
  }
  else {
    showInputError(input, fieldsetErrorClass, spanErrorClass, errorFieldsetType, input.validationMessage);
  };
};

// Функция, проверяющая валидность обоих полей и меняющая статус кнопки сохранения формы
const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some(input => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, button, saveButtonDisabledClass) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(saveButtonDisabledClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(saveButtonDisabledClass);
    button.removeAttribute('disabled');
  };
};

// Функция добавления слушателей на ввод данных пользователем
const appendEventListeners = (form, inputList, button, another) => {
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, another.fieldsetErrorClass, another.spanErrorClass);
      toggleButtonState(inputList, button, another.saveButtonDisabledClass)
    });
  });
};

// Функция активации валидации
function enableValidation({allFormsSelector, inputSelector, saveButtonSelector, ...another}) {
  const forms = Array.from(document.querySelectorAll(allFormsSelector));
  forms.forEach(form => {
    const inputList = form.querySelectorAll(inputSelector);
    const button = form.querySelector(saveButtonSelector);
    appendEventListeners(form, inputList, button, another);
  });
};

// Функция, отвечающая за сброс ошибки при открытии окон ввода данных
function removeErrorOpenForm(form) {
  form.querySelectorAll(validationVariables.inputSelector).forEach(fieldset => {
    const errorFieldsetType = form.querySelector(`.popup__error_type_${fieldset.name}`);
    if (!fieldset.validity.valid) {
      hideInputError(fieldset, validationVariables.fieldsetErrorClass, validationVariables.spanErrorClass, errorFieldsetType);
    };
  });
};

enableValidation(validationVariables);


