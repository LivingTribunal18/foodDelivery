const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const btnLogout = document.querySelector(".button-out");
const logInForm = document.querySelector("#logInForm");
const inputLogin = document.querySelector("#login");
const inputPassword = document.querySelector("#password");
const username = document.querySelector(".user-name");
const errors = document.querySelector(".errors");

const login = (user) => {
  buttonAuth.style.display = "none";
  modalAuth.style.display = "none";
  errors.style.display = "none";

  btnLogout.style.display = "flex";
  username.style.display = "flex";

  username.textContent = user.login;
};

const logout = () => {
  buttonAuth.style.display = "flex";

  btnLogout.style.display = "none";
  username.style.display = "none";

  username.textContent = "";
  localStorage.removeItem("user");
};

const error = (errorMsg) => {
  errors.style.display = "block";
  errors.textContent = errorMsg;
};

buttonAuth.addEventListener("click", function () {
  modalAuth.style.display = "flex";
});

btnLogout.addEventListener("click", function () {
  logout();
});

closeAuth.addEventListener("click", function () {
  modalAuth.style.display = "none";
});

logInForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let user = {};
  if (inputLogin.value && inputPassword.value) {
    user = {
      login: inputLogin.value,
      password: inputPassword.value,
    };

    localStorage.setItem("user", JSON.stringify(user));
    login(user);
  } else {
    error("Empty Login or Password");
  }
});

if (localStorage.user) {
  login(JSON.parse(localStorage.user));
}
