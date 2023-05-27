import { renderLoading } from '../../pages/index.js'

export default class Api {
  getCards = () => {
    return fetch(
      "https://mesto.nomoreparties.co/v1/cohort-66/cards", {
        headers: {
          authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36"
        }
      }
    )
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => console.log(err));
  }

  sendWebInfo = (inputValues) => {
    fetch("https://mesto.nomoreparties.co/v1/cohort-66/users/me", {
      method: "PATCH",
      headers: {
        authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.profession,
      }),
    })
    .catch((err) => console.log(err))
    .finally(renderLoading(false));
  };

  getWebInfo = () => {
    return fetch("https://nomoreparties.co/v1/cohort-66/users/me", {
      headers: {
        authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
      },
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => console.log(err));
  };

  sendNewCard = (inputValues) => {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-66/cards", {
      method: "POST",
      headers: {
        authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValues.place,
        link: inputValues.link,
      }),
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => console.log(err))
      .finally(renderLoading(false));
  };

  removeCard = (id) => {
    fetch("https://mesto.nomoreparties.co/v1/cohort-66/cards/" + id, {
      method: "DELETE",
      headers: {
        authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
      },
    }).catch((err) => console.log(err));
  };

  toggleLikeCard = (cardId, isLiked) => {
    const method = isLiked ? "PUT" : "DELETE";
    fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
      },
    }).catch((err) => console.log(err));
  };

  sendAvatar = (link) => {
    fetch("https://mesto.nomoreparties.co/v1/cohort-66/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).catch((err) => console.log(err));
  };
}

