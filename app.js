"use strict";

// Selecting Elements
const score0EL = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0EL.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("active--player");
  player1El.classList.remove("active--player");
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Make Rolling Funsitonality
init();

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; // Generate a random dice number

    diceEl.classList.remove("hidden"); // Display dice

    // Indi ise dicedan aldigimiz random eded vasitesi ile imgdeki src ni deyisirik
    diceEl.src = `dice-${dice}.png`;

    // If dice = 1 switch to next player
    if (dice !== 1) {
      currentScore += dice; //currentScore = currentScore + dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active players score
    scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player score is >=100: finish the game
    if (scores[activePlayer] >= 20) {
      //finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
