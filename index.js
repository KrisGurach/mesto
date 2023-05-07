// Импорт модулей
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from  './scripts/components/PopupWithImage.js';
import { initialCards } from './scripts/utils/initialCards.js';
import { popupEditionSelector, popupNewCardSelector, popupPhotoSelector,
  nameUser, professionUser, nameInput, professionInput, cardsContainerSelector } from './scripts/utils/constants.js';
import UserInfo from './scripts/components/UserInfo.js';
import Section from './scripts/components/Section.js';

// Поиск всех необходимых DOM-элементов
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


// Вызов функции запуска сабмита формы
const popupEdition = new PopupWithForm(popupEditionSelector, handleFormEditionSubmit);
const popupNewCard = new PopupWithForm(popupNewCardSelector, handleNewElement);

// Функция, отвечющая за редактирование информации
function handleFormEditionSubmit(evt) {
    evt.preventDefault();

    const inputValues = popupEdition.getInputValues();

    nameUser.textContent = inputValues.name;
    professionUser.textContent = inputValues.profession;

    popupEdition.close();
};

// Запуск функции создания рабочего попапа с увеличенным изображением
const handleCardClick = (data) => {
  const popupPhoto = new PopupWithImage(data, popupPhotoSelector);
  popupPhoto.setEventListeners();
  popupPhoto.open();
}

// Функция добавления новой карточки пользователем
function handleNewElement(evt) {
  evt.preventDefault();
  const inputValues = popupNewCard.getInputValues();
  const data = [inputValues];

  const newCardSection = new Section({ items: data, renderer: (item) => {
    const newCard = new Card(item, '.gallery', handleCardClick);
    const cardElement = newCard.generateCard();
    newCardSection.addItem(cardElement);
}}, cardsContainerSelector)

  newCardSection.renderAll();

  popupNewCard.close();
};

// Вызов функции запуска валидации формы
const formEditionValidator = new FormValidator(validationVariables, '.popup__form_type_edition');
const formNewCardValidator = new FormValidator(validationVariables, '.popup__form_type_new-card');

Array.of(formEditionValidator, formNewCardValidator).forEach(a => a.enableValidation());


Array.of(popupEdition, popupNewCard).forEach(a => a.setEventListeners());

// Запуск отображения данных пользователя со страницы в попап и сохранение при редактировании
const userInfo = new UserInfo({ name: nameUser, profession: professionUser });

// Отрисовка карточек
const baseCardSection = new Section({ items: initialCards, renderer: (item) => {
    const newCard = new Card(item, '.gallery', handleCardClick);
    const cardElement = newCard.generateCard();
    baseCardSection.addItem(cardElement);
  }
}, cardsContainerSelector);

baseCardSection.renderAll();

// Открытие и закрытие окна редактирования профиля
buttonEditProfile.addEventListener('click', function(){
  formEditionValidator.removeErrorOpenForm();
  userInfo.setUserInfo();
  popupEdition.open();
});

// Открытие и закрытие окна добавления новых фотографий
buttonAddCard.addEventListener('click', function(){
  formNewCardValidator.removeErrorOpenForm();
  popupNewCard.open();
});

