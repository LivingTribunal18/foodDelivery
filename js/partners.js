const cardsRestaurants = document.querySelector(".cards-restaurants");
const auth = document.querySelector(".button-auth");

const renderItems = (items) => {
  items.map((item) => {
    const { image, kitchen, name, price, products, stars, time_of_delivery } =
      item;

    const a = document.createElement("a");
    a.setAttribute("href", "/restaurant.html");
    a.classList.add("card");
    a.classList.add("card-restaurant");
    a.dataset.products = products;
    a.innerHTML = `
      <img
        src="${image}"
        alt="${image}"
        class="card-image"
      />
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${time_of_delivery} мин</span>
        </div>
        <div class="card-info">
          <div class="rating"> ${stars}</div>
          <div class="price">От ${price} ₽</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>
    `;

    a.addEventListener("click", (e) => {
      e.preventDefault();

      if (localStorage.user) {
        localStorage.setItem("restaurant", JSON.stringify(item));
        window.location.href = "/restaurant.html";
      } else {
        let event = new Event("click");
        auth.dispatchEvent(event);
      }
    });

    cardsRestaurants.append(a);
  });
};

async function fetchPartners() {
  try {
    const response = await axios.get(
      "https://delivery-food-79d68-default-rtdb.europe-west1.firebasedatabase.app/db/partners.json"
    );
    renderItems(response.data);
  } catch (e) {
    console.log(e);
  }
}

fetchPartners();
