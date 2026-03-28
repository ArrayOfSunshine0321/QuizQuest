const quizData = [
  {
    question: "Which planet is known as the Red Planet due to its reddish appearance?",
    answers: [
      { text: "Mercury", correct: false },
      { text: "Pluto", correct: false },
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
    ],
  },
  {
    question: "Who wrote the famous play 'Romeo and Juliet'?",
    answers: [
      { text: "Mark Twain", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Charles Dickens", correct: false },
      { text: "Jane Awsten", correct: false },
    ],
  },
  {
    question: "Which element has the chemical symbol 'O' in the periodic table?",
    answers: [
      {text: "Osmium", correct:false},
      {text: "Gold", correct:false},
      {text: "Oganesson", correct:false},
      {text: "Oxygen", correct:true},
    ],
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answers: [
      {text: "Japan", correct:true},
      {text: "Austria", correct:false},
      {text: "Korea", correct:false},
      {text: "Scotland", correct:false},
    ],
  },
  {
    question: "Who was the first woman to win a Nobel Prize?",
    answers:[
      {text: "Mother Teresa", correct:false},
      {text: "Marie Curie", correct:true},
      {text: "Pearl S Buck", correct:false},
      {text: "Jane Addams", correct:false},
    ],
  },
  {
    question: "Which gas is most abundant in the Earth's atmosphere?",
    answers:[
      {text: "Carbon Dioxide", correct:false},
      {text: "Oxygen", correct:false},
      {text: "Argon", correct:false},
      {text: "Nitrogen", correct:true},
    ],
  },
  {
    question: "Which ancient wonder was located in Alexandria, Egypt?",
    answers: [
      {text: "Colossus of Rhodes", correct:false},
      {text: "Temple of Artemis", correct:false},
      {text: "Lighthouse of Alexandria", correct:true},
      {text: "Hanging Gardens", correct:false},
    ],
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      {text: "Amazon River", correct:false},
      {text: "Mississippi River", correct:false},
      {text: "Nile River", correct:true},
      {text: "Yangtez River", correct:false},
    ],
  },
    {
    question: "What is the capital city of Brazil?",
    answers: [
      {text: "São Paulo", correct:false},
      {text: "Rio de Janeiro", correct:false},
      {text: "Salvador", correct:false},
      {text: "Brasilia", correct:true},
    ],
  },
    {
    question: "In which year did the Titanic sink after hitting an iceberg?",
    answers: [
      {text: "1912", correct:true},
      {text: "1890", correct:false},
      {text: "1905", correct:false},
      {text: "1898", correct:false},
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

