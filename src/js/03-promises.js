import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

//генератор промісу
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

//виклик createPromise при submit
function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const dataParams = {};

  for (const [key, value] of formData.entries()) {
    dataParams[key] = Number(value);
  }

  let { amount, step, delay } = dataParams;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onError);
    delay += step;
  }
  form.reset();
}

//замість стандартного alert
function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

form.addEventListener('submit', onSubmit);
