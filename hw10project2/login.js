if (localStorage.getItem("theme") == "dark") {
  document.body.classList.toggle("dark-theme");
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  if (localStorage.getItem("theme") == "light") {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

function validateForm(event) {
  event.preventDefault()
  let isValid = true;

  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  sessionStorage.setItem("name", name);
  sessionStorage.setItem("password", password);

  const nameError = document.getElementById("nameError");
  const passwordError = document.getElementById("passwordError");
  const submitSuccess = document.getElementById("submit-message");

  nameError.textContent = "";
  passwordError.textContent = "";
  submitSuccess.textContent = "";

  if (name != "erfan") {
    nameError.textContent = "Name not found";
    isValid = false;
  }

  if (password != 'Erfan.123') {
    passwordError.textContent = "Wrong password";
    isValid = false;
  }

  if (isValid) {
    submitSuccess.textContent = "SUCCESSFUL!";
    window.location.href = "index.html";
  }

  return isValid;
}

function setinput() {
  let name = sessionStorage.getItem("name");
  let password = sessionStorage.getItem("password");

  document.getElementById("name").value = name;
  document.getElementById("password").value = password;

}
setinput()