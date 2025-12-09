const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const characters = [
  "beth",
  "jerry",
  "jessica",
  "morty",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "summer",
  "meeseeks",
  "scroopy",
];

// Configurações de dificuldade
const difficultySettings = {
  easy: { pairs: 6, columns: 4 },
  medium: { pairs: 8, columns: 4 },
  hard: { pairs: 10, columns: 5 },
};

let currentDifficulty = localStorage.getItem("difficulty") || "easy";
let gameLoop = null;

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");
  const totalCards = difficultySettings[currentDifficulty].pairs * 2;

  if (disabledCards.length === totalCards) {
    clearInterval(gameLoop);
    alert(
      `Parabéns, ${spanPlayer.innerHTML}! Você conseguiu em ${timer.innerHTML} segundos!`
    );
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

const loadGame = () => {
  const settings = difficultySettings[currentDifficulty];
  const gameCharacters = characters.slice(0, settings.pairs);
  const duplicateCharacters = [...gameCharacters, ...gameCharacters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  // Ajusta o grid baseado na dificuldade
  grid.style.gridTemplateColumns = `repeat(${settings.columns}, 1fr)`;

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  gameLoop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

const restartGame = () => {
  // Para o timer
  clearInterval(gameLoop);

  // Limpa o grid
  grid.innerHTML = "";

  // Reseta variáveis
  firstCard = "";
  secondCard = "";
  timer.innerHTML = "0";

  // Reinicia o jogo
  startTimer();
  loadGame();
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  currentDifficulty = localStorage.getItem("difficulty") || "easy";
  startTimer();
  loadGame();
};
