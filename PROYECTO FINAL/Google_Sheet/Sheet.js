function enviarReservaASheet(data) {
  fetch('https://script.google.com/macros/s/AKfycbwnmv-FvP0o4ADyfP3B9fbxskWyTzlX9cVqx0porgDjQrbTtR_ppAdtvECegxL-vudp/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(result => {
      console.log("✅ Reservación enviada a Google Sheets:", result);
    })
    .catch(error => {
      console.error("❌ Error al enviar la reservación:", error);
    });
}
