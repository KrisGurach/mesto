// Список селекторов и констант
const popup = 'popup';
const popupOpened = 'popup_opened';
const popupCloseButton = 'popup__close-button';
const cardsContainerSelector = '.elements';
const formSelector = '.popup__form'
const inputSelector = '.popup__input';
const popupEditionSelector = '.popup_type_edition';
const popupNewCardSelector = '.popup_type_new-card';
const popupPhotoSelector = '.popup_type_photo';

// Поиск DOM-элементов
const caption = document.querySelector(".popup__figcaption");
const scaleImage = document.querySelector('.popup__scale-image');
const nameUser = document.querySelector('.profile__info-name');
const professionUser = document.querySelector('.profile__info-profession');
const nameInput = document.querySelector('.popup__input_type_name');
const professionInput = document.querySelector('.popup__input_type_profession');
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

// Объект настроек с селекторами
const validationVariables = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_error',
  saveButtonSelector: '.popup__save-button',
  saveButtonDisabledClass: 'popup__save-button_disabled',
  spanErrorClass: 'popup__error_visible',
  popupErrorTypeSelector: '.popup__error_type_'
};

export { popupOpened, popup, popupCloseButton, caption, scaleImage, formSelector, inputSelector,
  popupEditionSelector, popupNewCardSelector, popupPhotoSelector, nameUser, professionUser,
  nameInput, professionInput, cardsContainerSelector, buttonAddCard, buttonEditProfile, validationVariables }






