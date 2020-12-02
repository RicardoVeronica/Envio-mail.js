const $sendBTN = document.getElementById("enviar");
const $email = document.getElementById("email");
const $asunto = document.getElementById("asunto");
const $mensaje = document.getElementById("mensaje");
const $form = document.getElementById("enviar-mail");
const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
  if (e.target.value.length > 0) {
    const err = document.querySelector("p.error");
    if (err) {
      err.remove();
    }
  } else {
    showErr("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    if (regexp.test(e.target.value)) {
    } else {
      showErr("Email no valido");
    }
  }

  if (regexp.test($email.value) && $asunto.value !== "" && $mensaje.value) {
    $sendBTN.disabled = false;
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
