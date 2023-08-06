import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnTimerStart: document.querySelector('[data-start]'),
  timerFieldDays: document.querySelector('[data-days]'),
  timerFielHours: document.querySelector('[data-hours]'),
  timerFieldMinutes: document.querySelector('[data-minutes]'),
  timerFieldSeconds: document.querySelector('[data-seconds]'),
};

//опції для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] < currentDate) {
      Notify.warning('Please choose a date in the future', {
        timeout: 1500,
        position: 'left-top',
      });
    } else {
      refs.btnTimerStart.disabled = false;
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//запис дати в необхідному форматі
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.timerFieldDays.textContent = addLeadingZero(days);
  refs.timerFielHours.textContent = addLeadingZero(hours);
  refs.timerFieldMinutes.textContent = addLeadingZero(minutes);
  refs.timerFieldSeconds.textContent = addLeadingZero(seconds);
}

//запуск таймеру
function onClick() {
  const selectedDate = fp.selectedDates[0];

  timerId = setInterval(() => {
    const startTime = new Date();
    const countdown = selectedDate - startTime;
    refs.btnTimerStart.disabled = true;

    if (countdown < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimerFace(convertMs(countdown));
  }, 1000);
}

//додаємо flatpickr до інпуту та слухач на кнопку
const fp = flatpickr('#datetime-picker', options);
refs.btnTimerStart.addEventListener('click', onClick);
