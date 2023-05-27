// Импорт css-файла
import './index.css';

// Импорт модулей
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from  '../scripts/components/PopupWithImage.js';
import PopupWithRemove from '../scripts/components/PopupWithRemove';

import { formEditionSelector, formNewCardSelector, formEditAvatarSelector,
  popupEditionSelector, popupNewCardSelector, popupPhotoSelector, popupEditAvatarSelector, popupRemoveCardSelector,
  nameInput, professionInput, nameUser, professionUser,
  cardsContainerSelector,  gallerySelector, avatar,
  buttonAddCard, buttonEditProfile, buttonEditAvatar, validationVariables, myId } from '../scripts/utils/constants.js';

import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import Api from '../scripts/components/Api.js';

// Запуск отображения данных пользователя со страницы в попап и сохранение при редактировании
const userInfo = new UserInfo({ name: nameUser, profession: professionUser, avatar: avatar });

// Вызов функции запуска отправки формы
const popupEdition = new PopupWithForm(popupEditionSelector, handleFormEditionSubmit);
const popupNewCard = new PopupWithForm(popupNewCardSelector, handleNewElement);
const popupEditionAvatar = new PopupWithForm(popupEditAvatarSelector, handleEditAvatar);

Array.of(popupEdition, popupNewCard, popupEditionAvatar).forEach(popup => popup.setEventListeners());

// Определение нового экземпляра класса для попапа с увeличенной фотокарточкой и вызов функции навешивания всех слушателей на карточку
const popupPhoto = new PopupWithImage(popupPhotoSelector);
popupPhoto.setEventListeners();

// Вызов функции удаления карточки
const popupRemoveCard = new PopupWithRemove(popupRemoveCardSelector, handleRemoveCard);

// Вызов функции запуска валидации формы
const formEditionValidator = new FormValidator(validationVariables, formEditionSelector);
const formNewCardValidator = new FormValidator(validationVariables, formNewCardSelector);
const formEditAvatarValidator = new FormValidator(validationVariables, formEditAvatarSelector)

Array.of(formEditionValidator, formNewCardValidator, formEditAvatarValidator).forEach(validator => validator.enableValidation());

// Создание перезаписывающегося экземпляра класса добавления карточек
let cardSection = new Section({}, cardsContainerSelector);

// Создание экземпляра класса, описывающего запросы к серверу
const api = new Api();

// Обработка промисов по загрузки изначальных карточек и информации с сервера на страницу
Promise.all([api.getWebInfo(), api.getCards()])
  .then((results) => {
    const webInfo = results[0];
    const webCards = results[1];

    userInfo.setWebUserInfo(webInfo);

    let initialCards = [];

    webCards.forEach((webCard) => {
      const cardInfo = handleWebCard(webCard);
      initialCards.push(cardInfo);
    });

    cardSection = new Section({ items: initialCards, renderer: (item) => getCardElement(item) }, cardsContainerSelector);

    const cardElements = cardSection.renderAll();
    cardElements.forEach((cardElement) => cardSection.addItem(cardElement));
  })
  .catch((err) => console.log(err));

// Функция, обрабатывающая массив информации об одной карточки с сервера
function handleWebCard(webCard) {
  let cardInfo = {};

  cardInfo.place = webCard.name;
  cardInfo.link = webCard.link;
  cardInfo.likes = webCard.likes;
  cardInfo.isLikeOwner = webCard.likes.some((like) => like._id === myId);
  cardInfo.ownerId = webCard.owner._id;
  cardInfo.id = webCard._id;

  return cardInfo;
}

// Функция, создающая новый экземпляр класса для фотокарточки
function getCardElement(item) {
  const newCard = new Card(item, gallerySelector, handleCardClick, openPopupRemoveCard, toggleLikeCard);

  return newCard.generateCard();
}

// Функция создания рабочего попапа с увеличенным изображением
function handleCardClick(data) {
  popupPhoto.open(data);
}

// Функция открытия попапа удаления карточки
function openPopupRemoveCard(card, id) {
  popupRemoveCard.open();
  popupRemoveCard.setEventListeners(card, id);
}

// Функция, отправляющая информацию о смене состояния лайка карточки на сервер
function toggleLikeCard(id, isLiked) {
  api.toggleLikeCard(id, isLiked);
}

// Функция, отвечющая за редактирование информации  и отправки данных на сервер
function handleFormEditionSubmit(inputValues, evt, buttonSave) {
    evt.preventDefault();

    userInfo.setUserInfo(inputValues);
    renderLoading(true, buttonSave);
    api.sendWebInfo(inputValues, buttonSave);

    popupEdition.close();
};

// Функция добавления новой карточки пользователем и отправки данных на сервер
function handleNewElement(inputValues, evt, buttonSave) {
  evt.preventDefault();

  renderLoading(true, buttonSave);
  api.sendNewCard(inputValues, buttonSave)
    .then((cardInfo) => {
    inputValues.likes = cardInfo.likes;
    inputValues.id = cardInfo._id;
    inputValues.ownerId = myId;

    cardSection.addItem(getCardElement(inputValues));
  })
    .catch((err) => console.log(err));

  popupNewCard.close();
};

// Функция изменения аватара и отправки данных на сервер
function handleEditAvatar(inputValues, evt, buttonSave) {
  evt.preventDefault();

  avatar.src = inputValues.avatar;
  renderLoading(true, buttonSave);
  api.sendAvatar(inputValues.avatar, buttonSave)

  popupEditionAvatar.close();
};

// Функция удаления с сервера и разметки карточки
function handleRemoveCard(card, id) {
  api.removeCard(id)
  card.remove();
  card = null;
}

// Функция отрисовывания ожидания загрузки
function renderLoading(isLoading, buttonSave) {
  buttonSave.textContent = isLoading ? 'Сохранение...' : buttonSave.value;
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

// Открытие и закрытие окна редактирования аватара
buttonEditAvatar.addEventListener('click', function(){
  formEditAvatarValidator.removeErrorOpenForm();
  popupEditionAvatar.open();
})



export  { renderLoading }




