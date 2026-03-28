const quizData = [
  {
    question: "Which desert is the largest hot desert in the world?",
    answers: [
      { text: "Gobi Desert", correct: false },
      { text: "Arabian Desert", correct: false },
      { text: "Sahara Desert", correct: true },
      { text: "Kalahari Desert", correct: false },
    ],
  },
  {
    question: "Who was the first person to step on the Moon?",
    answers: [
      { text: "Yuri Gagarin", correct: false },
      { text: "Buzz Aldrin", correct: false },
      { text: "Neil Armstrong", correct: true },
      { text: "John Glenn", correct: false },
    ],
  },
  {
    question: "What is the name of the planet closest to the Sun?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: false },
      { text: "Mercury", correct: true },
      { text: "Earth", correct: false },
    ],
  },
  {
    question: "Which Renaissance artist painted the **Mona Lisa**?",
    answers: [
      { text: "Michelangelo", correct: false },
      { text: "Raphael", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Donatello", correct: false },
    ],
  },
  {
    question: "Which of the world's oceans is the largest and deepest?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Who wrote the classic plays **'Romeo and Juliet'** and **'Hamlet'**?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "Geoffrey Chaucer", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Jane Austen", correct: false },
    ],
  },
  {
    question: "What is the capital city of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Vancouver", correct: false },
      { text: "Montreal", correct: false },
      { text: "Ottawa", correct: true },
    ],
  },
  {
    question: "Which of the four major human blood types is known as the **'universal recipient'**?",
    answers: [
      { text: "Type O-negative", correct: false },
      { text: "Type A-positive", correct: false },
      { text: "Type B-negative", correct: false },
      { text: "Type AB-positive", correct: true },
    ],
  },
  {
    question: "The famous historical structure, the **Great Wall of China**, was primarily built to protect against which group?",
    answers: [
      { text: "European invaders", correct: false },
      { text: "Japanese armies", correct: false },
      { text: "Mongolian and nomadic tribes", correct: true },
      { text: "Internal rebels", correct: false },
    ],
  },
  {
    question: "What is the official and most widely spoken language in Brazil?",
    answers: [
      { text: "Spanish", correct: false },
      { text: "French", correct: false },
      { text: "Portuguese", correct: true },
      { text: "Italian", correct: false },
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

