const questions = [
    { 
        question: "¿Cuál es el planeta más grande del sistema solar?",
        options: ["Marte", "Júpiter", "Saturno", "Venus"],
        answer: 1
    },
    { 
        question: "¿En qué continente se encuentra Egipto?",
        options: ["Asia", "África", "Europa", "Oceanía"],
        answer: 1
    },
    { 
        question: "¿Quién pintó la Mona Lisa?",
        options: ["Picasso", "Da Vinci", "Van Gogh", "Miguel Ángel"],
        answer: 1
    },
    { 
        question: "¿Qué gas respiramos principalmente?",
        options: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Hidrógeno"],
        answer: 0
    },
    { 
        question: "¿Cuál es el océano más grande del mundo?",
        options: ["Atlántico", "Índico", "Pacífico", "Ártico"],
        answer: 2
    },
    {
        question: "¿Qué idioma se habla en Brasil?",
        options: ["Español", "Portugués", "Inglés", "Francés"],
        answer: 1
    },
    {
        question: "¿Cuántos lados tiene un hexágono?",
        options: ["4", "5", "6", "8"],
        answer: 2
    },
    {
        question: "¿Quién escribió 'El Quijote'?",
        options: ["Cervantes", "Shakespeare", "Borges", "Neruda"],
        answer: 0
    },
    {
        question: "¿Cuál es la capital de Canadá?",
        options: ["Toronto", "Montreal", "Ottawa", "Vancouver"],
        answer: 2
    },
    {
        question: "¿Qué animal es conocido como el 'rey de la selva'?",
        options: ["Elefante", "León", "Tigre", "Jaguar"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    q.options.forEach((opt, index) => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerText = opt;
        div.onclick = () => selectOption(index);
        optionsContainer.appendChild(div);
    });

    document.getElementById("nextBtn").disabled = true;
}

function selectOption(index) {
    const options = document.querySelectorAll(".option");
    
    options.forEach((opt, i) => {
        opt.classList.remove("correct", "incorrect");
        if (i === index) {
            opt.classList.add(index === questions[currentQuestion].answer ? "correct" : "incorrect");
            selectedOption = index;
        }
    });

    document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
    if (selectedOption === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz").style.display = "none";
    const resultContainer = document.getElementById("result");
    let feedback = "";

    if (score >= 9) {
        feedback = "¡Excelente! 🌟 ¡Eres un genio del conocimiento!";
    } else if (score >= 6) {
        feedback = "¡Muy bien! 👍 Tienes buen conocimiento general.";
    } else if (score >= 3) {
        feedback = "¡Bien hecho! 💡 Aunque puedes mejorar.";
    } else {
        feedback = "¡Ánimo! 💪 Sigue practicando.";
    }

    resultContainer.innerHTML = `
        <p>Tu puntuación: ${score} / ${questions.length}</p>
        <p>${feedback}</p>
    `;
    resultContainer.style.display = "block";
}

window.onload = loadQuestion;
