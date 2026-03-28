const quizData = [
    {
        question: "Which country is the largest in the world by land area?",
        answers: [
            { text: "Canada", correct: false },
            { text: "China", correct: false },
            { text: "Russia", correct: true },
            { text: "United States", correct: false },
        ],
    },
    {
        question: "The Nile River is primarily located in which continent?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Africa", correct: true },
            { text: "South America", correct: false },
            { text: "Europe", correct: false },
        ],
    },
    {
        question: "What is the capital city of Australia?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Melbourne", correct: false },
            { text: "Canberra", correct: true },
            { text: "Perth", correct: false },
        ],
    },
    {
        question: "Which mountain range runs along the western coast of South America?",
        answers: [
            { text: "Himalayas", correct: false },
            { text: "Rocky Mountains", correct: false },
            { text: "Andes", correct: true },
            { text: "Alps", correct: false },
        ],
    },
    {
        question: "What is the smallest continent in the world?",
        answers: [
            { text: "Europe", correct: false },
            { text: "Australia (Oceania)", correct: true },
            { text: "Antarctica", correct: false },
            { text: "South America", correct: false },
        ],
    },
    {
        question: "The Strait of Gibraltar connects the Atlantic Ocean to which body of water?",
        answers: [
            { text: "Pacific Ocean", correct: false },
            { text: "Red Sea", correct: false },
            { text: "Mediterranean Sea", correct: true },
            { text: "Black Sea", correct: false },
        ],
    },
    {
        question: "Which continent is home to the largest desert in the world, the Sahara?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Africa", correct: true },
            { text: "Australia", correct: false },
            { text: "North America", correct: false },
        ],
    },
    {
        question: "What is the term for a narrow strip of land connecting two larger landmasses and having water on either side?",
        answers: [
            { text: "Peninsula", correct: false },
            { text: "Archipelago", correct: false },
            { text: "Isthmus", correct: true },
            { text: "Strait", correct: false },
        ],
    },
    {
        question: "The city of Istanbul connects which two continents?",
        answers: [
            { text: "Africa and Asia", correct: false },
            { text: "Asia and Europe", correct: true },
            { text: "Europe and Africa", correct: false },
            { text: "North and South America", correct: false },
        ],
    },
    {
        question: "Which parallel of latitude is known as the Equator?",
        answers: [
            { text: "45 degrees North", correct: false },
            { text: "0 degrees", correct: true },
            { text: "23.5 degrees South", correct: false },
            { text: "90 degrees North", correct: false },
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

