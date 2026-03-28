const quizData = [
  {
    question: "Which technology company has a famous logo featuring a **partially bitten fruit**?",
    answers: [
      { text: "Samsung", correct: false },
      { text: "Microsoft", correct: false },
      { text: "Apple", correct: true },
      { text: "Dell", correct: false },
    ],
  },
  {
    question: "The automobile brand **Toyota** originated in which country?",
    answers: [
      { text: "Germany", correct: false },
      { text: "South Korea", correct: false },
      { text: "Japan", correct: true },
      { text: "United States", correct: false },
    ],
  },
  {
    question: "Which soft drink brand is famously associated with a **red and white Santa Claus** during the holidays? ",
    answers: [
      { text: "Pepsi", correct: false },
      { text: "Sprite", correct: false },
      { text: "Coca-Cola", correct: true },
      { text: "Fanta", correct: false },
    ],
  },
  {
    question: "Which luxury fashion house is known for its **interlocking 'CC'** logo?",
    answers: [
      { text: "Dior", correct: false },
      { text: "Gucci", correct: false },
      { text: "Chanel", correct: true },
      { text: "Prada", correct: false },
    ],
  },
  {
    question: "Which sporting goods retailer uses the slogan, '**Just Do It**'?",
    answers: [
      { text: "Adidas", correct: false },
      { text: "Puma", correct: false },
      { text: "Nike", correct: true },
      { text: "Under Armour", correct: false },
    ],
  },
  {
    question: "The colorful plastic interlocking bricks brand is called...",
    answers: [
      { text: "Mega Bloks", correct: false },
      { text: "Playmobil", correct: false },
      { text: "LEGO", correct: true },
      { text: "Knex", correct: false },
    ],
  },
  {
    question: "Which fast-food chain is famous for its **'Big Mac'** sandwich?",
    answers: [
      { text: "Burger King", correct: false },
      { text: "Wendy's", correct: false },
      { text: "McDonald's", correct: true },
      { text: "Subway", correct: false },
    ],
  },
  {
    question: "Which streaming service has a distinctive **red 'N'** logo?",
    answers: [
      { text: "Hulu", correct: false },
      { text: "Disney+", correct: false },
      { text: "Amazon Prime Video", correct: false },
      { text: "Netflix", correct: true },
    ],
  },
  {
    question: "Which international coffee chain's logo features a **green siren** (mermaid)?",
    answers: [
      { text: "Costa Coffee", correct: false },
      { text: "Starbucks", correct: true },
      { text: "Tim Hortons", correct: false },
      { text: "Dunkin'", correct: false },
    ],
  },
  {
    question: "Which famous breakfast cereal brand features a tiger named **Tony** as its mascot?",
    answers: [
      { text: "Cheerios", correct: false },
      { text: "Froot Loops", correct: false },
      { text: "Frosted Flakes (Kellogg's)", correct: true },
      { text: "Trix", correct: false },
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

