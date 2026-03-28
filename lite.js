const quizData = [
    {
        question: "Which children's book features a young wizard named Harry Potter?",
        answers: [
            { text: "The Hobbit", correct: false },
            { text: "The Chronicles of Narnia", correct: false },
            { text: "Harry Potter and the Philosopher's Stone", correct: true },
            { text: "Alice in Wonderland", correct: false },
        ],
    },
    {
        question: "Who is the author of the popular mystery novels featuring the detective Hercule Poirot?",
        answers: [
            { text: "Arthur Conan Doyle", correct: false },
            { text: "Agatha Christie", correct: true },
            { text: "Edgar Allan Poe", correct: false },
            { text: "Dan Brown", correct: false },
        ],
    },
    {
        question: "What animal is a central character in George Orwell's famous political satire 'Animal Farm'?",
        answers: [
            { text: "Dog", correct: false },
            { text: "Horse", correct: false },
            { text: "Pig", correct: true },
            { text: "Sheep", correct: false },
        ],
    },
    {
        question: "Which fictional town is the setting for Harper Lee's novel 'To Kill a Mockingbird'?",
        answers: [
            { text: "New York City", correct: false },
            { text: "Maycomb, Alabama", correct: true },
            { text: "Gatsby, New York", correct: false },
            { text: "St. Petersburg, Missouri", correct: false },
        ],
    },
    {
        question: "Which of the following is a book of poems written by Rabindranath Tagore?",
        answers: [
            { text: "Midnight’s Children", correct: false },
            { text: "The Guide", correct: false },
            { text: "Gitanjali", correct: true },
            { text: "Train to Pakistan", correct: false },
        ],
    },
    {
        question: "What type of footwear does the character Cinderella famously lose?",
        answers: [
            { text: "Golden Sandals", correct: false },
            { text: "Glass Slipper", correct: true },
            { text: "Red Shoes", correct: false },
            { text: "Leather Boot", correct: false },
        ],
    },
    {
        question: "Which classic children's book features a girl named Alice who falls down a rabbit hole?",
        answers: [
            { text: "The Wind in the Willows", correct: false },
            { text: "Peter Pan", correct: false },
            { text: "Alice's Adventures in Wonderland", correct: true },
            { text: "Winnie-the-Pooh", correct: false },
        ],
    },
    {
        question: "In the novel 'The Lord of the Rings', what is the name of the Hobbit protagonist?",
        answers: [
            { text: "Merry Brandybuck", correct: false },
            { text: "Samwise Gamgee", correct: false },
            { text: "Frodo Baggins", correct: true },
            { text: "Pippin Took", correct: false },
        ],
    },
    {
        question: "Which author is famous for his stories about a boy who wouldn't grow up, named Peter Pan?",
        answers: [
            { text: "A. A. Milne", correct: false },
            { text: "J. M. Barrie", correct: true },
            { text: "Lewis Carroll", correct: false },
            { text: "Roald Dahl", correct: false },
        ],
    },
    {
        question: "Which Indian author wrote the novel 'The God of Small Things'?",
        answers: [
            { text: "Salman Rushdie", correct: false },
            { text: "Vikram Seth", correct: false },
            { text: "Arundhati Roy", correct: true },
            { text: "Jhumpa Lahiri", correct: false },
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

