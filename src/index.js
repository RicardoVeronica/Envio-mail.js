const $sendBTN = document.getElementById("enviar");
const $email = document.getElementById("email");
const $asunto = document.getElementById("asunto");
const $mensaje = document.getElementById("mensaje");
const $resetBTN = document.getElementById("resetBtn");
const $form = document.getElementById("enviar-mail");
const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

enventListeners();

function enventListeners() {
  document.addEventListener("DOMContentLoaded", init);

  $email.addEventListener("blur", validateForm);
  $asunto.addEventListener("blur", validateForm);
  $mensaje.addEventListener("blur", validateForm);

  $form.addEventListener("submit", sendEmail);

  $resetBTN.addEventListener("click", resetForm);
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

function sendEmail(e) {
  e.preventDefault();

  // Esta en el html y en css tiene un display none para no mostrar
  const spinnerGif = document.querySelector("#spinner");
  spinnerGif.style.display = "block";

  // Crea img para agregar el gif de mail
  const enviado = document.createElement("img");
  enviado.src = "img/mail.gif";
  enviado.style.display = "block";

  // ocultar spinner y mostrar mail enviado
  setTimeout(function () {
    spinnerGif.style.display = "none";
    document.querySelector("#loaders").appendChild(enviado);

    setTimeout(function () {
      enviado.remove();
      $form.reset();
      $sendBTN.disabled = true;
    }, 5500);
  }, 2000);
}

function resetForm(e) {
  e.preventDefault();
  $form.reset();
}
