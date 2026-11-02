const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Mumbai", correct: false },
      { text: "New Delhi", correct: true },
      { text: "Kolkata", correct: false },
      { text: "Chennai", correct: false },
    ],
  },
  {
    question: "How many days are there in a week?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false },
    ],
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    answers: [
      { text: "Tiger", correct: false },
      { text: "Lion", correct: true },
      { text: "Elephant", correct: false },
      { text: "Leopard", correct: false },
    ],
  },
  {
    question: "How many colors are there in a rainbow?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false },
    ],
  },
  {
    question: "Which gas do humans need to breathe?",
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Carbon Dioxide", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "Which is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "How many legs does a spider have?",
    answers: [
      { text: "4", correct: false },
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "10", correct: false },
    ],
  },
  {
    question: "Which language is used to structure web pages?",
    answers: [
      { text: "CSS", correct: false },
      { text: "HTML", correct: true },
      { text: "Python", correct: false },
      { text: "C++", correct: false },
    ],
  },
  {
    question: "What is 10 multiplied by 5?",
    answers: [
      { text: "40", correct: false },
      { text: "45", correct: false },
      { text: "50", correct: true },
      { text: "55", correct: false },
    ],
  },
  {
    question: "Which is the fastest land animal?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Horse", correct: false },
      { text: "Cheetah", correct: true },
      { text: "Deer", correct: false },
    ],
  },
  {
    question: "Which device is used to type on a computer?",
    answers: [
      { text: "Monitor", correct: false },
      { text: "Keyboard", correct: true },
      { text: "Speaker", correct: false },
      { text: "Mouse", correct: false },
    ],
  },
  {
    question: "What is the boiling point of water at sea level?",
    answers: [
      { text: "50°C", correct: false },
      { text: "75°C", correct: false },
      { text: "100°C", correct: true },
      { text: "150°C", correct: false },
    ],
  },
  {
    question: "Which month comes after March?",
    answers: [
      { text: "February", correct: false },
      { text: "April", correct: true },
      { text: "May", correct: false },
      { text: "June", correct: false },
    ],
  },
  {
    question: "Which company developed the Windows operating system?",
    answers: [
      { text: "Apple", correct: false },
      { text: "Google", correct: false },
      { text: "Microsoft", correct: true },
      { text: "Amazon", correct: false },
    ],
  },
  {
    question: "Which data type is used for true or false values in JavaScript?",
    answers: [
      { text: "String", correct: false },
      { text: "Number", correct: false },
      { text: "Boolean", correct: true },
      { text: "Object", correct: false },
    ],
  },
];

let currentQuestionIndex=0;
let score=0;
let answerDisabled=false;

totalQuestionsSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

startButton.addEventListener('click',startQuiz);
restartButton.addEventListener("click",restartQuiz);

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    scoreSpan.textContent=0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}


function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}