const quizData = [
    {
        question: "Which brand's iconic slogan is 'Just Do It.'?",
        answers: [
            { text: "Adidas", correct: false },
            { text: "Nike", correct: true },
            { text: "Puma", correct: false },
            { text: "Reebok", correct: false },
        ],
    },
    {
        question: "The four interlocking rings in the Audi logo symbolize what?",
        answers: [
            { text: "The four wheels of a car", correct: false },
            { text: "The four continents where they sell cars", correct: false },
            { text: "Four previously independent motor companies", correct: true },
            { text: "The four founders of the company", correct: false },
        ],
    },
    {
        question: "The iconic green and white Starbucks logo features what mythical creature?",
        answers: [
            { text: "Mermaid (Siren)", correct: true },
            { text: "Griffin", correct: false },
            { text: "Phoenix", correct: false },
            { text: "Dragon", correct: false },
        ],
    },
    {
        question: "What company was originally called 'Cadabra' before changing its name?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "eBay", correct: false },
            { text: "Google", correct: false },
            { text: "Amazon", correct: true },
        ],
    },
    {
        question: "Which fast-food chain has the slogan 'Have It Your Way'?",
        answers: [
            { text: "McDonald's", correct: false },
            { text: "Burger King", correct: true },
            { text: "KFC", correct: false },
            { text: "Subway", correct: false },
        ],
    },
    {
        question: "The small number '31' is subtly hidden within the logo of which ice cream brand?",
        answers: [
            { text: "Haagen-Dazs", correct: false },
            { text: "Baskin Robbins", correct: true },
            { text: "Ben & Jerry's", correct: false },
            { text: "Kwality Walls", correct: false },
        ],
    },
    {
        question: "Which brand's tagline is 'The Taste of India'?",
        answers: [
            { text: "Nestlé", correct: false },
            { text: "Britannia", correct: false },
            { text: "Amul", correct: true },
            { text: "Parle-G", correct: false },
        ],
    },
    {
        question: "The founders of which technology company initially worked for Amazon before starting their own business?",
        answers: [
            { text: "Flipkart", correct: true },
            { text: "Swiggy", correct: false },
            { text: "Zomato", correct: false },
            { text: "Paytm", correct: false },
        ],
    },
    {
        question: "Which luxury fashion house is known for its interlocking 'C' logo?",
        answers: [
            { text: "Gucci", correct: false },
            { text: "Dior", correct: false },
            { text: "Chanel", correct: true },
            { text: "Louis Vuitton", correct: false },
        ],
    },
    {
        question: "The name of which computer company is derived from the large number, 10 to the power of 100?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "IBM", correct: false },
            { text: "Google", correct: true },
            { text: "Apple", correct: false },
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

