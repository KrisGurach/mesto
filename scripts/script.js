// Присвоим переменные найденным элементам (кнопка открытия окна редактироваия, кнопка закрытия окна редактирования)
const editButton = document.querySelector(".edit-button");
const closeButton = document.querySelector(".popup__close-button");

// Выберем непосредственно попап
const popup = document.querySelector(".popup");

//Выберем непосредственно форму редактрирования
const formElement = document.querySelector(".popup__form");

// Присвоем переменным текстовое значение, содержащееся в полях шапки профиля
const nameUser = document.querySelector(".profile__info-name");
const professionUser = document.querySelector(".profile__info-profession");

// Переменные для полей попапа
const nameInput = document.querySelector(".popup__fieldset_name");
const professionInput = document.querySelector(".popup__fieldset_profession");

// Функция, отвечающая за отображение текста профиля в полях попапа
function setPopUp(){
  nameInput.value = nameUser.textContent;
  professionInput.value = professionUser.textContent;
}

// Два происходящих события по клику пользователя (открытие и закрытие попапа)
editButton.addEventListener('click', function(){
  popup.classList.add("popup_opened");
  setPopUp();
});

closeButton.addEventListener('click', function(){
  popup.classList.remove("popup_opened");
});

// Функция, отвечющая за редактирование информации
function handleFormSubmit (evt) {
    evt.preventDefault();

    nameUser.textContent = nameInput.value;
    professionUser.textContent = professionInput.value;

    popup.classList.remove("popup_opened");
}

formElement.addEventListener('submit', handleFormSubmit);



// Функция постановки лайка
// let likeButtons = document.querySelectorAll(".element__like");

// likeButtons.forEach(button => button.addEventListener('click', function(){
//   button.classList.replace("element__like", "element__like_active")
// }));

