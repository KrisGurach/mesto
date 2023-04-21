class FormValidator {
  constructor(validationVariables, currentForm) {
    this._validationVariables = validationVariables;
    this._currentForm = currentForm;
  };

  _showInputError(input, errorInputType, errorMessage) {
    errorInputType.textContent = errorMessage;
    errorInputType.classList.add(this._validationVariables.spanErrorClass);
    input.classList.add(this._validationVariables.inputErrorClass);
  };

  _hideInputError(input, errorInputType) {
    errorInputType.textContent = '';
    errorInputType.classList.remove(this._validationVariables.spanErrorClass);
    input.classList.remove(this._validationVariables.inputErrorClass);
  };

  _checkInputValidity(form, input) {
    const errorInputType = form.querySelector(`${this._validationVariables.popupErrorTypeSelector}${input.name}`);
    if (input.validity.valid) {
      this._hideInputError(input, errorInputType);
    }
    else {
      this._showInputError(input, errorInputType, input.validationMessage);
    };
  };

  _hasInvalidInput(inputList) {
    return Array.from(inputList).some(input => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._validationVariables.saveButtonDisabledClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._validationVariables.saveButtonDisabledClass);
      button.removeAttribute('disabled');
    };
  };

  _appendEventListeners(form, inputList, button) {
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(form, input);
        this._toggleButtonState(inputList, button)
      });
    });
  };

  enableValidation() {
    const form = document.querySelector(this._currentForm);
    const inputList = form.querySelectorAll(this._validationVariables.inputSelector);
    const button = form.querySelector(this._validationVariables.saveButtonSelector);
    this._appendEventListeners(form, inputList, button);
  };

  removeErrorOpenForm(form) {
    const inputList = form.querySelectorAll(this._validationVariables.inputSelector);
    const button = form.querySelector(this._validationVariables.saveButtonSelector);

    form.querySelectorAll(this._validationVariables.inputSelector).forEach(input => {
      const errorInputType = form.querySelector(`${this._validationVariables.popupErrorTypeSelector}${input.name}`);
      this._hideInputError(input, errorInputType);
      this._toggleButtonState(inputList, button);
    });
  };
}


export { FormValidator }


