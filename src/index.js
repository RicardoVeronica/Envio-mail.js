const $sendBTN = document.getElementById("enviar");
const $email = document.getElementById("email");
const $asunto = document.getElementById("asunto");
const $mensaje = document.getElementById("mensaje");
const $form = document.getElementById("enviar-mail");

enventListeners();

function enventListeners() {
  document.addEventListener("DOMContentLoaded", init);

  $email.addEventListener("blur", validateForm);
  $asunto.addEventListener("blur", validateForm);
  $mensaje.addEventListener("blur", validateForm);
}

function init() {
  $sendBTN.disabled = true;
}

function validateForm(e) {
  e.target.value.length === 0
    ? (e.target.style.borderBottomColor = "red") &&
      showErr("Todos los campos son obligatorios")
    : (e.target.style.borderBottomColor = "green");

  if (e.target.type === "email") {
    const result = e.target.value.indexOf("@");
    if (result < 0) {
      showErr("El email no es valido");
    }
  }
}

function showErr(message) {
  const errMessage = document.createElement("p");
  errMessage.textContent = message;
  errMessage.classList.add("error");

  const errors = document.querySelectorAll(".error");

  // lenght only exist in querySelectorAll
  if (errors.length === 0) $form.appendChild(errMessage);
}
