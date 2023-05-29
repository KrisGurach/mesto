import Popup from './Popup.js';
import { formSelector, inputSelector, buttonSaveSelector } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._form = this._popupType.querySelector(formSelector);
    this._inputList =  this._popupType.querySelectorAll(inputSelector);
    this._buttonSave = this._popupType.querySelector(buttonSaveSelector);
    this._callback = callback;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._callback(inputValues, this._buttonSave);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}


