const icons = { rock: '✊', paper: '✋', scissors: '✌️' };
const options = ['rock', 'paper', 'scissors'];

// what each choice beats
const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

const score = { player: 0, draw: 0, computer: 0 };

const playerHand = document.getElementById('player-hand');
const computerHand = document.getElementById('computer-hand');
const message = document.getElementById('message');

function computerPick() {
  return options[Math.floor(Math.random() * options.length)];
}

function getResult(player, computer) {
  if (player === computer) return 'draw';
  return beats[player] === computer ? 'player' : 'computer';
}

function showHand(el, choice) {
  el.textContent = icons[choice];
  el.classList.remove('pop');
  void el.offsetWidth; // restart the animation
  el.classList.add('pop');
}

function updateScore() {
  document.getElementById('player-score').textContent = score.player;
  document.getElementById('draw-score').textContent = score.draw;
  document.getElementById('computer-score').textContent = score.computer;
}

function play(player) {
  const computer = computerPick();
  const result = getResult(player, computer);

  showHand(playerHand, player);
  showHand(computerHand, computer);

  score[result]++;
  updateScore();

  message.className = 'message';
  if (result === 'player') {
    message.textContent = `You win! ${player} beats ${computer}`;
    message.classList.add('win');
  } else if (result === 'computer') {
    message.textContent = `You lose! ${computer} beats ${player}`;
    message.classList.add('lose');
  } else {
    message.textContent = `It's a draw! You both picked ${player}`;
  }
}

document.querySelectorAll('.choice').forEach((btn) => {
  btn.addEventListener('click', () => play(btn.dataset.choice));
});

document.getElementById('reset').addEventListener('click', () => {
  score.player = score.draw = score.computer = 0;
  updateScore();
  playerHand.textContent = '?';
  computerHand.textContent = '?';
  message.className = 'message';
  message.textContent = 'Pick one to start';
});