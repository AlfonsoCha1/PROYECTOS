const form = document.getElementById("appointmentForm");
const confirmation = document.getElementById("confirmationMessage");
const details = document.getElementById("details");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const type = document.getElementById("type").value;

    // Validar fecha mínima (no permite fechas pasadas)
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
        alert("No puedes agendar una cita en una fecha pasada.");
        return;
    }

    // Mostrar confirmación
    confirmation.style.display = "block";
    details.innerHTML = `
        <strong>Nombre:</strong> ${name}<br>
        <strong>Correo:</strong> ${email}<br>
        <strong>Teléfono:</strong> ${phone}<br>
        <strong>Fecha:</strong> ${date}<br>
        <strong>Hora:</strong> ${time}<br>
        <strong>Tipo:</strong> ${type}
    `;

    // Limpiar formulario
    form.reset();
});
