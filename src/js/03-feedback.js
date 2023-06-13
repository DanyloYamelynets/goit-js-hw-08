import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const formEmail = document.querySelector('input');
const formMessage = document.querySelector('textarea');
const storageKey = 'feedback-form-state';

let inputData = JSON.parse(localStorage.getItem(storageKey)) || {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onSubmit);

function onFormInput(evt) {
  inputData[evt.target.name] = evt.target.value;
  localStorage.setItem(storageKey, JSON.stringify(inputData));
}

function onReload() {
  formEmail.value = inputData.email || '';
  formMessage.value = inputData.message || '';
}
onReload();

function onSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(storageKey);
  evt.target.reset();
  inputData = {};
}