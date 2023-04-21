// Импорт модулей
import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';

// Поиск всех необходимых DOM-элементов
const popups = document.querySelectorAll(".popup");
const popupEdition = document.querySelector(".popup_type_edition");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonCloseEdit = popupEdition.querySelector(".popup__close-button_type_edition");

const formEdition = document.querySelector(".popup__form_type_edition");
const formEditionInputs = formEdition.querySelectorAll(".popup__input");
const formEditionSaveButton = formEdition.querySelector(".popup__save-button");
const nameInput = document.querySelector(".popup__input_type_name");
const professionInput = document.querySelector(".popup__input_type_profession");

const nameUser = document.querySelector(".profile__info-name");
const professionUser = document.querySelector(".profile__info-profession");

const popupNewCard = document.querySelector(".popup_type_new-card");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputLink = document.querySelector(".popup__input_type_link");

const buttonAddCard = document.querySelector(".profile__add-button");
const buttonCloseNewCard = popupNewCard.querySelector(".popup__close-button_type_new-card");

const formAddingElement = document.querySelector(".popup__form_type_new-card");
const formAddingElementInputs = formAddingElement.querySelectorAll(".popup__input");
const formAddingElementSaveButton = formAddingElement.querySelector(".popup__save-button");

const elements = document.querySelector(".elements");

const popupPhoto = document.querySelector(".popup_type_photo");
const buttonClosePhoto = document.querySelector(".popup__close-button_type_photo");

// Объект настроек с селекторами
const validationVariables = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_error',
  saveButtonSelector: '.popup__save-button',
  saveButtonDisabledClass: 'popup__save-button_disabled',
  spanErrorClass: 'popup__error_visible'
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

// Функция добавления новой карточки пользователем
function addElement(evt) {
  evt.preventDefault();
  const newCard = new Card(inputPlace.value, inputLink.value);

  newCard.generateCard();
  elements.prepend(newCard._cardElement);
  closePopUp(popupNewCard);
};

// Вызов функции сборки изначального массива фотокарточек
initialCards.forEach((card) => {
  const newCard = new Card(card.name, card.link);
  newCard.generateCard();
  elements.prepend(newCard._cardElement);
});

// Вызов функции запуска валидации формы
const formEditionValidator = new FormValidator(validationVariables, '.popup__form_type_edition');
const formNewCardValidator = new FormValidator(validationVariables, '.popup__form_type_new-card');

Array.of(formEditionValidator, formNewCardValidator).forEach(a => {
  a.enableValidation();
});


// Сохранение информации при нажатии кнопки "сохранить" у окон редактирования профиля и добавления новых фотографий
formEdition.addEventListener('submit', handleFormEditionSubmit);
formAddingElement.addEventListener('submit', addElement);

// Открытие и закрытие окна редактирования профиля
buttonEditProfile.addEventListener('click', function(){
  formEditionValidator.removeErrorOpenForm(popupEdition);
  setPopUpEdit();
  openPopUp(popupEdition);
});

buttonCloseEdit.addEventListener('click', function(){
  closePopUp(popupEdition);
});

// Открытие и закрытие окна добавления новых фотографий
buttonAddCard.addEventListener('click', function(){
  formAddingElement.reset();
  formNewCardValidator.removeErrorOpenForm(popupNewCard);
  openPopUp(popupNewCard);
});

buttonCloseNewCard.addEventListener('click', function() {
  closePopUp(popupNewCard);
});

// Закрытие окна увеличенной фотографии
buttonClosePhoto.addEventListener('click', function(){
  closePopUp(popupPhoto);
});

// Закрытие по клику на overlay
popups.forEach((popup) => {
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopUp(evt.target);
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

