const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const questionText = document.getElementById('question-text');
const optionsDiv = document.getElementById('options');
const scoreNum = document.getElementById('score');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const resultsScreen = document.getElementById('results-screen');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: "Mars"
  },
  {
    question: "What is the capital city of France?",
    options: ["Rome", "Madrid", "Paris", "Berlin"],
    answer: "Paris"
  },
  {
    question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide"
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  }
];

let score = 0;
let current = 0;

function startQuiz() {
    startScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const { question, options } = questions[current];

    progressText.textContent = `${current + 1} / ${questions.length}`;
    progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;

    questionText.textContent = question;
    optionsDiv.innerHTML =  options.map((option) => `
        <button class='option-btn'>${option}</button>
    `).join('');
}

function handleAnswer(a) {
    if (a.target.textContent.trim() === questions[current].answer) {
        score += 1;
        scoreNum.textContent = score;
        a.target.classList.add('correct');
    } else {
        a.target.classList.add('wrong');
    }

    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

    setTimeout(() => {
        current++
        if (current < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1)
}

function showResults() {
    questionScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');

    finalScore.textContent = score;
    switch((score)) {
        case 0: resultMessage.textContent = 'bad'; break;
        case 1: resultMessage.textContent = 'ugh'; break;
        case 2: resultMessage.textContent = 'meh'; break;
        case 3: resultMessage.textContent = 'decent'; break;
        case 4: resultMessage.textContent = 'good'; break;
        case 5: resultMessage.textContent = 'very good'; break;
    }
}

function restartQuiz() {
    score = 0;
    current = 0;
    resultsScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    scoreNum.textContent = 0;
}

startBtn.addEventListener('click', startQuiz);
optionsDiv.addEventListener('click', handleAnswer);
restartBtn.addEventListener('click', restartQuiz);