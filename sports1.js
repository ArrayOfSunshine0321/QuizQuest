const quizData = [
  {
    question: "Who is known as the 'God of Cricket'?",
    answers: [
      { text: "MS Dhoni", correct: false },
      { text: "Virat Kohli", correct: false },
      { text: "Sachin Tendulkar ", correct: true },
      { text: "Rohit Sharma", correct: false },
    ],
  },
  {
    question: "Which country won the FIFA World Cup in 2022?",
    answers: [
      { text: "France", correct: false },
      { text: "Brazil", correct: false },
      { text: "Argentina", correct: true },
      { text: "Germany", correct: false },
    ],
  },
  {
    question: "What is the name of the highest award for sports in India?",
    answers: [
      { text: "Padma Bhushan", correct: false },
      { text: "Arjuna Award", correct: false },
      { text: "Bharat Award", correct: false },
      { text: "Major Dhyan Chand Khel Ratna Award ", correct: true },
    ],
  },
  {
    question: "Who is the only Indian boxer to win an Olympic medal?",
    answers: [
      { text: "Vijender Singh ", correct: true },
      { text: "Mary Kom", correct: false },
      { text: "Shiva Thapa", correct: false },
      { text: "Akhil Kumar", correct: false },
    ],
  },
  {
    question:
      "Which Indian female badminton player won silver at the 2016 Olympics?",
    answers: [
      { text: "Saina Nehwal", correct: false },
      { text: "PV Sindhu", correct: true },
      { text: "Mary Kom", correct: false },
      { text: "Sania Mirza", correct: false },
    ],
  },
  {
    question: "Who is known as 'The King of Clay' in tennis?",
    answers: [
      { text: "Roger Federer", correct: false },
      { text: "Novak Djokovic", correct: false },
      { text: "Andy Murray", correct: false },
      { text: "Rafael Nadal", correct: true },
    ],
  },
  {
    question: "Which ball is used in the game of hockey?",
    answers: [
      { text: "Tennis ball", correct: false },
      { text: "Leather ball", correct: false },
      { text: "Hard plastic ball", correct: true },
      { text: "Rubber ball", correct: false },
    ],
  },
  {
    question: "In which country did the Olympic Games originate?",
    answers: [
      { text: "Italy", correct: false },
      { text: "Greece", correct: true },
      { text: "France", correct: false },
      { text: "Germany", correct: false },
    ],
  },
  {
    question:
      "What do you call three goals scored by a player in a single football match?",
    answers: [
      { text: "Hat-trick", correct: true },
      { text: "Triple", correct: false },
      { text: "Trio", correct: false },
      { text: "Treble", correct: false },
    ],
  },
  {
    question: "In which sport is the term 'Love' used for zero?",
    answers: [
      { text: "Football", correct: false },
      { text: "Tennis", correct: true },
      { text: "Golf", correct: false },
      { text: "Badminton", correct: false },
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

