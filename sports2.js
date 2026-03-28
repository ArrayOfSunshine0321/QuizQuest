const quizData = [
  {
    question: "In basketball, how many points is a shot taken from **outside the arc** (the three-point line) worth?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
    ],
  },
  {
    question: "In Olympic swimming, which stroke is swum entirely on the back?",
    answers: [
      { text: "Freestyle", correct: false },
      { text: "Breaststroke", correct: false },
      { text: "Butterfly", correct: false },
      { text: "Backstroke", correct: true },
    ],
  },
  {
    question: "What are the five interconnected rings on the Olympic flag meant to represent?",
    answers: [
      { text: "The five core Olympic values", correct: false },
      { text: "The five original sports", correct: false },
      { text: "The five colors of all member flags", correct: false },
      { text: "The five inhabited continents", correct: true },
    ],
  },
  {
    question: "In cricket, what is the term for a batsman scoring **100 runs** in a single inning?",
    answers: [
      { text: "Half-century", correct: false },
      { text: "Double century", correct: false },
      { text: "Century", correct: true },
      { text: "Wicket", correct: false },
    ],
  },
  {
    question: "What is the name of the lightweight **shuttlecock** used in badminton?",
    answers: [
      { text: "Feather", correct: false },
      { text: "Birdie", correct: true },
      { text: "Puck", correct: false },
      { text: "Shuttle", correct: false },
    ],
  },
  {
    question: "How many players are on the field for one team during a standard game of **baseball**?",
    answers: [
      { text: "7", correct: false },
      { text: "9", correct: true },
      { text: "10", correct: false },
      { text: "11", correct: false },
    ],
  },
  {
    question: "In basketball, what is the illegal contact with an opponent called?",
    answers: [
      { text: "A turnover", correct: false },
      { text: "A screen", correct: false },
      { text: "A travel", correct: false },
      { text: "A foul", correct: true },
    ],
  },
  {
    question: "Which swimming stroke involves moving both arms together over the water while kicking your legs simultaneously in a dolphin motion?",
    answers: [
      { text: "Freestyle (Front Crawl)", correct: false },
      { text: "Breaststroke", correct: false },
      { text: "Backstroke", correct: false },
      { text: "Butterfly", correct: true },
    ],
  },
  {
    question: "What is the most severe penalty in **ice hockey**, resulting in the player leaving the game entirely?",
    answers: [
      { text: "Minor penalty", correct: false },
      { text: "Major penalty", correct: false },
      { text: "Bench penalty", correct: false },
      { text: "Match penalty", correct: true },
    ],
  },
  {
    question: "Which sport involves throwing a heavy, solid metal ball as far as possible?",
    answers: [
      { text: "Javelin throw", correct: false },
      { text: "Discus throw", correct: false },
      { text: "Shot Put", correct: true },
      { text: "Hammer throw", correct: false },
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

