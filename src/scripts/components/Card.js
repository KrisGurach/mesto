import { elementSelector, photoSelector, placeSelector, likeSelector, likeActive,
  removeSelector, counterLikesSelector } from '../utils/constants.js';

export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, toggleLikeCard) {
    this._place = data.place;
    this._link = data.link;

    this._ownerId = data.ownerId;
    this._currentUserId = data.currentUserId;
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
    this._handleDeleteClick = handleDeleteClick;
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

    if (this._ownerId === this._currentUserId) {
      this._buttonRemove.classList.add('element__remove_active');
    }

    if (this._isLikeOwner) {
      this._buttonLike.classList.add(likeActive);
    }

    return this._cardElement;
  };

  updateLike = (isLiked) => {
    debugger;
    this._buttonLike.classList.toggle(likeActive);

    const difference = isLiked ? 1 : -1;
    this._counterLikes.textContent = parseInt(this._counterLikes.textContent) + difference;
  }

  _handleLike = () => {
    const isLiked = !this._buttonLike.classList.contains(likeActive);
    this._toggleLikeCard(this, this._id, isLiked);
  };

  _handleRemove = () => {
    this._handleDeleteClick(this, this._id);
  };

  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick = () => {
    this._handleCardClick({name: this._place, link: this._link});
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', this._handleLike);
    this._buttonRemove.addEventListener('click', this._handleRemove);
    this._cardImage.addEventListener('click', this._handleImageClick);
  };
}



