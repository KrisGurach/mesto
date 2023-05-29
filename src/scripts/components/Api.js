import { renderLoading } from '../../pages/index.js'

export default class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
  }

  _getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getCards = () => {
    return fetch(
      this._url + "/cards", {
        headers: {
          authorization: this._token
        }
      }
    )
      .then((res) => this._getResponseData(res));
  }

  updateProfileData = (inputValues) => {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.profession
      })
    })
    .then((res) => res.ok ? Promise.resolve() : Promise.reject(`Ошибка: ${res.status}`));
  };

  getWebInfo = () => {
    return fetch(this._url + "/users/me", {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._getResponseData(res));
  };

  sendNewCard = (inputValues) => {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: inputValues.place,
        link: inputValues.link
      })
    })
      .then((res) => this._getResponseData(res));
  };

  removeCard = (id) => {
    fetch(this._url + "/cards/" + id, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
    .catch((err) => console.log(err));
  };

  toggleLikeCard = (cardId, isLiked) => {
    const method = isLiked ? "PUT" : "DELETE";

    fetch(this._url + `/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: this._token
      }
    })
    .catch((err) => console.log(err));
  };

  sendAvatar = (link) => {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: link
      })
    });
  };
}

