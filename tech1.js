const quizData = [
  {
    question: "What does HTTP stand for?",
    answers: [
      { text: "HyperText Transfer Protocol", correct: true },
      { text: "High-Level Transfer Program", correct: false },
      { text: "Hyperlink Tracing Protocol", correct: false },
      { text: "Home Page Text Protocol", correct: false },
    ],
  },
  {
    question: "Which of the following is a type of network that covers a large geographic area?",
    answers: [
      { text: "MAN (Metropolitan Area Network)", correct: false },
      { text: "LAN (Local Area Network)", correct: false },
      { text: " PAN (Personal Area Network)", correct: false },
      { text: "WAN (Wide Area Network)", correct: true },
    ],
  },
  {
    question: "Which programming language is commonly used for developing Android applications?",
    answers: [
      {text: "Swift", correct:false},
      {text: "Java", correct:true},
      {text: "Python", correct:false},
      {text: "C#", correct:false},
    ],
  },
  {
    question: "What does GUI stand for?",
    answers: [
      {text: "Graphical User Interface", correct:true},
      {text: "Graphical User Integration", correct:false},
      {text: "General User Interface", correct:false},
      {text: "Grouped User Interaction", correct:false},
    ],
  },
  {
    question: "Which of these is an example of an open-source operating system?",
    answers:[
      {text: "iOS", correct:false},
      {text: "MacOs", correct:false},
      {text: "Linux", correct:true},
      {text: "Windows", correct:false},
    ],
  },
  {
    question: "Which of the following is an example of system software?",
    answers:[
      {text: "Adobe Photoshop", correct:false},
      {text: "Windows Operating System", correct:true},
      {text: "Google Chrome", correct:false},
      {text: "Microsoft Word", correct:false},
    ],
  },
  {
    question: "What does DNS stand for?",
    answers: [
      {text: "Domain Name Serve", correct:true},
      {text: "Digital Network Standard", correct:false},
      {text: "Data Network System", correct:false},
      {text: "Dynamic Name Service", correct:false},
    ],
  },
  {
    question: "What does SQL stand for?",
    answers: [
      {text: "Sequential Query Language", correct:false},
      {text: "Structured Query Logic", correct:false},
      {text: "Structured Query Language", correct:true},
      {text: "Standard Query Language", correct:false},
    ],
  },
  {
    question: "In programming, what is the role of a compiler?",
    answers: [
      {text: "To manage network connections", correct:false},
      {text: "To execute code line by line", correct:false},
      {text: "To store data temporarily", correct:false},
      {text: "To translate high-level code into machine code before execution", correct:true},
    ],
  },
  {
    question: "What is malware?",
    answers: [
      {text: "A type of hardware device", correct:false},
      {text: "Software designed to harm or exploit computer systems", correct:true},
      {text: "A method of data backup", correct:false},
      {text: "A security protocol for networking", correct:false},
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

