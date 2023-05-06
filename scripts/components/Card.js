export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.element__photo');
    this._buttonLike = this._cardElement.querySelector('.element__like');
    this._handleCardClick = handleCardClick;
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
    this._buttonLike.classList.toggle("element__like_active");
  };

  _handleRemove = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _clickHandlerWrapper = () => {
    this._handleCardClick({name: this._name, link: this._link});
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', this._handleLike);
    this._cardElement.querySelector('.element__remove').addEventListener('click', this._handleRemove);
    this._cardImage.addEventListener('click', this._clickHandlerWrapper);
  };
}



