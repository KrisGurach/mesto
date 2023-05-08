import { elementSelector, photoSelector, placeSelector, likeSelector, likeActive, removeSelector } from '../utils/constants.js';

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._place = data.place;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(photoSelector);
    this._buttonLike = this._cardElement.querySelector(likeSelector);
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(elementSelector)
      .cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._setEventListeners();

    this._cardElement.querySelector(placeSelector).textContent = this._place;
    this._cardImage.alt = this._place;
    this._cardImage.src = this._link;

    return this._cardElement;
  };

  _handleLike = () => {
    this._buttonLike.classList.toggle(likeActive);
  };

  _handleRemove = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _clickHandlerWrapper = () => {
    this._handleCardClick({name: this._place, link: this._link});
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', this._handleLike);
    this._cardElement.querySelector(removeSelector).addEventListener('click', this._handleRemove);
    this._cardImage.addEventListener('click', this._clickHandlerWrapper);
  };
}



