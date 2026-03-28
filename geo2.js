const quizData = [
  {
    question: "The *Great Barrier Reef* is located off the coast of which country?",
    answers: [
      { text: "South Africa", correct: false },
      { text: "Mexico", correct: false },
      { text: "Canada", correct: false },
      { text: "Australia", correct: true },
    ],
  },
  {
    question: "Which country is both an island and a continent?",
    answers: [
      { text: "Australia", correct: true },
      { text: "Japan", correct: false },
      { text: "Greenland", correct: false },
      { text: "Madagascar", correct: false },
    ],
  },
  {
    question: "Which mountain range is home to **Mount Everest**, the world's highest peak?",
    answers: [
      { text: "The Andes", correct: false },
      { text: "The Rocky Mountains", correct: false },
      { text: "The Himalayas", correct: true },
      { text: "The Alps", correct: false },
    ],
  },
  {
    question: "What is the name of the **largest desert** in the world?",
    answers: [
      { text: "The Sahara Desert", correct: false },
      { text: "The Arabian Desert", correct: false },
      { text: "The Gobi Desert", correct: false },
      { text: "Antarctica (a polar desert)", correct: true },
    ],
  },
  {
    question: "Which ocean is the **largest and deepest** in the world?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "What is the capital city of Canada?",
    answers:[
      {text: "Toronto", correct:false},
      {text: "Ottawa", correct:true},
      {text: "Montreal", correct:false},
      {text: "Vancouver", correct:false},
    ],
  },
  {
    question: "Which major river flows through the city of Cairo?",
    answers: [
      {text: "Tigris River", correct:false},
      {text: "River Seine", correct:false},
      {text: "River Nile", correct:false},
      {text: "Euphrates River", correct:true},
    ],
  },
  {
    question: "The country of **Chile** is notable for its shape, often described as being very...",
    answers: [
      { text: "Wide", correct: false },
      { text: "Flat", correct: false },
      { text: "Long and narrow", correct: true },
      { text: "Square", correct: false },
    ],
  },
    {
    question: "What is the term for a large, flat area of land that is generally higher than the surrounding land?",
    answers: [
      { text: "Valley", correct: false },
      { text: "Plateau", correct: true },
      { text: "Plain", correct: false },
      { text: "Delta", correct: false },
    ],
  },
    {
    question: "Which sea is known for its high **salt content** that allows people to float easily?",
    answers: [
      { text: "Caspian Sea", correct: false },
      { text: "Baltic Sea", correct: false },
      { text: "Dead Sea", correct: true },
      { text: "Black Sea", correct: false },
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

