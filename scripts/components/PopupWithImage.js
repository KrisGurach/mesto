import Popup from './Popup.js';
import { caption, scaleImage } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    scaleImage.src = this._link;
    scaleImage.alt = this._name;
    caption.textContent = this._name;

    super.open();
  }
}



