const quizData = [
  {
    question: "Who was the founder of the Vijayanagara Empire?",
    answers: [
      { text: "Ashoka", correct: false },
      { text: "Krishnadevraya", correct: false },
      { text: "Samudragupta", correct: false },
      { text: "Harihara I", correct: true },
    ],
  },
  {
    question: "Which reformer established the Widow Remarriage Association?",
    answers: [
      { text: "Raja Ram Mohan Roy", correct: false },
      { text: "Ishwar Chandra Vidyasagarb", correct: true },
      { text: "B.R. Ambedkar", correct: false },
      { text: "Jyotirao Phule", correct: false },
    ],
  },
  {
    question: "The Swadeshi Movement was launched in response to which event?",
    answers: [
      {text: "The Revolt of 1857", correct:false},
      {text: "The Drain of Wealth theory", correct:false},
      {text: "The Battle of Plassey", correct:false},
      {text: "The Partition of Bengal", correct:true},
    ],
  },
  {
    question: "Where did Mahatma Gandhi first employ his satyagraha principles?",
    answers: [
      {text: "Champaran", correct:true},
      {text: "Kheda", correct:false},
      {text: "Dandi", correct:false},
      {text: "Bardoli", correct:false},
    ],
  },
  {
    question: "Who was the first governor-general of independent India?",
    answers:[
      {text: "Lord Mountbatten", correct:true},
      {text: "C.Rajagopalachari", correct:false},
      {text: "Sardar Vallabhbhai Patel", correct:false},
      {text: "Jawaharlal Nehru", correct:false},
    ],
  },
  {
    question: "Which ancient civilization built the pyramids at Giza?",
    answers:[
      {text: "Mayans", correct:false},
      {text: "Greek", correct:false},
      {text: "Egyptians", correct:true},
      {text: "Romans", correct:false},
    ],
  },
  {
    question: "What was the name of the devastating plague that swept through Europe in the 14th century?",
    answers: [
      {text: "The Black Death", correct:true},
      {text: "The Great Schism", correct:false},
      {text: "The Great Famine", correct:false},
      {text: "The Hundred Years' War", correct:false},
    ],
  },
  {
    question: "The Cold War was a period of increased tension and confrontation between which two major powers?",
    answers: [
      {text: "Germany and the USSR", correct:false},
      {text: "Britain and France", correct:false},
      {text: "USA and the USSR", correct:true},
      {text: "USA and China", correct:false},
    ],
  },
  {
    question: "The Great Bath was discovered at which Indus Valley Civilization site?",
    answers: [
      {text: "Kalibangan", correct:false},
      {text: "Lothal", correct:false},
      {text: "Harappa", correct:false},
      {text: "Mohenjo-Daro", correct:true},
    ],
  },
  {
    question: "Which Gupta ruler was called the `Napoleon of India` for his military conquests?",
    answers: [
      {text: "Kumaragupta", correct:false},
      {text: "Samudragupta", correct:true},
      {text: "Chandragupta I", correct:false},
      {text: "Skandagupta", correct:false},
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

