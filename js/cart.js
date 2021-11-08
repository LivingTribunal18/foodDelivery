const btnCart = document.getElementById("cart-button");
const modalCart = document.querySelector(".modal-cart");
const close = modalCart.querySelector(".close");
const modalBody = modalCart.querySelector(".modal-body");
const buttonSend = modalCart.querySelector(".button-primary");
const clearCart = modalCart.querySelector(".clear-cart");
const priceTag = modalCart.querySelector(".modal-pricetag");

const resetCart = () => {
  modalBody.innerHTML = "";
  localStorage.removeItem("cart");
  modalCart.classList.remove("is-open");
};

async function sendOrder(cartArray) {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      cartArray
    );
    if (response.status >= 200 && response.status < 400) {
      resetCart();
    }
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

const changeCounter = (id, num) => {
  const cartArray = JSON.parse(localStorage.getItem("cart"));
  cartArray.map((item) => {
    if (item.id == id) {
      if (num === -1) {
        item.counter = item.counter > 0 ? (item.counter += num) : 0;
      } else {
        item.counter += num;
      }
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cartArray));
  renderCarts(cartArray);
};

const renderCarts = (data) => {
  modalBody.innerHTML = "";
  let totalPrice = 0;

  data.forEach(({ name, price, id, counter }) => {
    const cartElement = document.createElement("div");
    cartElement.classList.add("food-row");

    totalPrice += Number(price) * Number(counter);

    cartElement.innerHTML = `
      <span class="food-name">${name}</span>
      <strong class="food-price">${price} ₽</strong>
      <div class="food-counter">
        <button class="counter-button counter-decrease" data-index=${id}>-</button>
        <span class="counter">${counter}</span>
        <button class="counter-button counter-increase" data-index=${id}>+</button>
      </div>
    `;

    modalBody.append(cartElement);
    priceTag.innerHTML = totalPrice;
  });
};

modalBody.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("counter-increase")) {
    changeCounter(e.target.dataset.index, 1);
  } else {
    changeCounter(e.target.dataset.index, -1);
  }
});

buttonSend.addEventListener("click", () => {
  const cartArray = JSON.parse(localStorage.getItem("cart"));

  sendOrder(cartArray);
});

btnCart.addEventListener("click", function () {
  modalCart.classList.add("is-open");
  if (localStorage.cart) {
    renderCarts(JSON.parse(localStorage.cart));
  }
});

close.addEventListener("click", function () {
  modalCart.classList.remove("is-open");
});

clearCart.addEventListener("click", resetCart);
