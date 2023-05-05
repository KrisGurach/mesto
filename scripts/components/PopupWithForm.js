import Popup from './Popup.js';
import { formSelector, inputSelector } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._form = this._popupType.querySelector(formSelector);
    this._inputList =  this._popupType.querySelectorAll(inputSelector);
    this._callback = callback; //саму фуекцию нужно прописать в index.js или в другом файле, где будет создаваться новый блять экземпляр ебучкласса
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

    this_form.addEventListener("submit", this._callback); //function handleFormEditionSubmit and function handleNewElement
  }

  close() {
    this._form.reset();
    super.close();
  }
}


