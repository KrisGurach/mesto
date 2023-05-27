import Popup from "./Popup";
import { formSelector } from '../utils/constants.js';

export default  class PopupWithRemove extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
    this._form = this._popupType.querySelector(formSelector);
    }

    setEventListeners(card, id) {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._callback(card, id);
        this.close();
      })
    }
  }



