import { popupOpenedSelector, popupSelector, popupCloseButtonSelector } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupType = document.querySelector(popupSelector);
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._boundHandleEscClose);
    this._popupType.classList.add(popupOpenedSelector);
  }

  close() {
    document.removeEventListener('keydown', this._boundHandleEscClose);
    this._popupType.classList.remove(popupOpenedSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClose(evt) {
    if (evt.target.classList.contains(popupSelector) || evt.target.classList.contains(popupCloseButtonSelector)) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupType.addEventListener("mousedown", this._handleClose.bind(this));
  }
}



