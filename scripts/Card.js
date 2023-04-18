class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector('#gallery')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    this._cardElement.querySelector('.element__place').textContent = this._name;
    this._cardElement.querySelector('.element__photo').alt = this._name;
    this._cardElement.querySelector('.element__photo').src = this._link;
  };

  _setEventListeners() {
    this._cardElement.querySelector('.element__like').addEventListener('click', () =>
      this._cardElement.querySelector('.element__like').classList.toggle("element__like_active"));

    this._cardElement.querySelector('.element__remove').addEventListener('click', () =>
      this._cardElement.remove());

      this._cardElement.querySelector('.element__photo').addEventListener('click', () => {
        scaleImage.src = this._link;
        scaleImage.alt = this._name;
        caption.textContent = this._name;

        openPopUp(popupPhoto);
      });
  };
};

export {Card}

// 1. Удалить ненужные селекты в индексе
// 2. Избавиться от файла тест
// 3. Разобраться как перенести addElement