document.addEventListener("DOMContentLoaded", () => {
    // Agregar nueva tarea
    function addTask() {
        const input = document.getElementById("taskInput");
        const taskText = input.value.trim();
        
        if (taskText === "") {
            alert("Por favor, ingresa una tarea.");
            return;
        }

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const span = document.createElement("span");
        span.textContent = taskText;
        span.onclick = () => span.classList.toggle("completed");

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm";
        deleteBtn.textContent = "Eliminar";
        deleteBtn.onclick = () => li.remove();

        li.appendChild(span);
        li.appendChild(deleteBtn);

        document.getElementById("taskList").appendChild(li);
        input.value = "";
    }

    // Asigna la función al evento global
    window.addTask = addTask;  
});
