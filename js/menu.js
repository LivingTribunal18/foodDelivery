const renderItems = (items) => {
  items.map((item) => {
    console.log(item);
  });
};

async function fetchPertners() {
  try {
    const response = await axios.get(
      "https://delivery-food-79d68-default-rtdb.europe-west1.firebasedatabase.app/"
    );
    console.log(response.data);
    renderItems(response.data);
  } catch (e) {
    console.log(e);
  }
}

fetchPertners();
