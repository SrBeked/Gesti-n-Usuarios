document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userIdInput = document.getElementById('userId');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const userList = document.getElementById('userList');
  
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    const saveToLocalStorage = () => {
      localStorage.setItem('users', JSON.stringify(users));
    };
  
    const renderUsers = () => {
      userList.innerHTML = '';
      users.forEach((user, index) => {
        const tr = document.createElement('tr');
  
        const tdName = document.createElement('td');
        tdName.textContent = user.name;
        tr.appendChild(tdName);
  
        const tdEmail = document.createElement('td');
        tdEmail.textContent = user.email;
        tr.appendChild(tdEmail);
  
        const tdActions = document.createElement('td');
        tdActions.classList.add('actions');
  
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit');
        editButton.onclick = () => {
          userIdInput.value = index;
          nameInput.value = user.name;
          emailInput.value = user.email;
        };
        tdActions.appendChild(editButton);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => {
          users.splice(index, 1);
          saveToLocalStorage();
          renderUsers();
        };
        tdActions.appendChild(deleteButton);
  
        tr.appendChild(tdActions);
        userList.appendChild(tr);
      });
    };
  
    userForm.onsubmit = (e) => {
      e.preventDefault();
  
      const id = userIdInput.value;
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
  
      if (name === '' || email === '') {
        alert('Por favor, completa todos los campos.');
        return;
      }
  
      if (id === '') {
        users.push({ name, email });
      } else {
        users[id] = { name, email };
        userIdInput.value = '';
      }
  
      saveToLocalStorage();
      renderUsers();
      userForm.reset();
    };
  
    renderUsers();
  });
  