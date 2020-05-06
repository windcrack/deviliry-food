const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// day 1


const buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      closeAuth = document.querySelector('.close-auth'),
      logInForm = document.querySelector('#logInForm'),
      loginInput = document.querySelector('#login'),
      userName = document.querySelector('.user-name'),
      buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('loginUser');

function iCanSeeModal(){
  modalAuth.classList.toggle('is-open');
}

function authorization (){
  console.log('Авторизован');

  function logOut(){
    login = '';
    localStorage.removeItem('loginUser');
    buttonAuth.style.display = '';
    buttonOut.style.display = '';
    userName.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

  buttonAuth.style.display = 'none';
  buttonOut.style.display = 'block';
  userName.style.display = 'inline';
  userName.textContent = login;

  buttonOut.addEventListener('click', logOut);
}

function notAuthorization (){
  console.log('Не авторизован');
  function logIn(e){
    e.preventDefault();
    login = loginInput.value;
    localStorage.setItem('loginUser', login);
    iCanSeeModal();
    checkAuth();
    buttonAuth.removeEventListener('click', iCanSeeModal);
    closeAuth.removeEventListener('click', iCanSeeModal);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
  }
  buttonAuth.addEventListener('click', iCanSeeModal);
  closeAuth.addEventListener('click', iCanSeeModal);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth(){
  if(login){
    authorization();
  } else{
    notAuthorization();
  }
}

checkAuth();