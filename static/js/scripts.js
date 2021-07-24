// JavaScript Challenge 1: Age in Days

function ageInDays() {
  var birthYear = prompt("What year were you born in... friend?");
  var ageInDays = (2021 - birthYear) * 365;
  var h1 = document.createElement('h1');
  var textAns = document.createTextNode('You are ' +ageInDays+ ' days old.');
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(textAns);
  document.getElementById('flex-cont-result').appendChild(h1);
}

function reset() {
  document.getElementById('ageInDays').remove();
}

// JavaScript Challenge 2: Cat Generator

function generateCat() {
  var image = document.createElement('img');
  var div = document.getElementById('flex-cat-gen');
  image.src = "http://thecatapi.com/api/images/get?format=src&type=gif";
  div.appendChild(image);
}

// JavaScript Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  console.log('Computer Choice', botChoice);

  results = decideWinner(humanChoice, botChoice); // [0, 1] human lost, bot won
  console.log(results);

  message = finalMessage(results);
  console.log(message);

  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
    'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
    'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0},
  };
  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];
  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return {'message': 'You lost!', 'color': 'red'};
  } else if (yourScore === 0.5) {
    return {'message': 'You tied!', 'color': 'yellow'};
  } else {
    return {'message': 'You won!', 'color': 'green'};
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
  };
  // code to remove images
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var messageDiv = document.createElement('div');
  var botDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
  messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size: 60px; pading: 30px; '>" + finalMessage['message'] + "</h1>"
  botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

  document.getElementById('flex-cont-rps').appendChild(humanDiv);
  document.getElementById('flex-cont-rps').appendChild(messageDiv);
  document.getElementById('flex-cont-rps').appendChild(botDiv);
}

//JavaScript Challenge 4: Change the Color of All Buttons!
var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for (let i=0; i<all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === 'blue') {
    buttonsBlue();
  } else if (buttonThingy.value === 'green') {
    buttonsGreen();
  } else if (buttonThingy.value === 'reset') {
    buttonColorReset();
  } else if (buttonThingy.value === 'random') {
    randomColors();
  }
}

function buttonsBlue() {
  for (let i=0; i<all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-primary');
  }
}

function buttonsGreen() {
  for (let i=0; i<all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

function buttonColorReset() {
  for (let i=0; i<all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  let choices = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success']

  for (let i=0; i<all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

//JavaScript Challenge 5: Blackjack
let blackjackGame = {
  'you': {'scoreSpan': '#your-bj-result', 'div': '#your-box', 'score': 0},
  'dealer': {'scoreSpan': '#dealer-bj-result', 'div': '#dealer-box', 'score': 0},
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
  'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11]},
  'wins': 0,
  'losses': 0,
  'draws': 0,
  'isStand': false,
  'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

let card = randomCard();

document.querySelector('#bj-hit').addEventListener('click', blackjackHit);
document.querySelector('#bj-stand').addEventListener('click', blackjackStand);
document.querySelector('#bj-deal').addEventListener('click', blackjackDeal);

function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function updateScore(card, activePlayer) {
  if(card === 'A') {
  //If adding 11 keeps me below 21, add 11. Otherwise, add 1
    if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  }
  else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  }
  else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand() {
  blackjackGame['isStand'] = true;
  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }
  blackjackGame['turnsOver'] = true;
  let winner = computeWinner();
  showResult(winner);
}

// return who won and update -> wins losses, draws
function computeWinner() {
  let winner;
  if (YOU['score'] <= 21) {
  //Your score is higher than Dealer (or) Dealer Busts
    if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
      blackjackGame['wins']++;
      winner = YOU;
    }
    else if (YOU['score'] < DEALER['score']) {
      blackjackGame['losses']++;
      winner = DEALER;
    }
    else if (YOU['score'] === DEALER['score']) {
      blackjackGame['draws']++;
    }
  }
  //User Busts
  else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['losses']++;
    winner = DEALER;
  }
  // Both Bust
  else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws'];
  }
  console.log(blackjackGame);
  return winner;
}

function showResult(winner) {
  let message, messageColor;
  if (blackjackGame['turnsOver'] === true) {
    if (winner === YOU) {
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = 'You Won :)'
      messageColor = 'green';
      winSound.play();
    }
    else if (winner === DEALER) {
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = 'You Lost :('
      messageColor = 'red';
      lossSound.play();
    }
    else {
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'You Drew :|'
      messageColor = 'black';
    }
    document.querySelector('#bj-result').textContent = message;
    document.querySelector('#bj-result').style.color = messageColor;
  }
}

function blackjackDeal() {
  if (blackjackGame['turnsOver'] === true) {
    blackjackGame['isStand'] = false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i=0; i<yourImages.length; i++) {
      yourImages[i].remove();
    }
    for (i=0; i<dealerImages.length; i++) {
      dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-bj-result').textContent = 0;
    document.querySelector('#dealer-bj-result').textContent = 0;

    document.querySelector('#your-bj-result').style.color = '#ffffff';
    document.querySelector('#dealer-bj-result').style.color = '#ffffff';

    document.querySelector('#bj-result').textContent = "Let's Play";
    document.querySelector('#bj-result').style.color = 'black';
    blackjackGame['turnsOver'] = true;
  }
}
