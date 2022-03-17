import { initialize, turnAllCards, getTimerId as sendTimerId } from "./card.js";

let gameBoard = document.getElementById("gameBoard");
let gameTimer = document.getElementById("countDownTimer");
let gameBtn = document.getElementById("gameBtn");
let timerId;
// start and restart's game when clicked
gameBtn.addEventListener("click", () => {
  if (gameBtn.classList.contains("start-game")) {
    gameBtn.classList.remove("start-game");
    gameBtn.classList.add("restart-game");
    gameBtn.innerHTML = "Restart Game";
    gameBoard.classList.remove("overlay");
    initialize();
    startTimer();
    sendTimerId(timerId);
  } else {
    clearInterval(timerId);
    if (!gameBoard.classList.contains("overlay")) {
      gameBoard.classList.add("overlay");
    }
    gameBtn.classList.add("start-game");
    gameBtn.classList.remove("restart-game");
    gameBtn.innerHTML = "Start Game";
  }
});
// start timer
function startTimer() {
  let timer = { min: 0, sec: 0 };
  gameTimer.innerHTML = "00:00";
  timerId = setInterval(() => {
    // timer logic
    if (timer.sec < 60) {
      ++timer.sec;
    } else {
      ++timer.min;
      timer.sec = 0;
    }
    // timer display
    if (timer.min < 10) {
      if (timer.sec < 10) {
        gameTimer.innerHTML = "0" + timer.min + ":" + "0" + timer.sec;
      } else {
        gameTimer.innerHTML = "0" + timer.min + ":" + timer.sec;
      }
    } else {
      if (timer.sec < 10) {
        gameTimer.innerHTML = timer.min + ":" + "0" + timer.sec;
      } else {
        gameTimer.innerHTML = timer.min + ":" + timer.sec;
      }
    }
  }, 1000);
}
