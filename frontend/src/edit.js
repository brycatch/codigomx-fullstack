const form = document.getElementById('user-form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const gender = document.getElementById('gender');
const birthday = document.getElementById('birthday');

const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const populateForm = (user) => {
  const selectElements = document.querySelectorAll('select');
  const datepickerElements = document.querySelectorAll('.datepicker');

  firstName.value = user.firstName;
  lastName.value = user.lastName;
  gender.value = `${user.gender}`;

  M.FormSelect.init(selectElements, {});
  M.Datepicker.init(datepickerElements, {
    format: 'mm/dd/yyyy',
    defaultDate: new Date(user.birthday),
    setDefaultDate: true,
  });
};

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
  if (gender.value.length > 0) {
    counter += 1;
    user['gender'] = gender.value;
  }
  if (birthday.value.length > 0) {
    counter += 1;
    user['birthday'] = birthday.value;
  }
  if (counter > 1) {
    fetch(`http://localhost:3000/user/${getParameterByName('id')}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { code } = data;
        if (code === 200) window.location.replace('/index.html');
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

document.addEventListener('DOMContentLoaded', function (event) {
  const sidenavs = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavs, {});
  id = getParameterByName('id');
  if (id === null) window.location.replace(`/index.html`);
  else {
    fetch(`http://localhost:3000/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const { data: user } = data;
        populateForm(user);
      })
      .catch((e) => {
        console.error(e);
      });
  }
});
