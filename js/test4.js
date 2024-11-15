const quizData = [
    {
        question: "What should you do if you encounter fog while driving?",
        answers: ["Use high beams for better visibility", "Increase your speed to pass through quickly", "Use low beams and fog lights if available", "Drive with your hazard lights on"],
        correct: 2
    },
    {
        question: "Why is it important to reduce your speed when driving on wet roads?",
        answers: ["To test your vehicle's traction", "To avoid hydroplaning", "To challenge yourself", "To make other drivers follow your pace"],
        correct: 1
    },
    {
        question: "How can you prepare your vehicle for driving in snowy conditions?",
        answers: ["Deflate your tires slightly", "Use summer tires for better grip", "Ensure proper tire tread depth and use winter tires if needed", "Don't bother preparing, just drive carefully"],
        correct: 2
    },
    {
        question: "What should you do if your vehicle skids on ice?",
        answers: ["Brake suddenly to stop the skid", "Steer in the opposite direction of the skid", "Keep your foot off the brake and steer in the direction you want to go", "Accelerate to gain traction"],
        correct: 2
    },
    {
        question: "Why is it important to clear snow and ice from your vehicle before driving?",
        answers: ["To make your vehicle look clean", "To avoid a ticket from law enforcement", "To prevent accidents and improve visibility", "To see how fast you can drive"],
        correct: 2
    },
    {
        question: "What is the recommended distance to keep from snowplows?",
        answers: ["20 feet", "3 car lengths", "At least 200 feet", "Right behind them for a clear path"],
        correct: 2
    },
    {
        question: "When driving in heavy rain, what can you do to improve visibility?",
        answers: ["Drive faster to get out of the rain quickly", "Turn on your hazard lights", "Keep a safe following distance and use your windshield wipers", "Drive with your windows down"],
        correct: 2
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