const validationVariables = {
  allFormsSelector: '.popup__form',
  fieldsetSelector: '.popup__fieldset',
  fieldsetErrorClass: 'popup__fieldset_error',
  saveButtonSelector: '.popup__save-button',
  saveButtonDisabledClass: 'popup__save-button_disabled',
  spanErrorClass: 'popup__error_visible'
};

// Функции, отвечающие за проверку, показ и скрытие ошибки
const showInputError = (fieldset, fieldsetErrorClass, spanErrorClass, errorFieldsetType, errorMessage) => {
  errorFieldsetType.textContent = errorMessage;
  errorFieldsetType.classList.add(spanErrorClass);
  fieldset.classList.add(fieldsetErrorClass);
};

const hideInputError = (fieldset, fieldsetErrorClass, spanErrorClass, errorFieldsetType) => {
  errorFieldsetType.textContent = '';
  errorFieldsetType.classList.remove(spanErrorClass);
  fieldset.classList.remove(fieldsetErrorClass);
};

const checkInputValidity = (fieldset, fieldsetErrorClass, spanErrorClass) => {
  const errorFieldsetType = document.querySelector(`.popup__error_type_${fieldset.name}`);
  if (fieldset.validity.valid) {
    hideInputError(fieldset, fieldsetErrorClass, spanErrorClass, errorFieldsetType);
  }
  else {
    showInputError(fieldset, fieldsetErrorClass, spanErrorClass, errorFieldsetType, fieldset.validationMessage);
  };
};

// Функция, проверяющая валидность обоих полей и меняющая статус кнопки сохранения формы
const hasInvalidInput = (fieldsetList) => {
  return Array.from(fieldsetList).some(fieldset => {
    return !fieldset.validity.valid;
  });
};

const toggleButtonState = (fieldsetList, button, saveButtonDisabledClass) => {
  if (hasInvalidInput(fieldsetList)) {
    button.classList.add(saveButtonDisabledClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(saveButtonDisabledClass);
    button.removeAttribute('disabled');
  };
};

// Функция добавления слушателей на ввод данных пользователем
const appendEventListeners = (fieldsetList, button, another) => {
  fieldsetList.forEach(fieldset => {
    fieldset.addEventListener('input', () => {
      checkInputValidity(fieldset, another.fieldsetErrorClass, another.spanErrorClass);
      toggleButtonState(fieldsetList, button, another.saveButtonDisabledClass)
    });
  });
};

// Функция активации валидации
function enableValidation({allFormsSelector, fieldsetSelector, saveButtonSelector, ...another}) {
  const forms = Array.from(document.querySelectorAll(allFormsSelector));
  forms.forEach(form => {
    const fieldsetList = form.querySelectorAll(fieldsetSelector);
    const button = form.querySelector(saveButtonSelector);
    appendEventListeners(fieldsetList, button, another);
  });
};

enableValidation(validationVariables);
