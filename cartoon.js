const quizData = [
    {
        question: "What is the name of SpongeBob's best friend, a pink starfish?",
        answers: [
            { text: "Squidward", correct: false },
            { text: "Mr. Krabs", correct: false },
            { text: "Patrick Star", correct: true },
            { text: "Sandy Cheeks", correct: false },
        ],
    },
    {
        question: "Which cartoon cat is always chasing a mouse named Jerry?",
        answers: [
            { text: "Sylvester", correct: false },
            { text: "Tom", correct: true },
            { text: "Garfield", correct: false },
            { text: "Felix", correct: false },
        ],
    },
    {
        question: "What color is the skin of the main character in 'The Simpsons'?",
        answers: [
            { text: "Orange", correct: false },
            { text: "Yellow", correct: true },
            { text: "Green", correct: false },
            { text: "Pink", correct: false },
        ],
    },
    {
        question: "What superhero cartoon features a character named Batman?",
        answers: [
            { text: "Superman", correct: false },
            { text: "Justice League", correct: true },
            { text: "Teen Titans", correct: false },
            { text: "Spider-Man", correct: false },
        ],
    },
    {
        question: "The famous duck who constantly tries to get rich is named?",
        answers: [
            { text: "Donald Duck", correct: false },
            { text: "Daffy Duck", correct: false },
            { text: "Scrooge McDuck", correct: true },
            { text: "Plucky Duck", correct: false },
        ],
    },
    {
        question: "What is the name of the dog who solves mysteries with a group of teenagers in a van?",
        answers: [
            { text: "Pluto", correct: false },
            { text: "Scooby-Doo", correct: true },
            { text: "Goofy", correct: false },
            { text: "Astro", correct: false },
        ],
    },
    {
        question: "Which cartoon features two brothers who spend their summer building incredible inventions?",
        answers: [
            { text: "The Powerpuff Girls", correct: false },
            { text: "Adventure Time", correct: false },
            { text: "Phineas and Ferb", correct: true },
            { text: "Gravity Falls", correct: false },
        ],
    },
    {
        question: "Who is the main character who flies on a magic carpet in 'Aladdin'?",
        answers: [
            { text: "Jafar", correct: false },
            { text: "Aladdin", correct: true },
            { text: "Abu", correct: false },
            { text: "Genie", correct: false },
        ],
    },
    {
        question: "Which fairy tale character wears a red hood?",
        answers: [
            { text: "Cinderella", correct: false },
            { text: "Little Red Riding Hood", correct: true },
            { text: "Sleeping Beauty", correct: false },
            { text: "Rapunzel", correct: false },
        ],
    },
    {
       question: "The little wooden puppet whose nose grows when he lies is named...",
        answers: [
            { text: "Geppetto", correct: false },
            { text: "Jiminy", correct: false },
            { text: "Pinocchio", correct: true },
            { text: "Bambi", correct: false },
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

