window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('btn');
  const popUp = document.getElementById('pop-up');
  const form = document.getElementById('form')
  const submit = document.getElementById('submit')
  const name = document.getElementById('name');
  const lastName = document.getElementById('first-name');
  const mail = document.getElementById('e-mail');
  const password = document.getElementById('password');
  const any = document.getElementById('any');
  //const check = document.getElementById('check');
  const formArr = [[name, 'name'], [lastName, 'lastName'], [mail, 'mail'], [password, 'password'], [any, 'any']];

  function closePopUp() {
    history.back();
    popUp.style.display = 'none';
    btn.style.display = 'block';
  }

  async function post(user) {
    try {
      let response = await fetch('https://formcarry.com/s/udj4youeED', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });

      let result = await response.json();
      alert(result.message);
    } catch (e) {
      console.log(e);
    }

  }

  function clear(arr) {
    arr.forEach(el => {
      localStorage.setItem(el[1], "");
      el[0].value = "";
    });
  }


  btn.addEventListener('click', () => {
    popUp.style.display = 'flex';
    btn.style.display = 'none';
    history.pushState({form: 'form'}, 'form', '#form.html');
  });

  popUp.addEventListener('click', closePopUp);

  form.addEventListener('click', (e) => {
    e.stopPropagation();
  })

  formArr.forEach((e) => {
    e[0].value = localStorage.getItem(e[1]);
    e[0].addEventListener('change', () => {
      localStorage.setItem(e[1], e[0].value);
    });
  });

  submit.addEventListener('click', async (e) => {

    e.preventDefault();
    closePopUp();

    const user = {
      name: name.value,
      lastName: lastName.value,
      mail: mail.value,
      password: password.value,
      any: any.value
    }
    console.log(user);
    clear(formArr);
    await post(user);

  });

});
