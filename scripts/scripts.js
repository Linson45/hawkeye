let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  console.log("this", this.dataset);
  if (lockBoard) {
    return;
  }
  if (this === firstCard) {
    return;
  }

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.classList.add("blackout");
  secondCard.classList.add("blackout");
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

const dataset = [
  {
    image: "aurelia",
    path: "img/aurelia.svg",
  },
  {
    image: "vue",
    path: "img/vue.svg",
  },
  {
    image: "angular",
    path: "img/angular.svg",
  },
  {
    image: "ember",
    path: "img/ember.svg",
  },
  {
    image: "backbone",
    path: "img/backbone.svg",
  },
  {
    image: "react",
    path: "img/react.svg",
  },
];

const datasetLimit = 16;

const gameContainer = document.getElementById("gameContainer");
const timerContainer = document.getElementById("timerContainer");
const startContainer = document.getElementById("startContainer");
const resultContainer = document.getElementById("resultContainer");


let cards = document.querySelectorAll(".memory-card");


shuffle = () => {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * datasetLimit);
    // console.log('pos', randomPos)
    card.style.order = randomPos;
  });
};

gameTimeout = () => {
  gameContainer.style.display === "none";
  timerContainer.style.display === "none";
  startPanel();
}

createGamePanel = (length) => {
  let time=30;  
  const interval=setInterval(() => {
    timerContainer.innerHTML=--time;
    if(time===0){
      clearInterval(interval);
      gameTimeout();
    }  
  }, 1000);
  // setTimeout(() => {
  //   clearInterval(interval);
  //   gameTimeout();
  // }, 10000);
  
  startContainer.remove();
  // const extra = length - dataset.length;
  let data = [...dataset, ...dataset];
  while(data.length <= length) {
    const value = Math.floor(Math.random() * dataset.length);
    data.push(dataset[value]);
    data.push(dataset[value]);
  }
  for (let i = 0; i < length; i++) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.classList.add("memory-card");
    img.classList.add("front-face");
    div.dataset.framework = data[i].image;
    img.src = data[i].path;
    div.appendChild(img);
    gameContainer.appendChild(div);
  }
  gameContainer.classList.add("memory-game");
  cards = document.querySelectorAll(".memory-card");
  shuffle();
  cards.forEach((card) => card.addEventListener("click", flipCard));
  console.log("inside");
};

startPanel = () => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  div.classList.add("startButton");
  div.onclick = () => createGamePanel(datasetLimit);
  img.classList.add("startImage");
  img.src = 'img/play-button.svg';
  div.appendChild(img);
  startContainer.classList.add('memory-game');
  startContainer.appendChild(div);
}

startPanel();

// createGamePanel(datasetLimit);

console.log("game container", gameContainer);

