const quizData = [
  {
    question: "Which of these films was NOT directed by **Sanjay Leela Bhansali**?",
    answers: [
      { text: "Bajirao Mastani", correct: false },
      { text: "Padmaavat", correct: false },
      { text: "Gangs of Wasseypur", correct: true },
      { text: "Devdas", correct: false },
    ],
  },
  {
    question: "Which actress became the first Indian to win the **Miss World** title in 1966?",
    answers: [
      { text: "Aishwarya Rai", correct: false },
      { text: "Zeenat Aman", correct: false },
      { text: "Reita Faria", correct: true },
      { text: "Sushmita Sen", correct: false },
    ],
  },
  {
    question: "Who Directed the Bollywood movie 'Lagaan'?",
    answers: [
      {text: "Mani Ratnam", correct:false},
      {text: "Anurag Kashyap", correct:false},
      {text: "Ashutosh Gowariker", correct:true},
      {text: "Aamir Khan", correct:false},
    ],
  },
  {
    question: "What is the genre of the movie 'Tumbbad'?",
    answers: [
      {text: "Sci-Fi", correct:false},
      {text: "Comedy", correct:false},
      {text: "Drama", correct:false},
      {text: "Horror", correct:true},
    ],
  },
  {
    question: "Which film has the famous train sequence song **'Chaiyya Chaiyya'**?",
    answers: [
      { text: "Dilwale Dulhania Le Jayenge", correct: false },
      { text: "Dhoom", correct: false },
      { text: "Dil Se..", correct: true },
      { text: "Chennai Express", correct: false },
    ],
  },
  {
    question: "Which film gave **A. R. Rahman** his first Academy Award (Oscar)?",
    answers: [
      { text: "Lagaan", correct: false },
      { text: "Bombay", correct: false },
      { text: "Slumdog Millionaire", correct: true },
      { text: "Roja", correct: false },
    ],
  },
  {
    question: "Which Actress Played the lead role in 'Queen'(2013)?",
    answers: [
      {text: "Kangana Ranuat", correct:true},
      {text: "Priyanka Chopra", correct:false},
      {text: "Shraddha Kapoor", correct:false},
      {text: "Kriti Sanon", correct:false},
    ],
  },
  {
    question: "Which film, based on the life of an athlete, stars Farhan Akhtar in the lead role?",
    answers: [
      { text: "Mary Kom", correct: false },
      { text: "Dangal", correct: false },
      { text: "Sultan", correct: false },
      { text: "Bhaag Milkha Bhaag", correct: true },
    ],
  },
  {
    question: "Which film featured the iconic song “Ghar More Pardesiya”?",
    answers: [
      {text: "Kalank", correct:true},
      {text: "Brahmastra", correct:false},
      {text: "Gangubai Kathiawadi", correct:false},
      {text: "RRR", correct:false},
    ],
  },
  {
    question: "The iconic actress **Hema Malini** is famously known by what nickname?",
    answers: [
      { text: "Tragedy Queen", correct: false },
      { text: "Dream Girl", correct: true },
      { text: "Dancing Queen", correct: false },
      { text: "Chandni", correct: false },
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

