// Поиск всех необходимых DOM-элементов
const popupEdition = document.querySelector(".popup_type_edition");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonCloseEdit = popupEdition.querySelector(".popup__close-button_type_edition");

const formEdition = document.querySelector(".popup__form_type_edition");
const nameInput = document.querySelector(".popup__fieldset_type_name");
const professionInput = document.querySelector(".popup__fieldset_type_profession");

const nameUser = document.querySelector(".profile__info-name");
const professionUser = document.querySelector(".profile__info-profession");

const popupNewCard = document.querySelector(".popup_type_new-card");

const buttonAddCard = document.querySelector(".profile__add-button");
const buttonCloseNewCard = popupNewCard.querySelector(".popup__close-button_type_new-card");

const formAddingElement = document.querySelector(".popup__form_type_new-card");

const popupPhoto = document.querySelector(".popup_type_photo");
const buttonClosePhoto = document.querySelector(".popup__close-button_type_photo");

// Общие функции открытия и закрытия
function openPopUp(popup){
  popup.classList.add("popup_opened");
};

function closePopUp(popup){
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

// Функция добавления новой карточки пользователем
function addElement(evt){
  evt.preventDefault();
  const newCard = {
      name: document.querySelector(".popup__fieldset_type_place").value,
      link: document.querySelector(".popup__fieldset_type_link").value
  };

  renderElement(newCard);
  closePopUp(popupNewCard);
};

// Функция создания элементов из массива и формирования новой карточки
function createElement(item) {
  const userGallery = document.querySelector("#gallery").content;
  const userElement = userGallery.querySelector(".element").cloneNode(true);

  const photo = userElement.querySelector(".element__photo");
  photo.src = item.link;
  userElement.querySelector(".element__place").textContent = item.name;

  // Добавление eventListener на кнопки
  const buttonLikeCard = userElement.querySelector(".element__like");
  const buttonRemoveCard = userElement.querySelector(".element__remove");

  buttonLikeCard.addEventListener('click', function(){
    buttonLikeCard.classList.toggle("element__like_active")
  });

  buttonRemoveCard.addEventListener('click', function(){
    const card = buttonRemoveCard.closest('.element');
    card.remove();
  });

  photo.addEventListener('click', function(){
    const caption = document.querySelector(".popup__figcaption");
    const scaleImage = document.querySelector(".popup__scale-image");
    const card = photo.closest(".element");
    scaleImage.src = photo.src;
    scaleImage.alt = card.innerText;
    caption.textContent = card.innerText;

    openPopUp(popupPhoto);
  });

  return userElement;
};

function renderElement(i) {
  const elements = document.querySelector(".elements");
  const newAddingCard = createElement(i);
  elements.prepend(newAddingCard);
};

initialCards.forEach(renderElement);

// Сохранение информации при нажатии кнопки "сохранить" у окон редактирования профиля и добавления новых фотографий
formEdition.addEventListener('submit', handleFormEditionSubmit);
formAddingElement.addEventListener('submit', addElement);

// Открытие и закрытие окна редактирования профиля
buttonEditProfile.addEventListener('click', function(){
  setPopUpEdit();
  openPopUp(popupEdition);
});

buttonCloseEdit.addEventListener('click', function(){
  closePopUp(popupEdition);
});

// Открытие и закрытие окна добавления новых фотографий
buttonAddCard.addEventListener('click', function(){
  openPopUp(popupNewCard);
});

buttonCloseNewCard.addEventListener('click', function() {
  closePopUp(popupNewCard);
});

// Открытие и закрытие окна увеличенной фотографии
buttonClosePhoto.addEventListener('click', function(){
  closePopUp(popupPhoto);
});
