import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popupType.querySelector('.popup__figcaption');
    this._scaleImage = this._popupType.querySelector('.popup__scale-image');
  }

  open({ name, link }) {
    this._scaleImage.src = link;
    this._scaleImage.alt = name;
    this._caption.textContent = name;

    super.open();
  }
}



