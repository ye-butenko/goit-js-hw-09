import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');
const DATA_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(inputForm, 500));
form.addEventListener('submit', submitForm);
window.addEventListener('load', windowLoad);

/*2. Під час завантаження сторінки перевіряй стан сховища,
 і якщо там є збережені дані, заповнюй ними поля форми.
 В іншому випадку поля повинні бути порожніми.*/
function windowLoad() {
  const savedData = JSON.parse(localStorage.getItem(DATA_KEY));
  if (savedData) {
    emailInput.value = savedData.email;
    messageTextarea.value = savedData.message;
  }
}

/*1. Відстежуй на формі подію input, і щоразу записуй у 
локальне сховище об'єкт з полями email і message, у яких 
зберігай поточні значення полів форми. Нехай ключем для 
сховища буде рядок "feedback-form-state".*/
function inputForm() {
  const currentData = getFormData();
  updateLocalStorage(currentData);
}

function updateLocalStorage(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

/*3. Під час сабміту форми очищуй сховище і поля форми, 
а також виводь у консоль об'єкт з полями email, message 
та їхніми поточними значеннями.*/
function submitForm(event) {
  event.preventDefault();
  const currentData = getFormData();
  console.log(currentData);
  form.reset();
  localStorage.removeItem(DATA_KEY);
}

//для генерації об'єкта
function getFormData() {
  return {
    email: emailInput.value,
    message: messageTextarea.value,
  };
}
