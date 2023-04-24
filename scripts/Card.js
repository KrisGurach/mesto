import { openPopUp } from './index.js';
import { popupPhoto, caption, scaleImage } from './index.js';

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.element__photo');
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._setEventListeners();

    this._cardElement.querySelector('.element__place').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    return this._cardElement;
  };

  _handleLike = () => {
    this._cardElement.querySelector('.element__like').classList.toggle("element__like_active");
  };

  _handleRemove = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _handleOpenPopupPhoto = () => {
    scaleImage.src = this._link;
    scaleImage.alt = this._name;
    caption.textContent = this._name;

    openPopUp(popupPhoto);
  };

  _setEventListeners() {
    this._cardElement.querySelector('.element__like').addEventListener('click', this._handleLike);

    this._cardElement.querySelector('.element__remove').addEventListener('click', this._handleRemove);

    this._cardImage.addEventListener('click', this._handleOpenPopupPhoto);
  };
};

export { Card }



