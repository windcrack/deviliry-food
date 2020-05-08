'use strick';
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

const buttonAuth = document.querySelector('.button-auth'),
  modalAuth = document.querySelector('.modal-auth'),
  closeAuth = document.querySelector('.close-auth'),
  logInForm = document.querySelector('#logInForm'),
  loginInput = document.querySelector('#login'),
  userName = document.querySelector('.user-name'),
  buttonOut = document.querySelector('.button-out'),
  cardRestorants = document.querySelector('.cards-restaurants'),
  containerPromo = document.querySelector('.container-promo'),
  restaurants = document.querySelector('.restaurants'),
  menu = document.querySelector('.menu'),
  logo = document.querySelector('.logo'),
  cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('loginUser');

function iCanSeeModal() {
  modalAuth.classList.toggle('is-open');
}

function authorization() {
  console.log('Авторизован');

  function logOut() {
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

function notAuthorization() {
  console.log('Не авторизован');

  function logIn(e) {
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

function checkAuth() {
  if (login) {
    authorization();
  } else {
    notAuthorization();
  }
}

function cartCreateRestarunts() {
  const cartRender =
    `
    <a  class="card card-restaurant">
      <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Тануки</h3>
          <span class="card-tag tag">60 мин</span>
        </div>
        <!-- /.card-heading -->
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 1 200 ₽</div>
          <div class="category">Суши, роллы</div>
        </div>
      </div>
    </a>
    `;
  cardRestorants.insertAdjacentHTML('beforeend', cartRender);
}

function openGoods(e) {
  const target = e.target;
  const restorant = target.closest('.cards-restaurants');
      if (restorant) {
        if(login){
          containerPromo.classList.add('hide');
          restaurants.classList.add('hide');
          menu.classList.remove('hide');
          cardsMenu.textContent = '';
          createCardGood();
          createCardGood();
          createCardGood();
        }else{
          iCanSeeModal();
        }
      }
      
}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend',
    `
    <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
     <div class="card-text">
       <div class="card-heading">
         <h3 class="card-title card-title-reg">Пицца Классика</h3>
       </div>
       <div class="card-info">
         <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
           грибы.
         </div>
       </div>
       <div class="card-buttons">
         <button class="button button-primary button-add-cart">
           <span class="button-card-text">В корзину</span>
           <span class="button-cart-svg"></span>
         </button>
         <strong class="card-price-bold">510 ₽</strong>
       </div>
      `);
  cardsMenu.insertAdjacentElement('beforeend', card);
}

cardRestorants.addEventListener('click', openGoods);

logo.addEventListener('click', () => {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
})

cartCreateRestarunts();
checkAuth();