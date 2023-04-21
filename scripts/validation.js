// const validationVariables = {
//   allFormsSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   inputErrorClass: 'popup__input_error',
//   saveButtonSelector: '.popup__save-button',
//   saveButtonDisabledClass: 'popup__save-button_disabled',
//   spanErrorClass: 'popup__error_visible'
// };

// Функции, отвечающие за проверку, показ и скрытие ошибки
// const showInputError = (input, inputErrorClass, spanErrorClass, errorInputType, errorMessage) => {
//   errorInputType.textContent = errorMessage;
//   errorInputType.classList.add(spanErrorClass);
//   input.classList.add(inputErrorClass);
// };

// const hideInputError = (input, inputErrorClass, spanErrorClass, errorInputType) => {
//   errorInputType.textContent = '';
//   errorInputType.classList.remove(spanErrorClass);
//   input.classList.remove(inputErrorClass);
// };

// const checkInputValidity = (form, input, inputErrorClass, spanErrorClass) => {
//   const errorInputType = form.querySelector(`.popup__error_type_${input.name}`);
//   if (input.validity.valid) {
//     hideInputError(input, inputErrorClass, spanErrorClass, errorInputType);
//   }
//   else {
//     showInputError(input, inputErrorClass, spanErrorClass, errorInputType, input.validationMessage);
//   };
// };

// Функция, проверяющая валидность обоих полей и меняющая статус кнопки сохранения формы
// const hasInvalidInput = (inputList) => {
//   return Array.from(inputList).some(input => {
//     return !input.validity.valid;
//   });
// };

// const toggleButtonState = (inputList, button, saveButtonDisabledClass) => {
//   if (hasInvalidInput(inputList)) {
//     button.classList.add(saveButtonDisabledClass);
//     button.setAttribute('disabled', true);
//   } else {
//     button.classList.remove(saveButtonDisabledClass);
//     button.removeAttribute('disabled');
//   };
// };

// Функция добавления слушателей на ввод данных пользователем
// const appendEventListeners = (form, inputList, button, another) => {
//   inputList.forEach(input => {
//     input.addEventListener('input', () => {
//       checkInputValidity(form, input, another.inputErrorClass, another.spanErrorClass);
//       toggleButtonState(inputList, button, another.saveButtonDisabledClass)
//     });
//   });
// };

// // Функция активации валидации
// function enableValidation({allFormsSelector, inputSelector, saveButtonSelector, ...another}) {
//   const forms = Array.from(document.querySelectorAll(allFormsSelector));
//   forms.forEach(form => {
//     const inputList = form.querySelectorAll(inputSelector);
//     const button = form.querySelector(saveButtonSelector);
//     appendEventListeners(form, inputList, button, another);
//   });
// };



