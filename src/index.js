// Импорт css-файла
import './pages/index.css';

// Импорт модулей
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from  './scripts/components/PopupWithImage.js';
import { initialCards } from './scripts/utils/initialCards.js';
import { formEditionSelector, formNewCardSelector,
  popupEditionSelector, popupNewCardSelector, popupPhotoSelector,
  nameInput, professionInput, nameUser, professionUser,
  cardsContainerSelector,  gallerySelector,
  buttonAddCard, buttonEditProfile, validationVariables } from './scripts/utils/constants.js';
import UserInfo from './scripts/components/UserInfo.js';
import Section from './scripts/components/Section.js';

// Вызов функции отрисовки массива фотокарточек
const baseCardSection = new Section({ items: initialCards, renderer: (item) => renderCard(item, baseCardSection)}, cardsContainerSelector);

baseCardSection.renderAll();

// Вызов функции запуска сабмита формы
const popupEdition = new PopupWithForm(popupEditionSelector, handleFormEditionSubmit);
const popupNewCard = new PopupWithForm(popupNewCardSelector, handleNewElement);

Array.of(popupEdition, popupNewCard).forEach(popup => popup.setEventListeners());

// Определение нового экземпляра класса для попапа с увличенной фотокарточкой и вызов функции навешивания всех слушателей на карточку
const popupPhoto = new PopupWithImage(popupPhotoSelector);
popupPhoto.setEventListeners();

// Вызов функции запуска валидации формы
const formEditionValidator = new FormValidator(validationVariables, formEditionSelector);
const formNewCardValidator = new FormValidator(validationVariables, formNewCardSelector);

Array.of(formEditionValidator, formNewCardValidator).forEach(validator => validator.enableValidation());

// Запуск отображения данных пользователя со страницы в попап и сохранение при редактировании
const userInfo = new UserInfo({ name: nameUser, profession: professionUser });

// Функция, создающая новый экземпляр класса для фотокарточки
function getCardElement(item) {
  const newCard = new Card(item, gallerySelector, handleCardClick);
  return newCard.generateCard();
}

// Функция, вставляющая фотокарточку в разметку
function renderCard(item, cardSection) {
  const cardElement = getCardElement(item);
  cardSection.addItem(cardElement);
}

// Функция, отвечющая за редактирование информации
function handleFormEditionSubmit(inputValues, evt) {
    evt.preventDefault();
    userInfo.setUserInfo(inputValues);

    popupEdition.close();
};

// Функция добавления новой карточки пользователем
function handleNewElement(inputValues, evt) {
  evt.preventDefault();
  const data = [inputValues];

  const newCardSection = new Section({ items: data, renderer: (item) => renderCard(item, newCardSection)}, cardsContainerSelector);

  newCardSection.renderAll();

  popupNewCard.close();
};

// Запуск функции создания рабочего попапа с увеличенным изображением
function handleCardClick(data) {
  popupPhoto.open(data);
}

// Открытие и закрытие окна редактирования профиля
buttonEditProfile.addEventListener('click', function(){
  formEditionValidator.removeErrorOpenForm();
  const info  = userInfo.getUserInfo();
  nameInput.value = info.name;
  professionInput.value = info.job;
  popupEdition.open();
});

// Открытие и закрытие окна добавления новых фотографий
buttonAddCard.addEventListener('click', function(){
  formNewCardValidator.removeErrorOpenForm();
  popupNewCard.open();
});

