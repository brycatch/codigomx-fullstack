const form = document.getElementById('user-form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const gender = document.getElementById('gender');
const birthday = document.getElementById('birthday');

function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  let counter = 0;
  const user = {};
  if (firstName.value.length > 0) {
    counter += 1;
    user['firstName'] = firstName.value;
  }
  if (lastName.value.length > 0) {
    counter += 1;
    user['lastName'] = lastName.value;
  }
  if (password.value.length > 0) {
    counter += 1;
    user['password'] = password.value;
  }
  if (gender.value.length > 0) {
    counter += 1;
    user['gender'] = gender.value;
  }
  if (birthday.value.length > 0) {
    counter += 1;
    user['birthday'] = birthday.value;
  }
  if (counter === 5) {
    fetch('http://localhost:3000/user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { code } = data;
        if (code === 201) window.location.replace('/index.html');
      })
      .catch((e) => {
        console.error(e);
      });
  }
  return false;
}

if (form.attachEvent) {
  form.attachEvent('submit', processForm);
} else {
  form.addEventListener('submit', processForm);
}
document.addEventListener('DOMContentLoaded', function () {
  const selectElements = document.querySelectorAll('select');
  M.FormSelect.init(selectElements, {});

  const sidenavs = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavs, {});

  const datepickerElements = document.querySelectorAll('.datepicker');
  M.Datepicker.init(datepickerElements, { format: 'mm/dd/yyyy' });
});
