export default class Apitest {
  constructor() {}

  getCards = () => {
    const a = [];
    fetch("https://mesto.nomoreparties.co/v1/cohort-66/cards", {
      headers: {
        authorization: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36",
      },
    })
    .then((res) => res.json())
    .then((cards) => {
      cards.forEach((card) => {
        const b = {};
        b.place = card.name;
        b.link = card.link;
        a.push(b);
      });
      return a;
    });
  }
}
