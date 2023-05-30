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
  buttonAddCard, buttonEditProfile, buttonEditAvatar, validationVariables, config } from '../scripts/utils/constants.js';

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
popupRemoveCard.setEventListeners();

// Вызов функции запуска валидации формы
const formEditionValidator = new FormValidator(validationVariables, formEditionSelector);
const formNewCardValidator = new FormValidator(validationVariables, formNewCardSelector);
const formEditAvatarValidator = new FormValidator(validationVariables, formEditAvatarSelector)

Array.of(formEditionValidator, formNewCardValidator, formEditAvatarValidator).forEach(validator => validator.enableValidation());

// Создание перезаписывающегося экземпляра класса добавления карточек
const cardSection = new Section((item) => renderCard(item), cardsContainerSelector);

// Создание экземпляра класса, описывающего запросы к серверу
const api = new Api(config);

// Обработка промисов по загрузки изначальных карточек и информации с сервера на страницу
let myId;

Promise.all([api.getWebInfo(), api.getCards()])
  .then(([webInfo, webCards]) => {
    myId = webInfo._id;

    userInfo.setWebUserInfo(webInfo);

    const initialCards = webCards.map((webCard) => handleWebCard(webCard, myId));

    cardSection.renderAll(initialCards);
  })
  .catch((err) => console.log(err));

// Функция, добавляющая готовую карточку в разметку
function renderCard(data) {
  cardSection.addItem(getCardElement(data));
}

// Функция, обрабатывающая массив информации об одной карточки с сервера
function handleWebCard(webCard, myId) {
  let cardInfo = {};

  cardInfo.place = webCard.name;
  cardInfo.link = webCard.link;
  cardInfo.likes = webCard.likes;
  cardInfo.isLikeOwner = webCard.likes.some((like) => like._id === myId);
  cardInfo.ownerId = webCard.owner._id;
  cardInfo.myId = myId;
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
  popupRemoveCard.open(card, id);
}

// Функция, отправляющая информацию о смене состояния лайка карточки на сервер
function toggleLikeCard(card, id, isLiked) {
  api.toggleLikeCard(id, isLiked)
    .then(card.updateLike(isLiked))
    .catch((err) => console.log(err));
}

// Функция, отвечющая за редактирование информации  и отправки данных на сервер
function handleFormEditionSubmit(inputValues, buttonSave) {
  popupEdition.renderLoading(true, buttonSave);
  api.updateProfileData(inputValues, buttonSave)
    .then(() => {
      userInfo.setUserInfo(inputValues);
      popupEdition.close();
    })
    .catch((err) => console.log(err))
    .finally(popupEdition.renderLoading(false, buttonSave));
};

// Функция добавления новой карточки пользователем и отправки данных на сервер
function handleNewElement(inputValues, buttonSave) {
  popupNewCard.renderLoading(true, buttonSave);
  api.sendNewCard(inputValues, buttonSave)
    .then((cardInfo) => {
      inputValues.likes = cardInfo.likes;
      inputValues.id = cardInfo._id;
      inputValues.ownerId = cardInfo.owner._id;
      inputValues.myId = myId;

    renderCard(inputValues);
    popupNewCard.close();
  })
    .catch((err) => console.log(err))
    .finally(popupNewCard.renderLoading(false, buttonSave));
};

// Функция изменения аватара и отправки данных на сервер
function handleEditAvatar(inputValues, buttonSave) {
  popupEditionAvatar.renderLoading(true, buttonSave);
  api.sendAvatar(inputValues.avatar, buttonSave)
    .then(() => {
      avatar.src = inputValues.avatar;
      popupEditionAvatar.close()
    })
    .catch((err) => console.log(err))
    .finally(popupEditionAvatar.renderLoading(false, buttonSave));
};

// Функция удаления с сервера и разметки карточки
function handleRemoveCard(card, id) {
  api.removeCard(id)
    .then(() => {
      card.deleteCard();
      popupRemoveCard.close();
    })
    .catch((err) => console.log(err));
}

// Открытие и закрытие окна редактирования профиля
buttonEditProfile.addEventListener('click', function(){
  formEditionValidator.removeErrors();

  const info  = userInfo.getUserInfo();
  nameInput.value = info.name;
  professionInput.value = info.job;

  popupEdition.open();
});

// Открытие и закрытие окна добавления новых фотографий
buttonAddCard.addEventListener('click', function(){
  formNewCardValidator.removeErrors();
  popupNewCard.open();
});

// Открытие и закрытие окна редактирования аватара
buttonEditAvatar.addEventListener('click', function(){
  formEditAvatarValidator.removeErrors();
  popupEditionAvatar.open();
})





