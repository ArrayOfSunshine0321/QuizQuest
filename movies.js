const quizData = [
  {
    question: "Who Directed the Bollywood movie '3 Idiots'?",
    answers: [
      { text: "Rajkumar Hirani", correct: true },
      { text: "Karan Johar", correct: false },
      { text: "Sanjay Leela Bhansali", correct: false },
      { text: "Aamir Khan", correct: false },
    ],
  },
  {
    question: "Which acclaimed South Indian film director is behind hits like **'Baahubali'** and **'RRR'**?",
    answers: [
      { text: "Mani Ratnam", correct: false },
      { text: "S. S. Rajamouli", correct: true },
      { text: "Shankar", correct: false },
      { text: "Priyadarshan", correct: false },
    ],
  },
  {
    question: "Who played the lead role in the Bollywood movie 'Lagaan'?",
    answers: [
      {text: "Shah Rukh Khan", correct:false},
      {text: "Amitabh Bachchan", correct:false},
      {text: "Akshay Kumar", correct:false},
      {text: "Aamir Khan", correct:true},
    ],
  },
  {
    question: "The popular song **'Senorita'** is from which film, featuring Hrithik Roshan and Farhan Akhtar?",
    answers: [
      { text: "Zindagi Na Milegi Dobara", correct: true },
      { text: "Dil Dhadakne Do", correct: false },
      { text: "Bang Bang!", correct: false },
      { text: "Kites", correct: false },
    ],
  },
  {
    question: "Who played the lead role in the Bollywood Movie 'Swades'?",
    answers:[
      {text: "Shah Rukh Khan", correct:true},
      {text: "Amitabh Bachchan", correct:false},
      {text: "Shahid Kapoor", correct:false},
      {text: "Varun Dhawan", correct:false},
    ],
  },
  {
    question: "Who is famously known as the **'Angry Young Man'** of Indian Cinema?",
    answers: [
      { text: "Dilip Kumar", correct: false },
      { text: "Rajesh Khanna", correct: false },
      { text: "Dharmendra", correct: false },
      { text: "Amitabh Bachchan", correct: true },
    ],
  },
  {
    question: "Which famous South Indian actor is often referred to as **'Thalaivar'** (The Boss)?",
    answers: [
      { text: "Kamal Haasan", correct: false },
      { text: "Chiranjeevi", correct: false },
      { text: "Rajinikanth", correct: true },
      { text: "Ajith Kumar", correct: false },
    ],
  },
  {
    question: "Which Bollywood actor is known for his roles in movies like 'Chak De India' and 'Om Shanti Om'?",
    answers: [
      {text: "RajKumar Rao", correct:false},
      {text: "Pankaj Tripathi", correct:false},
      {text: "Shah Rukh Khan", correct:true},
      {text: "Ranveer Singh", correct:false},
    ],
  },
    {
    question: "The term **'Tollywood'** is most commonly used to refer to the cinema of which language?",
    answers: [
      { text: "Tamil", correct: false },
      { text: "Malayalam", correct: false },
      { text: "Telugu", correct: true },
      { text: "Kannada", correct: false },
    ],
  },
    {
    question: "Which Indian actress is known for her roles in films like 'Fashion' and 'Barfi'?",
    answers: [
      {text: "Priyanka Chopra", correct:true},
      {text: "Deepika Padukone", correct:false},
      {text: "Kangana Ranaut", correct:false},
      {text: "Katrina Kaif", correct:false},
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

