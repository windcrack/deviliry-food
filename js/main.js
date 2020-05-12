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
  cardsMenu = document.querySelector('.cards-menu'),
  restaurantTitle = document.querySelector('.restaurant-title'),
  rating = document.querySelector('.rating'),
  minPrice = document.querySelector('.price'),
  category = document.querySelector('.category'),
  modalBody = document.querySelector('.modal-body'),
  modalPriceTag = document.querySelector('.modal-pricetag'),
  buttonClear = document.querySelector('.clear-cart');

let login = localStorage.getItem('loginUser');

const card = JSON.parse(localStorage.getItem('cartPrice')) || [];

const saveCard = () =>{
  localStorage.setItem('cartPrice', JSON.stringify(card))
}

const getData = async function (url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}!`);
  }
  return await response.json();
};



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
    cartButton.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

  buttonAuth.style.display = 'none';
  buttonOut.style.display = 'flex';
  userName.style.display = 'inline';
  cartButton.style.display = 'flex';
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

function addToCard(e) {
  let target = e.target;
  const buttonAddToCard = target.closest('.button-add-cart');
  if (buttonAddToCard) {
    const cart = target.closest('.card'),
      title = cart.querySelector('.card-title-reg').textContent,
      cost = cart.querySelector('.card-price').textContent,
      id = buttonAddToCard.id;

    const food = card.find(function (item) {
      return item.id === id;
    });
    if (food) {
      food.count += 1
    } else {
      card.push({
        id,
        cost,
        title,
        count: 1
      })
    }
    console.log(cart);
  }
  saveCard();
}

function renderCart() {
  modalBody.textContent = '';
  card.forEach(({id, title, cost, count}) => {
    const itemCart =
      `<div class="food-row">
					<span class="food-name">${title}</span>
					<strong class="food-price">${cost}</strong>
					<div class="food-counter">
						<button class="counter-button container-minus" data-id="${id}">-</button>
						<span class="counter">${count}</span>
						<button class="counter-button container-plus" data-id="${id}">+</button>
					</div>
        </div>`
      modalBody.insertAdjacentHTML('afterbegin', itemCart);
  });
  const totalPrice =  card.reduce((result, item) =>{
    return result + (parseFloat(item.cost) * item.count);
  }, 0);
  modalPriceTag.textContent = totalPrice;
}

function checkAuth() {
  if (login) {
    authorization();
  } else {
    notAuthorization();
  }
}

function cartCreateRestarunts(restaurant) {

  const {
    image,
    kitchen,
    name,
    price,
    stars,
    products,
    time_of_delivery: timeOfDelivery
  } = restaurant;
  const cartRender =
    `
    <a  class="card card-restaurant" data-products="${products}" data-info="${[name, price, kitchen, stars]}">
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${timeOfDelivery} мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            ${stars}
          </div>
          <div class="price">От ${price} ₽</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>
    </a>
    `;
  cardRestorants.insertAdjacentHTML('beforeend', cartRender);
}

function openGoods(e) {
  const target = e.target;
  if (login) {
    const restorant = target.closest('.card-restaurant');
    if (restorant) {

      const info = restorant.dataset.info.split(",");

      const [name, price, kitchen, stars] = info;

      restaurantTitle.textContent = name;
      rating.textContent = stars;
      minPrice.textContent = `От ${price} ₽`;
      category.textContent = kitchen;

      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      getData(`./db/${restorant.dataset.products}`).then(function (data) {
        data.forEach(createCardGood);
      });
    }
  } else {
    iCanSeeModal();
  }
}


function createCardGood(goods) {
  const {
    id,
    name,
    description,
    price,
    image
  } = goods;
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend',
    `
    <img src="${image}" alt="${name}" title="${name}" class="card-image"/>
     <div class="card-text">
       <div class="card-heading">
         <h3 class="card-title card-title-reg">${name}</h3>
       </div>
       <div class="card-info">
         <div class="ingredients">
            ${description}
         </div>
       </div>
       <div class="card-buttons">
         <button class="button button-primary button-add-cart" id="${id}">
           <span class="button-card-text">В корзину</span>
           <span class="button-cart-svg"></span>
         </button>
         <strong class="card-price card-price-bold">${price} ₽</strong>
       </div>
      `);
  cardsMenu.insertAdjacentElement('beforeend', card);
}

function toggleModal() {
  modal.classList.toggle("is-open");
}

function changeCount(e){
  const target = e.target;

  if(target.classList.contains('counter-button')){
    const food = card.find(function(item){
      return item.id === target.dataset.id;
    });
    if(target.classList.contains('container-minus')) {
      food.count--;
      if(food.count === 0){
        card.splice(card.indexOf(food), 1);
      }
    };
    if(target.classList.contains('container-plus')) food.count++;
    renderCart();
  }
}

function init() {

  getData('../db/partners.json').then(function (data) {
    data.forEach(cartCreateRestarunts);
  });

  cardRestorants.addEventListener('click', openGoods);
  cartButton.addEventListener('click',  () => {
    renderCart();
    toggleModal();
  });
  close.addEventListener('click', toggleModal);

  modalBody.addEventListener('click', changeCount);

  cardsMenu.addEventListener('click', addToCard);

  buttonClear.addEventListener('click', ()=>{
    card.length = 0;
    renderCart();
  });

  logo.addEventListener('click', () => {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });
  checkAuth();
  new Swiper('.swiper-container', {
    loop: true,
    sliderPerView: 1,
  });

}

init();