const quizData = [
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Leonardo Da Vinci", correct: true },
      { text: "Vincent van gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Claude Monet", correct: false },
    ],
  },
  {
    question: "What are the three primary colors in art?",
    answers: [
      { text: "Red, yellow, and green", correct: false },
      { text: "Black, white, and gray", correct: false },
      { text: "Red, yellow, and blue", correct: true },
      { text: "Green, orange, and purple", correct: false },
    ],
  },
  {
    question: "What is the element of art that refers to the surface feel of an object, like smooth, rough, or soft?",
    answers: [
      {text: "Colour", correct:false},
      {text: "Shape", correct:false},
      {text: "Line", correct:false},
      {text: "Texture", correct:true},
    ],
  },
  {
    question: "What do you get when you mix the colors red and yellow?",
    answers: [
      {text: "Brown", correct:false},
      {text: "Green", correct:false},
      {text: "Orange", correct:true},
      {text: "Purple", correct:false},
    ],
  },
  {
    question: "What is a flat surface that an artist uses to mix paints?",
    answers:[
      {text: "A Canvas", correct:false},
      {text: "A Palette", correct:true},
      {text: "A frame", correct:false},
      {text: "A Paintbrush", correct:false},
    ],
  },
  {
    question: "What do you call a three-dimensional artwork, like a statue, that you can walk around and view from all sides?",
    answers:[
      {text: "A collage", correct:false},
      {text: "A sculpture", correct:true},
      {text: "A mosaic", correct:false},
      {text: "A painting", correct:false},
    ],
  },
  {
    question: "What is the traditional Japanese art of paper folding?",
    answers: [
      {text: "Origami", correct:true},
      {text: "Ikebana", correct:false},
      {text: "Bonsai", correct:false},
      {text: "Manga", correct:false},
    ],
  },
  {
    question: "What is a quick, rough drawing made before the final artwork?",
    answers: [
      {text: "A sketch", correct:true},
      {text: "A mural", correct:false},
      {text: "A print", correct:false},
      {text: "An etching", correct:false},
    ],
  },
    {
    question: "What is a piece of art that is made by gluing different materials, like paper, fabric, and photos, onto a surface?",
    answers: [
      {text: "A print", correct:false},
      {text: "A collage", correct:true},
      {text: "A Fresco", correct:false},
      {text: "A mosaic", correct:false},
    ],
  },
    {
    question: "What term describes a drawing or painting of a collection of inanimate objects, like fruit in a bowl?",
    answers: [
      {text: "Potrait", correct:false},
      {text: "Landscape ", correct:false},
      {text: "Sketch", correct:false},
      {text: "Still Life", correct:true},
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

