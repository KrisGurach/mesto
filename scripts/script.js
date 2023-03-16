// Присвоим переменные найденным элементам (кнопка открытия окна редактироваия, кнопка закрытия окна редактирования)
const editButton = document.querySelector(".profile__edit-button");
const closeButtonEdit = document.querySelector(".popup__close-button_edit");

const popupEdition = document.querySelector(".popup_edition");

const formElement = document.querySelector(".popup__form");

// Присвоем переменным текстовое значение, содержащееся в полях шапки профиля
const nameUser = document.querySelector(".profile__info-name");
const professionUser = document.querySelector(".profile__info-profession");

// Переменные для полей попапа
const nameInput = document.querySelector(".popup__fieldset_type_name");
const professionInput = document.querySelector(".popup__fieldset_type_profession");

// Функция, отвечающая за отображение текста профиля в полях попапа, открытие и закрытие попапа
function setPopUpEdit(){
  nameInput.value = nameUser.textContent;
  professionInput.value = professionUser.textContent;
}

function openPopUpEdit(){
  popupEdition.classList.add("popup_opened");
}

function closePopUpEdit(){
  popupEdition.classList.remove("popup_opened");
}

// Функция, отвечющая за редактирование информации
function handleFormSubmit (evt) {
    evt.preventDefault();

    nameUser.textContent = nameInput.value;
    professionUser.textContent = professionInput.value;

    closePopUpEdit();
}

formElement.addEventListener('submit', handleFormSubmit);

// Два происходящих события по клику пользователя (открытие и закрытие попапа)
editButton.addEventListener('click', function(){
  setPopUpEdit();
  openPopUpEdit();
});

closeButtonEdit.addEventListener('click', closePopUpEdit);

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

  let link = item.link;

  userElement.querySelector(".element__photo").src = link;
  userElement.querySelector(".element__place").textContent = item.name;

  elements.prepend(userElement);
};

initialCards.forEach(createElement);

// Открытие и закрытие попапа добавления новых фотографий и ее сохранение
const popupNewCard = document.querySelector(".popup_new-card");
const addButton = document.querySelector(".profile__add-button");
const closeButtonNewCard = document.querySelector(".popup__close-button_new-card");

function openPopUpNewCard(){
  popupNewCard.classList.add("popup_opened");
}

function closePopUpNewCard(){
  popupNewCard.classList.remove("popup_opened");
}

addButton.addEventListener('click', function(){
  openPopUpNewCard();
});

closeButtonNewCard.addEventListener('click', closePopUpNewCard);

// Функция добавления новой карточки пользователем
const cardAddingElement = document.querySelector(".popup__form_new-card");

function addElement(evt){
  evt.preventDefault();
  const newCard = {
      name: document.querySelector(".popup__fieldset_type_place").value,
      link: document.querySelector(".popup__fieldset_type_link").value
  };

  createElement(newCard);
  closePopUpNewCard();
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


