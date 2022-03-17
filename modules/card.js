import { shuffleArray } from "./util.js";

const MAX_CARDS_TURNED = 2;
let arrayOfCards = [];
let turnedCards = 0;
let signArray = [];
let turnedCardPos;
let timerId;

// event listners for card clcks
Array.from(document.getElementsByClassName("card")).forEach((card) => {
  card.addEventListener("click", turnCard);
});
// initialize game variables and draws card sign
export function initialize() {
  resetGame();
  let randomSignArray = shuffleArray(signArray);

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    card.childNodes[3].innerHTML = randomSignArray[card.id];
    arrayOfCards.push({
      card: card,
      sign: randomSignArray[card.id],
      side: false,
      aliasFound: false,
    });
  });
}
// turn card when clicked and handles logic of game
function turnCard() {
  if (!arrayOfCards[Number(this.id)].side) {
    if (
      turnedCards === 1 &&
      arrayOfCards[turnedCardPos].sign === arrayOfCards[Number(this.id)].sign
    ) {
      arrayOfCards[turnedCardPos].aliasFound = true;
      arrayOfCards[Number(this.id)].aliasFound = true;
    } else if (turnedCards === MAX_CARDS_TURNED) {
      turnAllCards(false);
      turnedCards = 0;
    }

    turnedCardPos = Number(this.id);
    arrayOfCards[turnedCardPos].side = true;
    ++turnedCards;
    arrayOfCards[turnedCardPos].card.style.transform = "rotateY(180deg)";
    checkWin();
  }
}
// turns all cards face up if they dont have theyre aliasses found, if it recives a param of value true, it rotates all cards face up
export function turnAllCards(gameEnded = false) {
  arrayOfCards.forEach((cardObj) => {
    if ((cardObj.side && !cardObj.aliasFound) || gameEnded) {
      cardObj.card.style.transform = "rotateY(360deg)"; /// qwestion for wellcode, why dose it take 360 deg to turn 180 deg ?
      cardObj.side = false;
    }
  });
}
// check for win, add overlay and stop timer
function checkWin() {
  let check = arrayOfCards.every((cardObj) => {
    return cardObj.aliasFound;
  });
  if (check) {
    document.getElementById("gameBoard").classList.add("overlay");
    clearInterval(timerId);
  }
}
// resets all variables
function resetGame() {
  turnAllCards(true);
  signArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
  arrayOfCards = [];
  turnedCards = 0;
}
// gets the countdown timer id in local variable
export function getTimerId(intervalId) {
  timerId = intervalId;
}
