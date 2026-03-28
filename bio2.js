const quizData = [
    {
        question: "Where does the majority of **energy production** (making ATP) take place in an animal cell?",
        answers: [
            { text: "Nucleus", correct: false },
            { text: "Ribosome", correct: false },
            { text: "Mitochondria", correct: true },
            { text: "Cytoplasm", correct: false },
    ],
    },
    {
        question: "What is the overall shape of a **DNA molecule**?",
    answers: [
      { text: "Single strand", correct: false },
      { text: "Double helix", correct: true },
      { text: "Circular loop", correct: false },
      { text: "Zig-zag line", correct: false },
    ],
    },
    {
        question: "What component in blood is responsible for carrying oxygen?",
        answers: [
            { text: "White blood cells", correct: false },
            { text: "Plasma", correct: false },
            { text: "Red blood cells", correct: true },
            { text: "Platelets", correct: false },
        ],
    },
    {
        question: "What provides a rigid **outer layer of protection and shape** to a plant cell, which animal cells lack?",
    answers: [
      { text: "Cell membrane", correct: false },
      { text: "Nucleus", correct: false },
      { text: "Cytoplasm", correct: false },
      { text: "Cell wall", correct: true },
    ],
    },
    {
        question: "What term describes the cell membrane's ability to allow some substances to pass through while blocking others?",
    answers: [
      { text: "Passive transport", correct: false },
      { text: "Totally permeable", correct: false },
      { text: "Selectively permeable", correct: true },
      { text: "Osmosis", correct: false },
    ],
    },
    {
        question: "The process where plants release **water vapor** into the atmosphere through small pores in their leaves is called...",
    answers: [
      { text: "Photosynthesis", correct: false },
      { text: "Transpiration", correct: true },
      { text: "Respiration", correct: false },
      { text: "Absorption", correct: false },
    ],
    },
    {
        question: "The study of how living organisms interact with each other and their environment is called...",
    answers: [
      { text: "Anatomy", correct: false },
      { text: "Genetics", correct: false },
      { text: "Ecology", correct: true },
      { text: "Physiology", correct: false },
    ],
    },
    {
        question: "Which gland is often called the **'master gland'** because it controls many other endocrine glands?",
    answers: [
      { text: "Thyroid gland", correct: false },
      { text: "Adrenal gland", correct: false },
      { text: "Pituitary gland", correct: true },
      { text: "Pancreas", correct: false },
    ],
    },
    {
        question: "What is the **green pigment** in plants that captures sunlight for photosynthesis?",
    answers: [
      { text: "Melanin", correct: false },
      { text: "Carotene", correct: false },
      { text: "Chlorophyll", correct: true },
      { text: "Hemoglobin", correct: false },
    ],
    },
    {
        question: "What is the process of breaking down food into smaller molecules so the body can absorb nutrients?",
    answers: [
      { text: "Excretion", correct: false },
      { text: "Respiration", correct: false },
      { text: "Digestion", correct: true },
      { text: "Circulation", correct: false },
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

