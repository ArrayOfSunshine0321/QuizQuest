const quizData = [
  {
    question: "What is the basic, fundamental unit of a chemical **element**?",
    answers: [
      { text: "Molecule", correct: false },
      { text: "Atom", correct: true },
      { text: "Compound", correct: false },
      { text: "Ion", correct: false },
    ],
  },
  {
    question: "What is the chemical formula for water?",
    answers: [
      { text: "CO2", correct: false },
      { text: "H2O2", correct: false },
      { text: "H2O", correct: true },
      { text: "CH4", correct: false },
    ],
  },
  {
    question: "On the pH scale, a value less than 7 indicates a substance is...",
    answers: [
      { text: "Neutral", correct: false },
      { text: "Basic (Alkaline)", correct: false },
      { text: "Acidic", correct: true },
      { text: "Concentrated", correct: false },
    ],
  },
  {
    question: "Which subatomic particle carries a **negative** electrical charge?",
    answers: [
      { text: "Proton", correct: false },
      { text: "Neutron", correct: false },
      { text: "Electron", correct: true },
      { text: "Nucleus", correct: false },
    ],
  },
  {
    question: "The process where a liquid turns into a gas (e.g., steam) is called...",
    answers: [
      { text: "Condensation", correct: false },
      { text: "Freezing", correct: false },
      { text: "Sublimation", correct: false },
      { text: "Evaporation (or Vaporization)", correct: true },
    ],
  },
  {
    question: "Which group on the Periodic Table contains the highly unreactive **Noble Gases**?",
    answers: [
      { text: "Group 1", correct: false },
      { text: "Group 2", correct: false },
      { text: "Group 17 (Halogens)", correct: false },
      { text: "Group 18", correct: true },
    ],
  },
  {
    question: "A substance formed from two or more different elements **chemically bonded** together is called a...",
    answers: [
      { text: "Mixture", correct: false },
      { text: "Isotope", correct: false },
      { text: "Compound", correct: true },
      { text: "Solution", correct: false },
    ],
  },
  {
    question: "What gas is required for the process of **combustion** (burning)?",
    answers: [
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false },
      { text: "Carbon Dioxide (CO2)", correct: false },
      { text: "Oxygen", correct: true },
    ],
  },
  {
    question: "Which property is defined as the amount of **mass per unit volume**?",
    answers: [
      { text: "Temperature", correct: false },
      { text: "Density", correct: true },
      { text: "Pressure", correct: false },
      { text: "Solubility", correct: false },
    ],
  },
  {
    question: "The chemical process commonly known as **rusting** is an example of...",
    answers: [
      { text: "Reduction", correct: false },
      { text: "Decomposition", correct: false },
      { text: "Neutralization", correct: false },
      { text: "Oxidation", correct: true },
    ],
  },
];
let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const SubmitButton = document.getElementById("Submit");
const resultElement = document.getElementById("result");

// ------------------------------------------------------------------
// FIX 1: loadQuestion now creates accessible <label> elements
// ------------------------------------------------------------------

function loadQuestion() {
    questionElement.textContent = quizData[currentQuestion].question;
    answersElement.innerHTML = "";

    quizData[currentQuestion].answers.forEach((answer, index) => {
        // ... (Answer element creation code is correct) ...
        const li = document.createElement("li");
        const input = document.createElement("input");
        const label = document.createElement("label");

        input.type = "radio";
        input.name = "answer";
        input.value = index;
        input.id = `q${currentQuestion}-a${index}`; 

        label.htmlFor = input.id; 
        label.appendChild(input);
        label.appendChild(document.createTextNode(answer.text));
        
        li.appendChild(label); 
        answersElement.appendChild(li);
    });

  }
// ------------------------------------------------------------------
// FIX 2 & 3: checkAnswer now prevents crashes and is efficient
// ------------------------------------------------------------------
function checkAnswer() {
    const selectedInput = document.querySelector('input[name="answer"]:checked');

    if (!selectedInput) {
        resultElement.textContent = "⚠️ Please select an answer before submitting!";
        return;
    }

    const selectedAnswerIndex = selectedInput.value;
    const isCorrect = quizData[currentQuestion].answers[selectedAnswerIndex].correct;

    if (isCorrect) {
        score++;
        resultElement.textContent = "✅ Correct!";
    } else {
        const correctText = quizData[currentQuestion].answers.find((answer) => answer.correct).text;
        resultElement.textContent = `❌ Incorrect. The correct answer was ${correctText}`;
    }

    currentQuestion++;

    // ⭐️ FIX: Add the fade-out class to START the animation while feedback is displayed
    const quizContainer = document.getElementById("quiz-container");
    //quizContainer.classList.remove("fade-in");
    //quizContainer.classList.add("fade-out"); // <-- CRITICAL LINE ADDED/RESTORED

    setTimeout(() => {
        if (currentQuestion < quizData.length) {
            resultElement.textContent = ""; 
            loadQuestion();
        } else {
            localStorage.setItem("score", score);
            localStorage.setItem("totalQuestions", quizData.length);
            window.location.href = "result1.html";
        }
    }, 1500);
}
loadQuestion();

SubmitButton.addEventListener("click", checkAnswer);

