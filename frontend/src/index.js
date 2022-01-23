const convertDateToString = (date) => {
  date = new Date(date);
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  const result = `${(mm > 9 ? '' : '0') + mm}/${
    (dd > 9 ? '' : '0') + dd
  }/${date.getFullYear()}`;
  return result;
};

const rebuildTable = (table) => {
  const rowCount = table.rows.length;
  for (let i = 1; i < rowCount; i++) table.deleteRow(1);
};

const setUsersInTable = (users) => {
  const table = document.getElementById('table-users');
  rebuildTable(table);
  users.forEach((user) => {
    const row = table.insertRow();
    const userIdCell = row.insertCell(0);
    const firstNameCell = row.insertCell(1);
    const lastNameCell = row.insertCell(2);
    const birthdayCell = row.insertCell(3);
    const genderCell = row.insertCell(4);
    const actionsCell = row.insertCell(5);

    userIdCell.innerHTML = user.userId;
    firstNameCell.innerHTML = user.firstName;
    lastNameCell.innerHTML = user.lastName;
    birthdayCell.innerHTML = convertDateToString(user.birthday);

    genderCell.innerHTML = user.gender === 1 ? 'Male' : 'Female';
    actionsCell.insertAdjacentHTML(
      'afterbegin',
      `
    <div>
      <button onclick="edit(${user.userId})" class="waves-effect waves-light amber btn">
        <i class="small material-icons">edit</i>
      </button>
      <button onclick="remove(${user.userId})" class="waves-effect waves-light amber btn">
        <i class="small material-icons">close</i>
      </button>
    </div>
    `
    );
  });
};

const edit = (e) => {
  window.location.replace(`edit.html?id=${e}`);
};

const remove = (e) => {
  fetch(`http://localhost:3000/user/${e}`, {
    method: 'DELETE',
  }).then(() => {
    return loadUsers()();
  });
};

const loadUsers = () => {
  return () => {
    fetch('http://localhost:3000/user')
      .then((response) => response.json())
      .then((data) => {
        const { data: users } = data;
        setUsersInTable(users);
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

document.addEventListener('DOMContentLoaded', function (event) {
  const sidenavs = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavs, {});
  loadUsers()();
});
