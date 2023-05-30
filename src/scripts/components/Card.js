import { elementSelector, photoSelector, placeSelector, likeSelector, likeActive,
  removeSelector, counterLikesSelector } from '../utils/constants.js';

export default class Card {
  constructor(data, templateSelector, handleCardClick, openPopupRemoveCard, toggleLikeCard) {
    this._place = data.place;
    this._link = data.link;

    this._ownerId = data.ownerId;
    this._myId = data.myId;
    this._id = data.id;

    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(photoSelector);
    this._buttonLike = this._cardElement.querySelector(likeSelector);
    this._buttonRemove = this._cardElement.querySelector(removeSelector);

    this._isLikeOwner = data.isLikeOwner;
    this._likesCount = data.likes.length;
    this._counterLikes = this._cardElement.querySelector(counterLikesSelector);

    this._handleCardClick = handleCardClick;
    this._openPopupRemoveCard = openPopupRemoveCard;
    this._toggleLikeCard = toggleLikeCard;
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
    this._counterLikes.textContent = this._likesCount;

    if (this._ownerId === this._myId) {
      this._buttonRemove.classList.add('element__remove_active');
    }

    if (this._isLikeOwner) {
      this._buttonLike.classList.add(likeActive);
    }

    return this._cardElement;
  };

  _toggleLike = () => {
    this._buttonLike.classList.toggle(likeActive);
  }

  updateLike = (isLiked) => {
    if (isLiked) {
      this._toggleLike();
      this._counterLikes.textContent = parseInt(this._counterLikes.textContent) + 1;
    } else {
      this._toggleLike();
      this._counterLikes.textContent = parseInt(this._counterLikes.textContent) - 1;
    }
  }

  _handleLike = () => {
    const isLiked = !this._buttonLike.classList.contains(likeActive);
    this._toggleLikeCard(this, this._id, isLiked);
  };

  _handleRemove = () => {
    this._openPopupRemoveCard(this, this._id);
  };

  deleteCard = () => {
    this._cardElement.remove();
  }

  _clickHandlerWrapper = () => {
    this._handleCardClick({name: this._place, link: this._link});
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', this._handleLike);
    this._buttonRemove.addEventListener('click', this._handleRemove);
    this._cardImage.addEventListener('click', this._clickHandlerWrapper);
  };
}



