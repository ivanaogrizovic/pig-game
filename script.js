'use strict';

const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');

const currentScoreEl0 = document.getElementById('current--0');
const currentScoreEl1 = document.getElementById('current--1');

const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');

const diceElement = document.querySelector('.dice');
const newButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

var currentScore = 0;
var activePlayer = 0;
var scores = [0, 0];
var playing = true;

scoreEl0.textContent = 0;
scoreEl1.textContent = 0;

diceElement.classList.add('hidden');

this.rollDice = function () {
  if (playing) {
    diceElement.classList.remove('hidden');
    var dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceElement.src = 'dice-' + dice + '.png';
    if (dice != 1) {
      handleScore(dice, 'add');
    } else {
      handleScore(dice, 'lost');
    }
  }
};

this.handleScore = function (dice, value) {
  switch (value) {
    case 'add':
      currentScore += dice;
      document.getElementById('current--' + activePlayer).textContent =
        currentScore;
      break;
    case 'lost':
      currentScore = 0;
      document.getElementById('current--' + activePlayer).textContent =
        currentScore;
      switchPlayer();
      break;
  }
};

this.switchPlayer = function () {
  currentScore = 0;
  document.getElementById('current--' + activePlayer).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElement0.classList.toggle('player--active');
  playerElement1.classList.toggle('player--active');
};

this.holdScore = function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById('score--' + activePlayer).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      declareWinner();
    } else {
      switchPlayer();
    }
  }
};

this.declareWinner = function () {
  playing = false;
  diceElement.classList.add('hidden');
  document
    .querySelector('.player--' + activePlayer)
    .classList.add('player--winner');
};

this.newGame = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;

  playerElement1.classList.toggle('player--active');
  document
    .querySelector('.player--' + activePlayer)
    .classList.remove('player--winner');
  playerElement0.classList.add('player--active');
};

newButton.addEventListener('click', newGame);
rollButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', holdScore);
