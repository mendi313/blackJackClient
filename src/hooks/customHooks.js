import axios from 'axios';

export function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}

export function handleResultMessage(playerSum, dealerSum) {
  let message = '';
  if (playerSum > 21) {
    message = 'You Lose!';
  } else if (dealerSum > 21) {
    message = 'You win!';
  }
  //both you and dealer <= 21
  else if (playerSum == dealerSum) {
    message = 'Tie!';
  } else if (playerSum > dealerSum) {
    message = 'You Win!';
  } else if (playerSum < dealerSum) {
    message = 'You Lose!';
  }
  return message;
}

export function checkAce(card) {
  if (card[0] == 'A') {
    return 1;
  }
  return 0;
}
export function getNewCard() {
  return axios.get(import.meta.env.VITE_BASE_URL + 'hit').then((result) => {
    return result.data;
  });
}
export function initDeck() {
  return axios.get(import.meta.env.VITE_BASE_URL);
}

export function getValue(card) {
  let data = card?.split('-'); // "4-C" -> ["4", "C"]
  let value = data[0];

  if (isNaN(value)) {
    //A J Q K
    if (value == 'A') {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}
