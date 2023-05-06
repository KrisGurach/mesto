import Popup from './Popup.js';
import { formSelector, inputSelector } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._form = this._popupType.querySelector(formSelector);
    this._inputList =  this._popupType.querySelectorAll(inputSelector);
    this._callback = callback;
  }

  _getInputValues() {
    const obj = {};
    this._inputList.forEach(input => {
      obj[input.name] = input.value;
    });
    return obj;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", this._callback);
  }

  close() {
    super.close();
    //setTimeout.bind(window, this._form.reset, 1000);
    this._form.reset();
  }
}


