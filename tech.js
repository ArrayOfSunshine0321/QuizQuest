const quizData = [
  {
    question: "What does CPU stand for in computing?",
    answers: [
      { text: "Control Processing Unit", correct: false },
      { text: "Central Processing Unit", correct: true },
      { text: "Central Personal Unit", correct: false },
      { text: "Computer Personal Unit", correct: false },
    ],
  },
  {
    question: "What does WWW stand for in the virtual world of computers?",
    answers: [
      { text: "World Without Windows", correct: false },
      { text: "World Wide Web", correct: true },
      { text: "World Wide Warehouse", correct: false },
      { text: "World Wide Web Applications", correct: false },
    ],
  },
  {
    question: "Who is known as the father of computers?",
    answers: [
      {text: "Alan Turing", correct:false},
      {text: "Steve Jobs", correct:false},
      {text: "Bill Gates", correct:false},
      {text: "Charles Babbage", correct:true},
    ],
  },
  {
    question: "What does RAM stand for?",
    answers: [
      {text: "Random Access Memory", correct:true},
      {text: "Read Access Memory", correct:false},
      {text: "Real-time Application Management", correct:false},
      {text: "Random Access Mainframe", correct:false},
    ],
  },
  {
    question: "Which of these is a popular web browser used to access the internet?",
    answers:[
      {text: "Microsoft Edge", correct:false},
      {text: "Mozilla Firefox", correct:false},
      {text: "Google Chrome", correct:true},
      {text: "Opera", correct:false},
    ],
  },
  {
    question: "What does the `USB` in USB port stand for?",
    answers:[
      {text: "Universal System Button", correct:false},
      {text: "Universal Serial Bus", correct:true},
      {text: "Uniform Service Base", correct:false},
      {text: "Unique Storgage Bay", correct:false},
    ],
  },
  {
    question: "What is a URL?",
    answers: [
      {text: "The address of a website", correct:true},
      {text: "A kind of email program", correct:false},
      {text: "A device to speed up the internet", correct:false},
      {text: "A type of computer virus", correct:false},
    ],
  },
  {
    question: "What is the purpose of an antivirus program?",
    answers: [
      {text: "To help you browse the internet", correct:false},
      {text: "To help you create documents", correct:false},
      {text: "To protect your computer from harmful software", correct:true},
      {text: "To make your computer run faster", correct:false},
    ],
  },
  {
    question: "What does Wi-Fi allow you to do?",
    answers: [
      {text: "Take pictures", correct:false},
      {text: "Listen to music without headphones", correct:false},
      {text: "Connect to the internet wirelessly", correct:true},
      {text: "Charge your phone", correct:false},
    ],
  },
  {
    question: "What is a file extension?",
    answers: [
      {text: "The name of a folder", correct:false},
      {text: "The date a file was created", correct:false},
      {text: "The size of a file", correct:false},
      {text: "The type of a file (like .jpg or .doc)", correct:true},
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

