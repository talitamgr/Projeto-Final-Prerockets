var emailInput = document.getElementById("loginEmail");
var passwordInput = document.getElementById("loginPassword");
var signInBtn = document.getElementById("signInBtn");

passwordInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    authentication();
  }
});

function authentication() {
  for (var i = 0; i < data.login.length; i++) {
    if (
      emailInput.value == data.login[i].email &&
      passwordInput.value == data.login[i].password
    ) {
      window.location.href = "../Html/home.html";
    }
  }
}
