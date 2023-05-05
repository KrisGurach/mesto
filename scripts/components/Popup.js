import { popupOpened, popup, popupCloseButton } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupType = document.querySelector(popupSelector);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupType.classList.add(popupOpened);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupType.classList.remove(popupOpened);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._popupType.close();
    }
  }

  setEventListeners() {
    this._popupType.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains(popup) || evt.target.classList.contains(popupCloseButton)) {
        this.close();
      }
    });
  }
}



