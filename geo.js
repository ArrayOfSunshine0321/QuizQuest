const quizData = [
  {
    question: "Which country has the longest coastline in the world?",
    answers: [
      { text: "Russia", correct: false },
      { text: "Australia", correct: false },
      { text: "Canada", correct: true },
      { text: "Indonesia", correct: false },
    ],
  },
  {
    question: "The Nile River, traditionally considered the longest river in the world, is primarily associated with which continent?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Africa", correct: true },
      { text: "South America", correct: false },
      { text: "North America", correct: false },
    ],
  },
  {
    question: " Which is the smallest continent by land area?",
    answers: [
      {text: "North America", correct:false},
      {text: "Africa", correct:false},
      {text: "Asia", correct:false},
      {text: "Australia", correct:true},
    ],
  },
  {
    question: "Which Indian state is known as the ‘Spice Garden of India’?",
    answers: [
      {text: "Kerala", correct:true},
      {text: "Rajasthan", correct:false},
      {text: "Himachal Pradesh", correct:false},
      {text: "Assam", correct:false},
    ],
  },
  {
    question: "Which continent is the most populous?",
    answers:[
      {text: "Europe", correct:false},
      {text: "Asia", correct:true},
      {text: "Antarctica", correct:false},
      {text: "Africa", correct:false},
    ],
  },
  {
    question: "Where is the Sahara Desert located?",
    answers:[
      {text: "Europe", correct:false},
      {text: "America", correct:false},
      {text: "South Africa", correct:false},
      {text: "North Africa", correct:true},
    ],
  },
  {
    question: "Which river is known as the longest river in South America?",
    answers: [
      {text: "Mississippi River", correct:false},
      {text: "River Seine", correct:false},
      {text: "The Amazon River", correct:true},
      {text: "Yenisei River", correct:false},
    ],
  },
  {
    question: "Which country is known as the ‘Land of Thousand Lakes’?",
    answers: [
      {text: "Finland", correct:true},
      {text: "Scotland", correct:false},
      {text: "Sweden", correct:false},
      {text: "Norway", correct:false},
    ],
  },
    {
    question: "Which mountain range separates Europe and Asia?",
    answers: [
      {text: "The Atlas Mountains", correct:false},
      {text: "The Himalayas", correct:false},
      {text: "The Andes Mountain", correct:false},
      {text: "The Ural Mountains", correct:true},
    ],
  },
    {
    question: "What is the largest lake in Africa?",
    answers: [
      {text: "Lake Victoria", correct:true},
      {text: "Lake Albert ", correct:false},
      {text: "Lake Turkana", correct:false},
      {text: "Lake Mweru", correct:false},
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

