export default class Apitest {
  constructor() {}

  getCardsAsync = async () => {
    let res = await fetch("https://mesto.nomoreparties.co/v1/cohort-66/cards", {
      headers: {
        authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
      },
    });
    return await res.json();
  };

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
    });
  };

  getWebInfoAsync = async () => {
    let response = await fetch(
      "https://nomoreparties.co/v1/cohort-66/users/me", {
        headers: {
          authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
        },
      }
    );

    return await response.json();
  };

  // переписать в promise.all

  sendNewCard = async (inputValues) => {
    let response = await fetch(
      "https://mesto.nomoreparties.co/v1/cohort-66/cards",{
        method: "POST",
        headers: {
          authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputValues.place,
          link: inputValues.link,
        }),
      }
    );
    return await response.json();
  };

  removeCard = (id) => {
    fetch("https://mesto.nomoreparties.co/v1/cohort-66/cards/" + id, {
      method: "DELETE",
      headers: {
        authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
      },
    });
  };

  toggleLikeCard = (cardId, isLiked) => {
    const method = isLiked ? "PUT" : "DELETE";
    fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
      },
    });
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
    });
  };
}

