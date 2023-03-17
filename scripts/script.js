// Общие функции открытия и закрытия
function openPopUp(popup){
  popup.classList.add("popup_opened");
}

function closePopUp(popup){
  popup.classList.remove("popup_opened");
}

// Функция, отвечающая за отображение текста профиля в полях попапа
const nameInput = document.querySelector(".popup__fieldset_type_name");
const professionInput = document.querySelector(".popup__fieldset_type_profession");

const nameUser = document.querySelector(".profile__info-name");
const professionUser = document.querySelector(".profile__info-profession");

function setPopUpEdit(){
  nameInput.value = nameUser.textContent;
  professionInput.value = professionUser.textContent;
}

// Функция, отвечющая за редактирование информации
const formElement = document.querySelector(".popup__form");

function handleFormSubmit (evt) {
    evt.preventDefault();

    nameUser.textContent = nameInput.value;
    professionUser.textContent = professionInput.value;

    closePopUp(popupEdition);
}

formElement.addEventListener('submit', handleFormSubmit);

// Два происходящих события по клику пользователя (открытие и закрытие попапа)
const popupEdition = document.querySelector(".popup_edition");
const editButton = document.querySelector(".profile__edit-button");
const closeButtonEdit = popupEdition.querySelector(".popup__close-button_edit");

editButton.addEventListener('click', function(){
  setPopUpEdit();
  openPopUp(popupEdition);
});

closeButtonEdit.addEventListener('click', function(){
  closePopUp(popupEdition);
});

// Заполнение карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createElement(item) {
  const userGallery = document.querySelector("#gallery").content;
  const elements = document.querySelector(".elements");

  const userElement = userGallery.querySelector(".element").cloneNode(true);

  userElement.querySelector(".element__photo").src = item.link;
  userElement.querySelector(".element__place").textContent = item.name;

  elements.prepend(userElement);
};

initialCards.forEach(createElement);

// Открытие и закрытие попапа добавления новых фотографий и ее сохранение
const popupNewCard = document.querySelector(".popup_new-card");
const addButton = document.querySelector(".profile__add-button");
const closeButtonNewCard = popupNewCard.querySelector(".popup__close-button_new-card");

addButton.addEventListener('click', function(){
  openPopUp(popupNewCard);
});

closeButtonNewCard.addEventListener('click', function() {
  closePopUp(popupNewCard);
});

// Функция добавления новой карточки пользователем
const cardAddingElement = document.querySelector(".popup__form_new-card");

function addElement(evt){
  evt.preventDefault();
  const newCard = {
      name: document.querySelector(".popup__fieldset_type_place").value,
      link: document.querySelector(".popup__fieldset_type_link").value
  };

  createElement(newCard);
  closePopUp(popupNewCard);
}

cardAddingElement.addEventListener('submit', addElement);

// Функция постановки и удаления лайка
const likeButtons = document.querySelectorAll(".element__like");

likeButtons.forEach(button => button.addEventListener('click', function(){
  button.classList.toggle("element__like_active")
 }));

 // Удаление фотокарточки
const removeCardButtons = document.querySelectorAll(".element__remove");

removeCardButtons.forEach(button => button.addEventListener('click', function(){
  const card = button.closest('.element');
  card.remove();
 }));

// Открытие и закрытие увеличенной фотографии
const popupPhoto = document.querySelector(".popup_photo");
const photos = document.querySelectorAll(".element__photo");
const closeButtonPhoto = popupPhoto.querySelector(".popup__close-button_photo");

photos.forEach(photo => photo.addEventListener('click', function(){
  const caption = document.querySelector(".popup__figcaption");
  const scaleImage = document.querySelector(".popup__scale-image");
  const card = photo.closest(".element");
  scaleImage.src = photo.src;
  scaleImage.alt = card.innerText;
  caption.textContent = card.innerText;

  openPopUp(popupPhoto);
}));

closeButtonPhoto.addEventListener('click', function(){
  closePopUp(popupPhoto);
});


