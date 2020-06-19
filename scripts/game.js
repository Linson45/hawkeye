
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  console.log('this', this.dataset);
  if (lockBoard) {
    return;
  };
  if (this === firstCard) {
    return;
  };

  this.classList.add('flip');
  
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
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.add('blackout');
  secondCard.classList.add('blackout');
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}



const dataset = [
  {
    image: 'aurelia',
    path: 'img/aurelia.svg',
  },
  {
    image: 'vue',
    path: 'img/vue.svg',
  },
  {
    image: 'angular',
    path: 'img/angular.svg',
  },
  {
    image: 'ember',
    path: 'img/ember.svg',
  },
  {
    image: 'backbone',
    path: 'img/backbone.svg',
  },
  {
    image: 'react',
    path: 'img/react.svg',
  },
  {
    image: 'aurelia',
    path: 'img/aurelia.svg',
  },
  {
    image: 'vue',
    path: 'img/vue.svg',
  },
  {
    image: 'angular',
    path: 'img/angular.svg',
  },
  {
    image: 'ember',
    path: 'img/ember.svg',
  },
  {
    image: 'backbone',
    path: 'img/backbone.svg',
  },
  {
    image: 'react',
    path: 'img/react.svg',
  },
  {
    image: 'backbone',
    path: 'img/backbone.svg',
  },
  {
    image: 'react',
    path: 'img/react.svg',
  },
  {
    image: 'backbone',
    path: 'img/backbone.svg',
  },
  {
    image: 'react',
    path: 'img/react.svg',
  }
];

const datasetLimit = 16;

const gameContainer = document.getElementById('gameContainer');

for (let i = 0; i < 16; i++) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  div.classList.add('memory-card');
  img.classList.add('front-face');
  div.dataset.framework = dataset[i].image;
  img.src = dataset[i].path;
  div.appendChild(img);
  gameContainer.appendChild(div);
}
console.log('game container', gameContainer)

const cards = document.querySelectorAll('.memory-card');

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

