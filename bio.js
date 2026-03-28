const quizData = [
    {
        question: "What is the largest internal organ in the human body?",
        answers: [
            { text: "Heart", correct: false },
            { text: "Brain", correct: false },
            { text: "Liver", correct: true },
            { text: "Kidney", correct: false },
        ],
    },
    {
        question: "What gas do plants primarily absorb from the air during photosynthesis?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Hydrogen", correct: false },
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
        question: "Which part of the plant absorbs water and nutrients from the soil?",
        answers: [
            { text: "Leaves", correct: false },
            { text: "Stem", correct: false },
            { text: "Roots", correct: true },
            { text: "Flower", correct: false },
        ],
    },
    {
        question: "The skeleton of the human body is primarily made of what material?",
        answers: [
            { text: "Muscle", correct: false },
            { text: "Skin", correct: false },
            { text: "Bone", correct: true },
            { text: "Cartilage", correct: false },
        ],
    },
    {
        question: "What is the process called when an animal changes its shape or form as it grows (like a caterpillar to a butterfly)?",
        answers: [
            { text: "Digestion", correct: false },
            { text: "Respiration", correct: false },
            { text: "Metamorphosis", correct: true },
            { text: "Germination", correct: false },
        ],
    },
    {
        question: "Which organ acts as the pump for blood in the circulatory system?",
        answers: [
            { text: "Lungs", correct: false },
            { text: "Stomach", correct: false },
            { text: "Heart", correct: true },
            { text: "Spleen", correct: false },
        ],
    },
    {
        question: "Animals that only eat plants are called what?",
        answers: [
            { text: "Omnivores", correct: false },
            { text: "Carnivores", correct: false },
            { text: "Herbivores", correct: true },
            { text: "Detritivores", correct: false },
        ],
    },
    {
        question: "What is the basic unit of all living things?",
        answers: [
            { text: "Atom", correct: false },
            { text: "Molecule", correct: false },
            { text: "Cell", correct: true },
            { text: "Tissue", correct: false },
        ],
    },
    {
        question: "The part of the eye that controls the amount of light entering is the:",
        answers: [
            { text: "Lens", correct: false },
            { text: "Pupil", correct: true },
            { text: "Retina", correct: false },
            { text: "Cornea", correct: false },
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

