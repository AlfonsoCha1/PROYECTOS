let productoActual = "";
let precioUnitario = 0;
let cantidad = 1;

function abrirVentanaPago(producto, precio) {
  productoActual = producto;
  precioUnitario = precio;
  cantidad = 1;

  document.getElementById("detallePago").textContent = `${producto} - $${precio}`;
  document.getElementById("cantidad").textContent = cantidad;
  document.getElementById("total").textContent = `Total: $${precio}`;
  document.getElementById("metodo").value = "";
  document.getElementById("infoExtra").innerHTML = "";
  document.getElementById("mensajePago").textContent = "";

  document.getElementById("ventanaPago").style.display = "flex";

  document.getElementById("metodo").onchange = function () {
    const metodo = this.value;
    const infoExtra = document.getElementById("infoExtra");

    if (metodo === "tarjeta") {
      infoExtra.innerHTML = `<input type="text" placeholder="Número de tarjeta" required />`;
    } else if (metodo === "efectivo") {
      const codigo = Math.floor(100000 + Math.random() * 900000);
      infoExtra.innerHTML = `<p>Código de pago: <strong>${codigo}</strong></p>`;
    } else if (metodo === "transferencia") {
      infoExtra.innerHTML = `
        <p>CLABE: 012345678901234567</p>
        <p>Banco Ficticio de México</p>`;
    } else {
      infoExtra.innerHTML = "";
    }
  };
}

function cambiarCantidad(delta) {
  cantidad = Math.max(1, cantidad + delta);
  document.getElementById("cantidad").textContent = cantidad;
  document.getElementById("total").textContent = `Total: $${precioUnitario * cantidad}`;
}

function cerrarVentanaPago() {
  document.getElementById("ventanaPago").style.display = "none";
}

function procesarPago(event) {
  event.preventDefault();

  const metodo = document.getElementById("metodo").value;
  const cantidadTexto = document.getElementById("cantidad").textContent;
  const cantidad = parseInt(cantidadTexto);
  const total = precioUnitario * cantidad;

  document.getElementById("mensajePago").textContent = "Procesando pago...";
  document.getElementById("mensajePago").style.color = "black";

  db.collection("compras").add({
    producto: productoActual,
    cantidad: cantidad,
    precioUnitario: precioUnitario,
    total: total,
    metodoPago: metodo,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(() => {
      document.getElementById("mensajePago").textContent = "¡Pago exitoso!";
      document.getElementById("mensajePago").style.color = "green";
      setTimeout(() => {
        cerrarVentanaPago();
        document.getElementById("mensajePago").textContent = "";
      }, 2500);
    })
    .catch((error) => {
      console.error("❌ Error al guardar compra:", error);
      document.getElementById("mensajePago").textContent = "❌ Error. Intente de nuevo.";
      document.getElementById("mensajePago").style.color = "red";
    });

    // 👇 Llamar a Google Sheets usando el otro archivo
enviarASheet({
  nombreCompleto: "Cliente desconocido",
  producto: productoActual,
  cantidad: cantidad,
  precioUnitario: precioUnitario,
  total: total,
  metodoPago: metodo
});

db.collection("compras").add(datosCompra)
  .then(() => {
    console.log("✅ Compra guardada en Firebase");

    // 🔗 También enviamos a Google Sheets
    enviarASheet({
      nombreCompleto: "Cliente desconocido",
      producto: productoActual,
      cantidad: cantidad,
      precioUnitario: precioUnitario,
      total: total,
      metodoPago: metodo
    });

    document.getElementById("mensajePago").textContent = "¡Pago exitoso!";
    document.getElementById("mensajePago").style.color = "green";
    setTimeout(() => {
      cerrarVentanaPago();
      document.getElementById("mensajePago").textContent = "";
    }, 2500);
  })
  .catch((error) => {
    console.error("❌ Error al guardar compra:", error);
    document.getElementById("mensajePago").textContent = "❌ Error. Intente de nuevo.";
    document.getElementById("mensajePago").style.color = "red";
  });
}

// Conectar formulario
document.addEventListener("DOMContentLoaded", () => {
  const formPago = document.getElementById("formPago");
  if (formPago) {
    formPago.addEventListener("submit", procesarPago);
  }
});


// Mostrar ventana de reservación
document.querySelector('button[type="submit"].btn-55').addEventListener("click", function (e) {
  e.preventDefault(); // Evita que envíe el form original
  document.getElementById("ventanaReserva").style.display = "flex";
});

function cerrarVentanaReserva() {
  document.getElementById("ventanaReserva").style.display = "none";
  document.getElementById("mensajeReserva").textContent = "";
}

document.getElementById("formularioReservaEmergente").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("res-nombre").value;
  const correo = document.getElementById("res-correo").value;
  const fecha = document.getElementById("res-fecha").value;
  const hora = document.getElementById("res-hora").value;

  const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

  // ✅ Mostrar mensaje primero
  const mensaje = `¡¡Fue un éxito su reservación!! Este es su código de reservación: ${codigo}`;
  const mensajeEl = document.getElementById("mensajeReserva");
  mensajeEl.textContent = mensaje;
  mensajeEl.style.color = "green";

  // ✅ Enviar también al Google Sheet
  enviarReservaASheet({
    nombre: nombre,
    correo: correo,
    fecha: fecha,
    hora: hora,
    codigo: codigo
  });

  // ✅ Cerrar ventana después de 6 segundos
  setTimeout(() => {
    cerrarVentanaReserva();
    document.getElementById("formularioReservaEmergente").reset();
  }, 6000);
});

//import { enviarASheet } from './JAVASCRIPT/Sheet.js';
//import { enviarReservaASheet } from './JAVASCRIPT/Correo.js';