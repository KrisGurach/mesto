// Список селекторов и констант
const popup = 'popup';
const popupOpened = 'popup_opened';
const popupCloseButton = 'popup__close-button';
const formSelector = '.popup__form';
const formEditionSelector = '.popup__form_type_edition';
const formNewCardSelector = '.popup__form_type_new-card'
const inputSelector = '.popup__input';
const popupEditionSelector = '.popup_type_edition';
const popupNewCardSelector = '.popup_type_new-card';
const popupPhotoSelector = '.popup_type_photo';
const gallerySelector = '.gallery';
const cardsContainerSelector = '.elements';
const elementSelector = '.element';
const photoSelector = '.element__photo';
const placeSelector = '.element__place';
const likeSelector = '.element__like';
const likeActive = 'element__like_active';
const removeSelector = '.element__remove';

// Поиск DOM-элементов
const caption = document.querySelector(".popup__figcaption");
const scaleImage = document.querySelector('.popup__scale-image');
const nameUser = document.querySelector('.profile__info-name');
const professionUser = document.querySelector('.profile__info-profession');
const nameInput = document.querySelector('.popup__input_type_name');
const professionInput = document.querySelector('.popup__input_type_profession');
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

// Объект настроек с селекторами для валидации
const validationVariables = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_error',
  saveButtonSelector: '.popup__save-button',
  saveButtonDisabledClass: 'popup__save-button_disabled',
  spanErrorClass: 'popup__error_visible',
  popupErrorTypeSelector: '.popup__error_type_'
};

export { popupOpened, popup, popupCloseButton,
  formSelector, formEditionSelector, formNewCardSelector, inputSelector,
  popupEditionSelector, popupNewCardSelector, popupPhotoSelector,
  gallerySelector, elementSelector, photoSelector, placeSelector, likeSelector, likeActive, removeSelector,
  cardsContainerSelector, caption, scaleImage,
  nameUser, professionUser, nameInput, professionInput,
  buttonAddCard, buttonEditProfile, validationVariables }






