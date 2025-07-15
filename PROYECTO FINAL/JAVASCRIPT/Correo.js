document.getElementById("formularioReservaEmergente").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("res-nombre").value;
  const correo = document.getElementById("res-correo").value;
  const fecha = document.getElementById("res-fecha").value;
  const hora = document.getElementById("res-hora").value;

  // Generar código aleatorio
  const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Mostrar mensaje
  const mensaje = `¡¡Fue un éxito su reservación!!\nEste es su código de reservación: ${codigo}`;
  const mensajeEl = document.getElementById("mensajeReserva");
  mensajeEl.textContent = mensaje;
  mensajeEl.style.color = "green";

  // (Opcional) Mostrar por consola
  console.log("Reserva hecha:", { nombre, correo, fecha, hora, codigo });

  // Esperar unos segundos y cerrar
  setTimeout(() => {
    cerrarVentanaReserva();
    document.getElementById("formularioReservaEmergente").reset();
  }, 6000);
});

function doPost(e) {
  const datos = JSON.parse(e.postData.contents);

  // Guardar en hoja de cálculo (opcional)
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reserva");
  hoja.appendRow([new Date(), datos.nombre, datos.correo, datos.fecha, datos.hora, datos.codigo]);

  // Enviar correo
  GmailApp.sendEmail(datos.correo, "Confirmación de Reservación - Smucky's", 
    `Hola ${datos.nombre},\n\n¡¡Fue un éxito su reservación!!\n\nFecha: ${datos.fecha}\nHora: ${datos.hora}\nCódigo de reservación: ${datos.codigo}\n\nGracias por elegir Smucky’s`);

  return ContentService.createTextOutput(JSON.stringify({ status: "ok", mensaje: "Reservación guardada y correo enviado" }))
    .setMimeType(ContentService.MimeType.JSON);
}
