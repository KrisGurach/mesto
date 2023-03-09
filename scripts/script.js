let editButton = document.querySelector(".edit-button");
let closeButton = document.querySelector(".popup__close-button");

let popup = document.querySelector(".popup");

let nameUser = document.querySelector(".profile__info-name").textContent;
let professionUser = document.querySelector(".profile__info-profession").textContent;

function setPopUp(){
  let nameInput = document.querySelector(".popup__fieldset_name");
  let professionInput = document.querySelector(".popup__fieldset_profession");

  nameInput.value = nameUser;
  professionInput.value = professionUser;
}

editButton.addEventListener('click', function(){
  popup.classList.add("popup_opened");
  setPopUp();
});

closeButton.addEventListener('click', function(){
  popup.classList.remove("popup_opened");
});


//let likeButtons = document.querySelectorAll(".element__like");

// likeButtons.forEach(button => button.addEventListener('click', function(){
//   button.classList.replace("element__like", "element__like_active")
// }));

