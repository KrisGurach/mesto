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
const formEdition = document.querySelector(".popup__form_type_edition");

function handleFormEditionSubmit (evt) {
    evt.preventDefault();

    nameUser.textContent = nameInput.value;
    professionUser.textContent = professionInput.value;

    closePopUp(popupEdition);
}

formEdition.addEventListener('submit', handleFormEditionSubmit);

// Два происходящих события по клику пользователя (открытие и закрытие попапа)
const popupEdition = document.querySelector(".popup_type_edition");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonCloseEdit = popupEdition.querySelector(".popup__close-button_type_edition");

buttonEditProfile.addEventListener('click', function(){
  setPopUpEdit();
  openPopUp(popupEdition);
});

buttonCloseEdit.addEventListener('click', function(){
  closePopUp(popupEdition);
});



function createElement(item) {
  const userGallery = document.querySelector("#gallery").content;
  const userElement = userGallery.querySelector(".element").cloneNode(true);

  userElement.querySelector(".element__photo").src = item.link;
  userElement.querySelector(".element__place").textContent = item.name;

  return userElement;
};

function renderElement(i) {
  const elements = document.querySelector(".elements");
  const newAddingCard = createElement(i);
  elements.prepend(newAddingCard);
};

initialCards.forEach(renderElement);

// Открытие и закрытие попапа добавления новых фотографий и ее сохранение
const popupNewCard = document.querySelector(".popup_type_new-card");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonCloseNewCard = popupNewCard.querySelector(".popup__close-button_type_new-card");

buttonAddCard.addEventListener('click', function(){
  openPopUp(popupNewCard);
});

buttonCloseNewCard.addEventListener('click', function() {
  closePopUp(popupNewCard);
});

// Функция добавления новой карточки пользователем
const formAddingElement = document.querySelector(".popup__form_type_new-card");

function addElement(evt){
  evt.preventDefault();
  const newCard = {
      name: document.querySelector(".popup__fieldset_type_place").value,
      link: document.querySelector(".popup__fieldset_type_link").value
  };

  createElement(newCard);
  closePopUp(popupNewCard);
}

formAddingElement.addEventListener('submit', addElement);

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
const popupPhoto = document.querySelector(".popup_type_photo");
const photos = document.querySelectorAll(".element__photo");
const buttonClosePhoto = popupPhoto.querySelector(".popup__close-button_type_photo");

photos.forEach(photo => photo.addEventListener('click', function(){
  const caption = document.querySelector(".popup__figcaption");
  const scaleImage = document.querySelector(".popup__scale-image");
  const card = photo.closest(".element");
  scaleImage.src = photo.src;
  scaleImage.alt = card.innerText;
  caption.textContent = card.innerText;

  openPopUp(popupPhoto);
}));

buttonClosePhoto.addEventListener('click', function(){
  closePopUp(popupPhoto);
});


