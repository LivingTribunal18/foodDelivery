const cardsMenu = document.querySelector(".cards-menu");
const cartArray = localStorage.cart ? JSON.parse(localStorage.cart) : [];
const restaurant = JSON.parse(localStorage.restaurant);

const changeTitle = (restaurant) => {
  document.querySelector(".restaurant-title").textContent = restaurant.name;
  document.querySelector(".rating").textContent = restaurant.stars;
  document.querySelector(".price").textContent = `От ${restaurant.price} ₽`;
  document.querySelector(".category").textContent = restaurant.kitchen;
};

const addToCart = (cartItem) => {
  if (cartArray.some((item) => item.id === cartItem.id)) {
    cartArray.map((food) => {
      if (food.id === cartItem.id) {
        food.counter++;
      }
      return food;
    });
  } else {
    cartArray.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));
};

const renderItems = (items) => {
  items.map(({ id, description, name, price, image }) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
        <img
          src="${image}"
          alt="${image}"
          class="card-image"
        />
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
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <i class="fas fa-shopping-cart"></i>
            </button>
            <strong class="card-price-bold">${price} ₽</strong>
          </div>
        </div>
    `;

    div
      .querySelector(".button-card-text")
      .addEventListener("click", function () {
        addToCart({
          id,
          name,
          price,
          counter: 1,
        });
      });

    cardsMenu.append(div);
  });
};

async function fetchMenu() {
  try {
    const response = await axios.get(
      `https://delivery-food-79d68-default-rtdb.europe-west1.firebasedatabase.app/db/${restaurant.products}`
    );
    renderItems(response.data);
  } catch (e) {
    console.log(e);
  }
}

if (restaurant) {
  fetchMenu();
  changeTitle(restaurant);
} else {
  window.location.href = "/index.html";
}
