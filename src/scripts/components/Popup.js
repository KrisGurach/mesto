import { popupOpened, popup, popupCloseButton } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupType = document.querySelector(popupSelector);
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._boundHandleEscClose);
    this._popupType.classList.add(popupOpened);
  }

  close() {
    document.removeEventListener('keydown', this._boundHandleEscClose);
    this._popupType.classList.remove(popupOpened);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClose(evt) {
    if (evt.target.classList.contains(popup) || evt.target.classList.contains(popupCloseButton)) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupType.addEventListener("mousedown", this._handleClose.bind(this));
  }
}



