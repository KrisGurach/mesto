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
let currentUserId;

Promise.all([api.getWebInfo(), api.getCards()])
  .then(([webInfo, webCards]) => {
    currentUserId = webInfo._id;

    userInfo.setWebUserInfo(webInfo);

    const initialCards = webCards.map((webCard) => prepareCardData(webCard));

    cardSection.renderAll(initialCards);
  })
  .catch((err) => console.log(err));

// Функция, добавляющая готовую карточку в разметку
function renderCard(data) {
  cardSection.addItem(getCardElement(data));
}

// Функция, обрабатывающая массив информации об одной карточки с сервера
function prepareCardData(webCard) {
  let cardInfo = {};

  cardInfo.place = webCard.name;
  cardInfo.link = webCard.link;
  cardInfo.likes = webCard.likes;
  cardInfo.isLikeOwner = webCard.likes.some((like) => like._id === currentUserId);
  cardInfo.ownerId = webCard.owner._id;
  cardInfo.currentUserId = currentUserId;
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
  card.disableLike();
  api.toggleLikeCard(id, isLiked)
    .then(() => card.updateLike(isLiked))
    .catch((err) => console.log(err))
    .finally(() => card.enableLike());
}

// Функция, отвечющая за редактирование информации  и отправки данных на сервер
function handleFormEditionSubmit(inputValues) {
  popupEdition.renderLoading(true);
  api.updateProfileData(inputValues)
    .then(() => {
      userInfo.setUserInfo(inputValues);
      popupEdition.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupEdition.renderLoading(false));
};

// Функция добавления новой карточки пользователем и отправки данных на сервер
function handleNewElement(inputValues) {
  popupNewCard.renderLoading(true);
  api.sendNewCard(inputValues)
    .then((webCard) => {
      renderCard(prepareCardData(webCard));
      popupNewCard.close();
  })
    .catch((err) => console.log(err))
    .finally(() => popupNewCard.renderLoading(false));
};

// Функция изменения аватара и отправки данных на сервер
function handleEditAvatar(inputValues) {
  popupEditionAvatar.renderLoading(true);
  api.sendAvatar(inputValues.avatar)
    .then(() => {
      userInfo.setAvatar(inputValues.avatar);
      popupEditionAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupEditionAvatar.renderLoading(false));
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





