const quizData = [
    {
        question: "What is one key tip for driving in adverse weather conditions?",
        answers: ["Check your phone", "Speed up on wet roads", "Avoid sudden maneuvers and maintain a smooth driving style", "Drive close to the vehicle in front of you"],
        correct: 2
    },
    {
        question: "Why is it important to check weather forecasts before your journey in adverse weather?",
        answers: ["To see if it's sunny outside", "To know if you need sunglasses", "To avoid driving in severe weather if possible", "To challenge yourself"],
        correct: 2
    },
    {
        question: "What should you carry in your vehicle for winter driving?",
        answers: ["Beach gear", "Snow shovel and ice scraper", "Surfboard", "Flip flops"],
        correct: 1
    },
    {
        question: "Why is it crucial to use headlights in low visibility conditions like fog or heavy rain?",
        answers: ["To make your vehicle invisible", "To reduce fuel consumption", "To make your vehicle more visible to others", "To blind other drivers"],
        correct: 2
    },
    {
        question: "What is the recommended following distance in adverse weather conditions?",
        answers: ["1 second", "2 seconds", "3 seconds", "4 seconds"],
        correct: 3
    },
    {
        question: "When driving on icy roads, what should you avoid doing?",
        answers: ["Accelerating quickly", "Braking suddenly", "Turning the steering wheel rapidly", "Maintaining a constant speed"],
        correct: 1
    },
    {
        question: "What should you do if you start to skid on a wet road?",
        answers: ["Brake hard", "Steer in the opposite direction of the skid", "Close your eyes", "Speed up"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const answers = document.querySelectorAll('.answer');
    answers.forEach((answer, index) => {
        const span = answer.nextElementSibling;
        span.textContent = currentQuestion.answers[index];
        answer.checked = false;
        answer.disabled = false;
    });
    document.getElementById('nextButton').disabled = true;
    document.getElementById('result').textContent = '';
}

function checkAnswer(selected) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selected === currentQuestion.correct) {
        score++;
    }
    document.querySelectorAll('.answer').forEach(answer => answer.disabled = true);
    document.getElementById('nextButton').disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        calculateResult(); 
    }
}

function calculateResult() {
    const scorePercentage = (score / quizData.length) * 100;
    if (scorePercentage >= 60) {
        document.getElementById("myModal").style.display = "block"; 
    } else {
        document.getElementById("notPass").style.display = "block"; 
    }
}


document.getElementById("openPop").onclick = function() {
    calculateResult();
}


document.querySelectorAll(".close-btn").forEach(btn => {
    btn.onclick = function() {
        btn.closest('.modal').style.display = "none";
    };
});


window.onclick = function(event) {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
    }
}

loadQuestion();