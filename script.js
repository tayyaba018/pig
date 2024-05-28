"use strict";

const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const addCurrent = document.getElementById("current--0");
const switchCurrent = document.getElementById("current--1");
const rollingDice = document.querySelector(".btn--roll");
const holdScore = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// starting condition
let score, currentScore, activePlayer, playing;

// switch function
  const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

const init = () => {
  diceEl.classList.add("hidden");
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  addCurrent.textContent = 0;
  switchCurrent.textContent = 0;
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
};

init();
rollingDice.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // if not 1 then add to the player 1 current score
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdScore.addEventListener("click", function () {
  if (playing) {
    console.log(score[activePlayer]);
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =score[activePlayer];
    switchPlayer();

    if (score[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");

      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    }
  }
});

        newGame.addEventListener("click", init);
