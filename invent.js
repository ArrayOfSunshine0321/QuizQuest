const quizData = [
  {
    question: " Who is known as the 'father of the computer' for designing the first mechanical computer?",
    answers: [
      { text: "Marie Curie", correct: false },
      { text: "Charles Babbage", correct: true },
      { text: "Albert Einstein", correct: false },
      { text: "Tim Berners-Lee", correct: false },
    ],
  },
  {
    question: "Who invented the light bulb?",
    answers: [
      { text: "Nikola Tesla", correct: false },
      { text: "Benjamin Franklin", correct: false },
      { text: "Thomas Edison", correct: true },
      { text: "Albert Einstein", correct: false },
    ],
  },
  {
    question: "Which invention are the Wright brothers famous for?",
    answers: [
      {text: "The telephone", correct:false},
      {text: "The printing press", correct:false},
      {text: "The steam engine", correct:false},
      {text: "The airplane", correct:true},
    ],
  },
  {
    question: "Who invented the telephone?",
    answers: [
      {text: "Alexander Graham Bell", correct:true},
      {text: "Guglielmo Marconi", correct:false},
      {text: "Thomas Edison", correct:false},
      {text: "Henry Moseley", correct:false},
    ],
  },
  {
    question: "What did Johannes Gutenberg invent around 1440?",
    answers:[
      {text: "The steam engine", correct:false},
      {text: "The printing press", correct:true},
      {text: "The radio", correct:false},
      {text: "The telephone", correct:false},
    ],
  },
  {
    question: "Which scientist discovered penicillin?",
    answers:[
      {text: "Louis Pasteur", correct:false},
      {text: "Edward Jenner", correct:false},
      {text: "Alexander Fleming", correct:true},
      {text: "Robert Koch", correct:false},
    ],
  },
  {
    question: "What is Marie Curie famous for discovering?",
    answers: [
      {text: "X-rays", correct:false},
      {text: "Penicillin", correct:false},
      {text: "Radioactivity", correct:true},
      {text: "Electricity", correct:false},
    ],
  },
  {
    question: "Who invented the first commercially successful typewriter?",
    answers: [
      {text: "Christopher Latham Sholes", correct:true},
      {text: "Charles Babbage", correct:false},
      {text: "Elias Howe", correct:false},
      {text: "Samuel Morse", correct:false},
    ],
  },
    {
    question: "Who invented the first practical sewing machine in the 1840s?",
    answers: [
      {text: "Isaac Singer", correct:false},
      {text: "Walter Hunt", correct:false},
      {text: "Thomas Saint", correct:false},
      {text: "Elias Howe", correct:true},
    ],
  },
    {
    question: "Which scientist is known for developing the process of pasteurization?",
    answers: [
      {text: "Louis Pasteur", correct:true},
      {text: "Edward Jenner", correct:false},
      {text: "Alexander Fleming", correct:false},
      {text: "Robert Koch", correct:false},
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

