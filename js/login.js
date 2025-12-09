const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');

let selectedDifficulty = 'easy';

const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
}

const selectDifficulty = (event) => {
  // Remove active de todos
  difficultyBtns.forEach(btn => btn.classList.remove('active'));
  
  // Adiciona active no clicado
  event.target.classList.add('active');
  
  // Salva a dificuldade
  selectedDifficulty = event.target.getAttribute('data-difficulty');
}

const handleSubmit = (event) => {
  event.preventDefault();
  
  localStorage.setItem('player', input.value);
  localStorage.setItem('difficulty', selectedDifficulty);
  window.location = 'pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);

// Adiciona evento aos botões de dificuldade
difficultyBtns.forEach(btn => {
  btn.addEventListener('click', selectDifficulty);
});
