const quizData = [
    {
        question: "What family of instruments does the clarinet belong to?",
        answers: [
            { text: "Brass", correct: false },
            { text: "Woodwind", correct: true },
            { text: "String", correct: false },
            { text: "Percussion", correct: false },
        ],
    },
    {
        question: "How many strings does a standard acoustic guitar typically have?",
        answers: [
            { text: "4", correct: false },
            { text: "5", correct: false },
            { text: "6", correct: true },
            { text: "7", correct: false },
        ],
    },
    {
        question: "Which composer is famous for his 'Moonlight Sonata'?",
        answers: [
            { text: "Wolfgang Amadeus Mozart", correct: false },
            { text: "Ludwig van Beethoven", correct: true },
            { text: "Johann Sebastian Bach", correct: false },
            { text: "Frédéric Chopin", correct: false },
        ],
    },
    {
        question: "What musical term means 'very fast'?",
        answers: [
            { text: "Allegro", correct: false },
            { text: "Adagio", correct: false },
            { text: "Presto", correct: true },
            { text: "Largo", correct: false },
        ],
    },
    {
        question: "Which of these instruments is NOT typically found in a standard symphony orchestra?",
        answers: [
            { text: "Violin", correct: false },
            { text: "Tuba", correct: false },
            { text: "Electric Guitar", correct: true },
            { text: "Harp", correct: false },
        ],
    },
    {
        question: "What genre of music originated in the African-American communities of New Orleans in the late 19th and early 20th centuries?",
        answers: [
            { text: "Blues", correct: false },
            { text: "Jazz", correct: true },
            { text: "Ragtime", correct: false },
            { text: "R&B", correct: false },
        ],
    },
    {
        question: "What is the small hand-held drum used in Indian classical music?",
        answers: [
            { text: "Djembe", correct: false },
            { text: "Tabla", correct: true },
            { text: "Ghatam", correct: false },
            { text: "Mridangam", correct: false },
        ],
    },
    {
        question: "What is the name of the symbol that raises a note by a half step?",
        answers: [
            { text: "Flat (♭)", correct: false },
            { text: "Natural (♮)", correct: false },
            { text: "Sharp (♯)", correct: true },
            { text: "Treble Clef", correct: false },
        ],
    },
    {
        question: "Who was the 'King of Pop'?",
        answers: [
            { text: "Elvis Presley", correct: false },
            { text: "Prince", correct: false },
            { text: "Michael Jackson", correct: true },
            { text: "James Brown", correct: false },
        ],
    },
    {
        question: "Which city is strongly associated with the emergence of Grunge music in the late 1980s and early 1990s?",
        answers: [
            { text: "New York", correct: false },
            { text: "London", correct: false },
            { text: "Seattle", correct: true },
            { text: "Los Angeles", correct: false },
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

