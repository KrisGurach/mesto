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
  likeSelector, likeActive,
  buttonAddCard, buttonEditProfile, buttonEditAvatar, validationVariables, myId } from '../scripts/utils/constants.js';

import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import Apitest from '../scripts/components/apitest';

const api = new Apitest();
const getCards = async () => {
  return await api.getCardsAsync();
}

const webCards = await getCards();

let initialCards = [];
webCards.forEach(webCard => {
    let b = {};
    b.place = webCard.name;
    b.link = webCard.link;
    b.id = webCard._id;

    b.likes = webCard.likes;
    b.isLikeOwner = webCard.likes.some(like => like._id === myId);

    b.ownerId = webCard.owner._id;
    initialCards.push(b);
})

// Вызов функции отрисовки массива фотокарточек
const cardSection = new Section({ items: initialCards, renderer: (item) => getCardElement(item)}, cardsContainerSelector);

const cardElements = cardSection.renderAll();
cardElements.forEach(cardElement => cardSection.addItem(cardElement));

// Попап удаления карточки без формы
const popupRemoveCard = new PopupWithRemove(popupRemoveCardSelector, handleRemoveCard);

function openPopupRemoveCard(card, id) {
  popupRemoveCard.open();
  popupRemoveCard.setEventListeners(card, id);
}

function handleRemoveCard(card, id) {
  api.removeCard(id);
  card.remove();
  card = null;
}


// Вызов функции запуска сабмита формы
const popupEdition = new PopupWithForm(popupEditionSelector, handleFormEditionSubmit);
const popupNewCard = new PopupWithForm(popupNewCardSelector, handleNewElement);
const popupEditionAvatar = new PopupWithForm(popupEditAvatarSelector, handleEditAvatar);

function handleEditAvatar(inputValues, evt) {
  evt.preventDefault();

  avatar.src = inputValues.avatar;
  api.sendAvatar(inputValues.avatar);

  popupEditionAvatar.close();
};

Array.of(popupEdition, popupNewCard, popupEditionAvatar).forEach(popup => popup.setEventListeners());

// Определение нового экземпляра класса для попапа с увeличенной фотокарточкой и вызов функции навешивания всех слушателей на карточку
const popupPhoto = new PopupWithImage(popupPhotoSelector);
popupPhoto.setEventListeners();

// Вызов функции запуска валидации формы
const formEditionValidator = new FormValidator(validationVariables, formEditionSelector);
const formNewCardValidator = new FormValidator(validationVariables, formNewCardSelector);
const formEditAvatarValidator = new FormValidator(validationVariables, formEditAvatarSelector)

Array.of(formEditionValidator, formNewCardValidator, formEditAvatarValidator).forEach(validator => validator.enableValidation());

// Запуск отображения данных пользователя со страницы в попап и сохранение при редактировании
const userInfo = new UserInfo({ name: nameUser, profession: professionUser, avatar: avatar });

// Функция, создающая новый экземпляр класса для фотокарточки
function getCardElement(item) {
  const newCard = new Card(item, gallerySelector, handleCardClick, openPopupRemoveCard);

  return newCard.generateCard();
}

// Функция, отвечющая за редактирование информации
function handleFormEditionSubmit(inputValues, evt) {
    evt.preventDefault();
    userInfo.setUserInfo(inputValues);
    api.sendWebInfo(inputValues);

    popupEdition.close();
};

// Функция добавления новой карточки пользователем
function handleNewElement(inputValues, evt) {
  evt.preventDefault();
  inputValues.likes = [];
  inputValues.ownerId = myId;
  cardSection.addItem(getCardElement(inputValues));
  api.sendNewCard(inputValues);

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

// Открытие и закрытие окна редактирования аватара
buttonEditAvatar.addEventListener('click', function(){
  formEditAvatarValidator.removeErrorOpenForm();
  popupEditionAvatar.open();
})


const getWebInfo = async () => {
  return await api.getWebInfoAsync();
}

const webInfo = await getWebInfo();
userInfo.setWebUserInfo(webInfo);






