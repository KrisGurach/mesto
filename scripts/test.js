import { Card } from './Card.js';
import { initialCards } from './cards.js';

initialCards.forEach((card) => {
  const newCard = new Card(card.name, card.link);
  newCard.generateCard();
  document.querySelector('.elements').prepend(newCard._cardElement);
});

