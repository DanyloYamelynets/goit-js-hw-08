import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const formEmail = document.querySelector('input');
const formMessage = document.querySelector('textarea');
const storageKey = 'feedback-form-state';

const throttledStorage = throttle(() => {
  const formData = {
    email: formEmail.value,
    message: formMessage.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formData));
}, 500);
feedbackForm.addEventListener('input', evt => {
  throttledStorage();
});

function afterReload() {
  const dataStorage = localStorage.getItem(storageKey);
  if (dataStorage) {
    const formData = JSON.parse(dataStorage);
    formEmail.value = formData.email;
    formMessage.value = formData.message;
  }
}
afterReload();

feedbackForm.addEventListener('submit', evt => {
  evt.preventDefault();
  evt.target.reset();
  localStorage.removeItem(storageKey);
});
