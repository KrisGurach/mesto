// Импорт модулей
import { Card } from './Card.js';
import { initialCards } from './initialCards.js';
import { FormValidator } from './FormValidator.js';

// Поиск всех необходимых DOM-элементов
const popups = document.querySelectorAll(".popup");
const popupEdition = document.querySelector(".popup_type_edition");

const buttonEditProfile = document.querySelector(".profile__edit-button");

const formEdition = document.querySelector(".popup__form_type_edition");
const nameInput = document.querySelector(".popup__input_type_name");
const professionInput = document.querySelector(".popup__input_type_profession");

const nameUser = document.querySelector(".profile__info-name");
const professionUser = document.querySelector(".profile__info-profession");

const popupNewCard = document.querySelector(".popup_type_new-card");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputLink = document.querySelector(".popup__input_type_link");

const buttonAddCard = document.querySelector(".profile__add-button");

const formAddingElement = document.querySelector(".popup__form_type_new-card");

const cardsContainer = document.querySelector(".elements");

const popupPhoto = document.querySelector(".popup_type_photo");
const caption = document.querySelector(".popup__figcaption");
const scaleImage = document.querySelector(".popup__scale-image");

// Объект настроек с селекторами
const validationVariables = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_error',
  saveButtonSelector: '.popup__save-button',
  saveButtonDisabledClass: 'popup__save-button_disabled',
  spanErrorClass: 'popup__error_visible',
  popupErrorTypeSelector: '.popup__error_type_'
};

// Общие функции открытия и закрытия
function openPopUp(popup){
  document.addEventListener('keydown', closeByEsc);
  popup.classList.add("popup_opened");
};

function closePopUp(popup){
  document.removeEventListener('keydown', closeByEsc);
  popup.classList.remove("popup_opened");
};

// Функция, отвечающая за отображение текста профиля в полях попапа
function setPopUpEdit(){
  nameInput.value = nameUser.textContent;
  professionInput.value = professionUser.textContent;
};

// Функция, отвечющая за редактирование информации
function handleFormEditionSubmit (evt) {
    evt.preventDefault();

    nameUser.textContent = nameInput.value;
    professionUser.textContent = professionInput.value;

    closePopUp(popupEdition);
};

function getGeneratedCardElement(data) {
  const newCard = new Card(data, '.gallery');
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
  closePopUp(popupNewCard);
};

// Вызов функции сборки изначального массива фотокарточек
initialCards.forEach((data) => renderCard(getGeneratedCardElement(data)));

// Вызов функции запуска валидации формы
const formEditionValidator = new FormValidator(validationVariables, '.popup__form_type_edition');
const formNewCardValidator = new FormValidator(validationVariables, '.popup__form_type_new-card');

Array.of(formEditionValidator, formNewCardValidator).forEach(a => {
  a.enableValidation();
});


// Сохранение информации при нажатии кнопки "сохранить" у окон редактирования профиля и добавления новых фотографий
formEdition.addEventListener('submit', handleFormEditionSubmit);
formAddingElement.addEventListener('submit', handleNewElement);

// Открытие и закрытие окна редактирования профиля
buttonEditProfile.addEventListener('click', function(){
  formEditionValidator.removeErrorOpenForm();
  setPopUpEdit();
  openPopUp(popupEdition);
});

// Открытие и закрытие окна добавления новых фотографий
buttonAddCard.addEventListener('click', function(){
  formAddingElement.reset();
  formNewCardValidator.removeErrorOpenForm();
  openPopUp(popupNewCard);
});

// Закрытие по клику на overlay
popups.forEach((popup) => {
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-button")) {
      closePopUp(popup);
    }
  });
});

// Закрытие по кнопке Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpenedNow = document.querySelector(".popup_opened");
    closePopUp(popupOpenedNow);
  }
};

export { openPopUp };
export { popupPhoto, caption, scaleImage }

