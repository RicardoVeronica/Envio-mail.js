const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const enviarBTN = document.getElementById("enviar");
const formularioEnviar = document.getElementById("enviar-mail");
const resetBTN = document.getElementById("resetBtn");

// listener
eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", init);

  // campos del form
  email.addEventListener("blur", validarCampo);
  asunto.addEventListener("blur", validarCampo);
  mensaje.addEventListener("blur", validarCampo);

  // Enviar formulario
  formularioEnviar.addEventListener("submit", enviarEmail);
  // boton enviar mismo resultado
  // enviarBTN.addEventListener('click', enviarEmail)

  // boton reset
  resetBTN.addEventListener("click", resetFormulario);
}

// functions
function init() {
  enviarBTN.disabled = true;
}

function validarCampo() {
  // valida longitud del texto que no este vacio
  // this es el objeto que se encarga de ejecutar las funcion en este caso el input con id
  validarLongitud(this); // this = campo actual para, asunto o mensaje

  // validar unicamente el email
  if (this.type === "email") {
    validarEmail(this);
  }

  let errores = document.querySelectorAll(".error"); // viene de materielize

  if (email.value !== "" && asunto.value !== "" && mensaje.value !== "") {
    if (errores.length === 0) {
      // si no hay ningun error se activa el btn
      enviarBTN.disabled = false;
    }
  }
}

function validarLongitud(campo) {
  // console.log(campo) // para, asunto o mensaje
  // console.log(campo.value.length)
  // console.log(this.type)

  if (campo.value.length > 0) {
    // si el campo tiene contenido
    campo.style.borderBottomColor = "green"; // como css border-bottom-color
    campo.classList.remove("error"); // la clase viene de materielize
  } else {
    // si el campo no tiene contenido
    campo.style.borderBottomColor = "red";
    campo.classList.add("error"); // agrega clase error
  }
}

function validarEmail(campo) {
  // console.log(campo)
  // console.log(campo.value)
  const mensaje = campo.value;

  // indexOf regresa el primer indice en el que se encuentra @ o -1 sino esta
  if (mensaje.indexOf("@") !== -1) {
    campo.style.borderBottomColor = "green";
    campo.classList.remove("error");
  } else {
    campo.style.borderBottomColor = "red";
    campo.classList.add("error");
  }
}

function enviarEmail(e) {
  e.preventDefault();

  // Esta en html y en css tiene un display none para no mostrar
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
      formularioEnviar.reset();
      enviarBTN.disabled = true;
    }, 5500);
  }, 2000);
}

function resetFormulario(e) {
  e.preventDefault();
  formularioEnviar.reset();
}
