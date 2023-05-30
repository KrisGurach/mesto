// Список селекторов и констант
const popup = 'popup';
const popupOpened = 'popup_opened';
const popupCloseButton = 'popup__close-button';

const formSelector = '.popup__form';
const formEditionSelector = '.popup__form_type_edition';
const formNewCardSelector = '.popup__form_type_new-card';
const formEditAvatarSelector = '.popup__form_type_avatar';
const inputSelector = '.popup__input';

const popupEditionSelector = '.popup_type_edition';
const popupNewCardSelector = '.popup_type_new-card';
const popupPhotoSelector = '.popup_type_photo';
const popupEditAvatarSelector = '.popup_type_avatar';
const popupRemoveCardSelector = '.popup_type_remove-photo';

const gallerySelector = '.gallery';
const cardsContainerSelector = '.elements';
const elementSelector = '.element';
const photoSelector = '.element__photo';
const placeSelector = '.element__place';
const likeSelector = '.element__like';
const likeActive = 'element__like_active';
const removeSelector = '.element__remove';

// Поиск DOM-элементов
const avatar = document.querySelector('.profile__avatar');

const nameUser = document.querySelector('.profile__info-name');
const professionUser = document.querySelector('.profile__info-profession');

const nameInput = document.querySelector('.popup__input_type_name');
const professionInput = document.querySelector('.popup__input_type_profession');

const buttonSaveSelector = '.popup__save-button';
const buttonsSave = document.querySelectorAll('.popup__save-button');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__button-edit-avatar');

const counterLikesSelector = '.element__like-counter';

// Объект настроек с селекторами для валидации
const validationVariables = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_error',
  saveButtonSelector: '.popup__save-button',
  saveButtonDisabledClass: 'popup__save-button_disabled',
  spanErrorClass: 'popup__error_visible',
  popupErrorTypeSelector: '.popup__error_type_'
};

// Объект настроек для класса Api
const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-66",
  token: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36"
}

export { popupOpened, popup, popupCloseButton,
  formSelector, formEditionSelector, formNewCardSelector, formEditAvatarSelector, inputSelector,
  popupEditionSelector, popupNewCardSelector, popupPhotoSelector, popupEditAvatarSelector, popupRemoveCardSelector,
  gallerySelector, elementSelector, photoSelector, placeSelector, likeSelector, likeActive, removeSelector,
  cardsContainerSelector, avatar, buttonsSave,
  nameUser, professionUser, nameInput, professionInput,
  buttonSaveSelector, buttonAddCard, buttonEditProfile, buttonEditAvatar,
  validationVariables, counterLikesSelector, config }






