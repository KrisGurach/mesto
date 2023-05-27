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
  cardsContainerSelector,  gallerySelector, avatar, buttonsSave,
  buttonAddCard, buttonEditProfile, buttonEditAvatar, validationVariables, myId } from '../scripts/utils/constants.js';

import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import Api from '../scripts/components/Api.js';

// Запуск отображения данных пользователя со страницы в попап и сохранение при редактировании
const userInfo = new UserInfo({ name: nameUser, profession: professionUser, avatar: avatar });

const api = new Api();

let cardSection = new Section({}, cardsContainerSelector);

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

function toggleLikeCard(id, isLiked) {
  api.toggleLikeCard(id, isLiked);
}

// Вызов функции отрисовки массива фотокарточек


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

// Функция, создающая новый экземпляр класса для фотокарточки
function getCardElement(item) {
  const newCard = new Card(item, gallerySelector, handleCardClick, openPopupRemoveCard, toggleLikeCard);

  return newCard.generateCard();
}

// Функция, отвечющая за редактирование информации
function handleFormEditionSubmit(inputValues, evt) {
    evt.preventDefault();

    userInfo.setUserInfo(inputValues);
    renderLoading(true);
    api.sendWebInfo(inputValues);

    popupEdition.close();
};

// Функция добавления новой карточки пользователем
async function handleNewElement(inputValues, evt) {
  evt.preventDefault();

  renderLoading(true);
  api.sendNewCard(inputValues)
    .then((cardInfo) => {
    inputValues.likes = cardInfo.likes;
    inputValues.id = cardInfo._id;
    inputValues.ownerId = myId;

    cardSection.addItem(getCardElement(inputValues));
  })
    .catch((err) => console.log(err));

  popupNewCard.close();
};

// Запуск функции создания рабочего попапа с увеличенным изображением
function handleCardClick(data) {
  popupPhoto.open(data);
}

function renderLoading(isLoading) {
  debugger;
  buttonsSave.forEach(b => b.textContent = isLoading ? 'Сохранение...' : 'Сохранить');
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










