// Импорт модулей
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from  './scripts/components/PopupWithImage.js';
import { initialCards } from './scripts/utils/initialCards.js';
import { popupEditionSelector, popupNewCardSelector,popupPhotoSelector } from './scripts/utils/constants.js';

// Поиск всех необходимых DOM-элементов
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

const nameInput = document.querySelector(".popup__input_type_name");
const professionInput = document.querySelector(".popup__input_type_profession");

const nameUser = document.querySelector(".profile__info-name");
const professionUser = document.querySelector(".profile__info-profession");

const inputPlace = document.querySelector(".popup__input_type_place");
const inputLink = document.querySelector(".popup__input_type_link");

const formAddingElement = document.querySelector(".popup__form_type_new-card");

const cardsContainer = document.querySelector(".elements");

// Объект настроек с селекторами
const validationVariables = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_error',
  saveButtonSelector: '.popup__save-button',
  saveButtonDisabledClass: 'popup__save-button_disabled',
  spanErrorClass: 'popup__error_visible',
  popupErrorTypeSelector: '.popup__error_type_'
};

// Функция, отвечающая за отображение текста профиля в полях попапа
function setPopUpEdit(){
  nameInput.value = nameUser.textContent;
  professionInput.value = professionUser.textContent;
};

// Функция, отвечющая за редактирование информации
function handleFormEditionSubmit(evt) {
    evt.preventDefault();

    nameUser.textContent = nameInput.value;
    professionUser.textContent = professionInput.value;

    popupEdition.close();
};

const handleCardClick = (data) => {
  const popupPhoto = new PopupWithImage(data, popupPhotoSelector);
  popupPhoto.setEventListeners();
  popupPhoto.open();
}

function getGeneratedCardElement(data) {
  const newCard = new Card(data, '.gallery', handleCardClick);
  return newCard.generateCard();
};

// Функция добавления карточки в разметку
function renderCard(generatedCardElement) {
  cardsContainer.prepend(generatedCardElement);
};

// Функция добавления новой карточки пользователем
function handleNewElement(evt) {
  evt.preventDefault();
  const data = {
    name: inputPlace.value,
    link: inputLink.value
  };

  renderCard(getGeneratedCardElement(data));
  popupNewCard.close();
};

// Вызов функции сборки изначального массива фотокарточек
initialCards.forEach((data) => renderCard(getGeneratedCardElement(data)));

// Вызов функции запуска валидации формы
const formEditionValidator = new FormValidator(validationVariables, '.popup__form_type_edition');
const formNewCardValidator = new FormValidator(validationVariables, '.popup__form_type_new-card');

Array.of(formEditionValidator, formNewCardValidator).forEach(a => a.enableValidation());


const popupEdition = new PopupWithForm(popupEditionSelector, handleFormEditionSubmit);
const popupNewCard = new PopupWithForm(popupNewCardSelector, handleNewElement);

Array.of(popupEdition, popupNewCard).forEach(a => a.setEventListeners());



// Открытие и закрытие окна редактирования профиля
buttonEditProfile.addEventListener('click', function(){
  formEditionValidator.removeErrorOpenForm();
  setPopUpEdit();
  popupEdition.open();
});

// Открытие и закрытие окна добавления новых фотографий
buttonAddCard.addEventListener('click', function(){
  formAddingElement.reset();
  formNewCardValidator.removeErrorOpenForm();
  popupNewCard.open();
});

