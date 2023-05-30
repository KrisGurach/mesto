export default class FormValidator {
  constructor(validationVariables, currentForm) {
    this._validationVariables = validationVariables;
    this._form = document.querySelector(currentForm);
    this._inputList = this._form.querySelectorAll(this._validationVariables.inputSelector);
    this._button = this._form.querySelector(this._validationVariables.saveButtonSelector);
  };

  _showInputError(input, errorInputType) {
    errorInputType.textContent = input.validationMessage;
    errorInputType.classList.add(this._validationVariables.spanErrorClass);
    input.classList.add(this._validationVariables.inputErrorClass);
  };

  _hideInputError(input, errorInputType) {
    errorInputType.textContent = '';
    errorInputType.classList.remove(this._validationVariables.spanErrorClass);
    input.classList.remove(this._validationVariables.inputErrorClass);
  };

  _checkInputValidity(input) {
    const errorInputType = this._form.querySelector(`${this._validationVariables.popupErrorTypeSelector}${input.name}`);
    if (input.validity.valid) {
      this._hideInputError(input, errorInputType);
    }
    else {
      this._showInputError(input, errorInputType);
    };
  };

  _hasInvalidInput() {
    return Array.from(this._inputList).some(input => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._validationVariables.saveButtonDisabledClass);
      this._button.setAttribute('disabled', true);
    } else {
      this._button.classList.remove(this._validationVariables.saveButtonDisabledClass);
      this._button.removeAttribute('disabled');
    };
  };

  _appendEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._appendEventListeners();
  };

  removeErrorOpenForm() {
    this._toggleButtonState();

    this._inputList.forEach(input => {
      const errorInputType = this._form.querySelector(`${this._validationVariables.popupErrorTypeSelector}${input.name}`);
      this._hideInputError(input, errorInputType);
    });
  };
}




