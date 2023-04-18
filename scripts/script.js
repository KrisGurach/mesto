// Поиск всех необходимых DOM-элементов
const popups = document.querySelectorAll(".popup");
const popupEdition = document.querySelector(".popup_type_edition");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonCloseEdit = popupEdition.querySelector(".popup__close-button_type_edition");

const formEdition = document.querySelector(".popup__form_type_edition");
const formEditionInputs = formEdition.querySelectorAll(".popup__input");
const formEditionSaveButton = formEdition.querySelector(".popup__save-button");
const nameInput = document.querySelector(".popup__input_type_name");
const professionInput = document.querySelector(".popup__input_type_profession");

const nameUser = document.querySelector(".profile__info-name");
const professionUser = document.querySelector(".profile__info-profession");

const popupNewCard = document.querySelector(".popup_type_new-card");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputLink = document.querySelector(".popup__input_type_link");

const buttonAddCard = document.querySelector(".profile__add-button");
const buttonCloseNewCard = popupNewCard.querySelector(".popup__close-button_type_new-card");

const formAddingElement = document.querySelector(".popup__form_type_new-card");
const formAddingElementInputs = formAddingElement.querySelectorAll(".popup__input");
const formAddingElementSaveButton = formAddingElement.querySelector(".popup__save-button");

const userGallery = document.querySelector("#gallery").content;
const elements = document.querySelector(".elements");

const caption = document.querySelector(".popup__figcaption");
const scaleImage = document.querySelector(".popup__scale-image");

const popupPhoto = document.querySelector(".popup_type_photo");
const buttonClosePhoto = document.querySelector(".popup__close-button_type_photo");

// Общие функции открытия и закрытия
function openPopUp(popup){
  document.addEventListener('keydown', closeByEsc);
  popup.classList.add("popup_opened");
};

function closePopUp(popup){
  document.removeEventListener('keydown', closeByEsc);
  popup.classList.remove("popup_opened");
};

// Функция, отвечающая за отображение текста профиля в полях попапа
function setPopUpEdit(){
  nameInput.value = nameUser.textContent;
  professionInput.value = professionUser.textContent;
};

// Функция, отвечющая за редактирование информации
function handleFormEditionSubmit (evt) {
    evt.preventDefault();

    nameUser.textContent = nameInput.value;
    professionUser.textContent = professionInput.value;

    closePopUp(popupEdition);
};

//Код для рефакторинга ОТСЮДА И НИЖЕ. Функция добавления новой карточки пользователем
function addElement(evt) {
  evt.preventDefault();
  const newCard = {
      name: inputPlace.value,
      link: inputLink.value
  };


  generateCard(newCard);
  closePopUp(popupNewCard);
};

// // Функция создания элементов из массива и формирования новой карточки
// function createElement(item) {
//   const userElement = userGallery.querySelector(".element").cloneNode(true);

//   const photo = userElement.querySelector(".element__photo");
//   photo.src = item.link;
//   photo.alt = item.name;
//   userElement.querySelector(".element__place").textContent = item.name;

//   // Добавление eventListener на кнопки
//   const buttonLikeCard = userElement.querySelector(".element__like");
//   const buttonRemoveCard = userElement.querySelector(".element__remove");

//   buttonLikeCard.addEventListener('click', function(){
//     buttonLikeCard.classList.toggle("element__like_active")
//   });

//   buttonRemoveCard.addEventListener('click', () => userElement.remove());

//   photo.addEventListener('click', () => {
//     scaleImage.src = item.link;
//     scaleImage.alt = item.name;
//     caption.textContent = item.name;

//     openPopUp(popupPhoto);
//   });

//   return userElement;
// };

// function renderElement(i) {
//   const newAddingCard = createElement(i);
//   elements.prepend(newAddingCard);
// };

// initialCards.forEach(renderElement);
// // Код рефакторинга КОНЕЦ


// Сохранение информации при нажатии кнопки "сохранить" у окон редактирования профиля и добавления новых фотографий
   formEdition.addEventListener('submit', handleFormEditionSubmit);
   formAddingElement.addEventListener('submit', addElement);

// Открытие и закрытие окна редактирования профиля
buttonEditProfile.addEventListener('click', function(){
  removeErrorOpenForm(popupEdition);
  setPopUpEdit();
  toggleButtonState(formEditionInputs, formEditionSaveButton, validationVariables.saveButtonDisabledClass);
  openPopUp(popupEdition);
});

buttonCloseEdit.addEventListener('click', function(){
  closePopUp(popupEdition);
});

// Открытие и закрытие окна добавления новых фотографий
buttonAddCard.addEventListener('click', function(){
  formAddingElement.reset();
  removeErrorOpenForm(popupNewCard);
  toggleButtonState(formAddingElementInputs, formAddingElementSaveButton, validationVariables.saveButtonDisabledClass);
  openPopUp(popupNewCard);
});

buttonCloseNewCard.addEventListener('click', function() {
  closePopUp(popupNewCard);
});

// Закрытие окна увеличенной фотографии
buttonClosePhoto.addEventListener('click', function(){
  closePopUp(popupPhoto);
});

// Закрытие по клику на overlay
popups.forEach((popup) => {
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopUp(evt.target);
    }
  });
});

// Закрытие по кнопке Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpenedNow = document.querySelector(".popup_opened");
    closePopUp(popupOpenedNow);
  }
};

