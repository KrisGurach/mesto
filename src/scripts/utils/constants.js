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

const myId = '2e1486c131f2c47e1507d015';

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

export { popupOpened, popup, popupCloseButton,
  formSelector, formEditionSelector, formNewCardSelector, formEditAvatarSelector, inputSelector,
  popupEditionSelector, popupNewCardSelector, popupPhotoSelector, popupEditAvatarSelector, popupRemoveCardSelector,
  gallerySelector, elementSelector, photoSelector, placeSelector, likeSelector, likeActive, removeSelector,
  cardsContainerSelector, avatar, buttonsSave,
  nameUser, professionUser, nameInput, professionInput,
  buttonSaveSelector, buttonAddCard, buttonEditProfile, buttonEditAvatar,
  validationVariables, myId, counterLikesSelector }






