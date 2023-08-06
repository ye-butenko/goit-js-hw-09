const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

//якщо немає інтервалу - запускаємо
btnStart.addEventListener('click', () => {
  if (!timerId) {
    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    toggleButtons();
  }
});

//якщо маємо інтервал - очищаємо
btnStop.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    toggleButtons();
  }
});

//перемикач стану кнопок
function toggleButtons() {
  btnStart.toggleAttribute('disabled');
  btnStop.toggleAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
