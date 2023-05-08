// Импорт css-файла
import './pages/index.css';

// Импорт модулей
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from  './scripts/components/PopupWithImage.js';
import { initialCards } from './scripts/utils/initialCards.js';
import { formEditionSelector, formNewCardSelector, gallerySelector,
  popupEditionSelector, popupNewCardSelector, popupPhotoSelector,
  nameUser, professionUser, cardsContainerSelector, buttonAddCard,
  buttonEditProfile, validationVariables } from './scripts/utils/constants.js';
import UserInfo from './scripts/components/UserInfo.js';
import Section from './scripts/components/Section.js';

// Вызов функции отрисовки массива фотокарточек
const baseCardSection = new Section({ items: initialCards, renderer: (item) => renderFunc(item, baseCardSection)}, cardsContainerSelector);

baseCardSection.renderAll();

// Вызов функции запуска сабмита формы
const popupEdition = new PopupWithForm(popupEditionSelector, handleFormEditionSubmit);
const popupNewCard = new PopupWithForm(popupNewCardSelector, handleNewElement);

Array.of(popupEdition, popupNewCard).forEach(a => a.setEventListeners());

// Вызов функции запуска валидации формы
const formEditionValidator = new FormValidator(validationVariables, formEditionSelector);
const formNewCardValidator = new FormValidator(validationVariables, formNewCardSelector);

Array.of(formEditionValidator, formNewCardValidator).forEach(a => a.enableValidation());

// Запуск отображения данных пользователя со страницы в попап и сохранение при редактировании
const userInfo = new UserInfo({ name: nameUser, profession: professionUser });

// Функция, создающая новый экземпляр класса для фотокарточки
function getCardElement(item) {
  const newCard = new Card(item, gallerySelector, handleCardClick);
  return newCard.generateCard();
}

// Функция, вставляющая фотокарточку в разметку
function renderFunc(item, cardSection) {
  const cardElement = getCardElement(item);
  cardSection.addItem(cardElement);
}

// Функция, отвечющая за редактирование информации
function handleFormEditionSubmit(evt) {
    evt.preventDefault();

    const inputValues = popupEdition.getInputValues();

    nameUser.textContent = inputValues.name;
    professionUser.textContent = inputValues.profession;

    popupEdition.close();
};

// Функция добавления новой карточки пользователем
function handleNewElement(evt) {
  evt.preventDefault();
  const inputValues = popupNewCard.getInputValues();
  const data = [inputValues];

  const newCardSection = new Section({ items: data, renderer: (item) => renderFunc(item, newCardSection)}, cardsContainerSelector);

  newCardSection.renderAll();

  popupNewCard.close();
};

// Запуск функции создания рабочего попапа с увеличенным изображением
function handleCardClick(data) {
  const popupPhoto = new PopupWithImage(data, popupPhotoSelector);
  popupPhoto.setEventListeners();
  popupPhoto.open();
}

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

