const quizData = [
    {
    question: "What should you do to reduce glare from headlights of oncoming vehicles at night?",
    answers: ["Look directly at the headlights", "Use your high beams", "Focus on the right edge of the road", "Close your eyes briefly"],
    correct: 2
},
{
    question: "Why is it important to dim your dashboard lights while driving at night?",
    answers: ["To save battery power", "To reduce distractions", "To increase visibility", "To alert other drivers"],
    correct: 1
},
{
    question: "What should you do if an animal suddenly appears on the road at night?",
    answers: ["Illuminate the animal with high beams", "Swerve to avoid hitting it", "Brake firmly and sound your horn", "Accelerate to scare it away"],
    correct: 2
},
{
    question: "How can you reduce the risk of drowsy driving during nighttime trips?",
    answers: ["Drink caffeinated beverages", "Drive with windows open for fresh air", "Take breaks and rest when needed", "Listen to loud music"],
    correct: 2
},
{
    question: "What should you do if you are blinded by the headlights of a vehicle behind you?",
    answers: ["Slow down suddenly", "Adjust your rearview mirror", "Wave your hand out the window", "Change your driving direction"],
    correct: 1
},
{
    question: "Why is it advisable to drive more slowly at night?",
    answers: ["To save fuel", "To enjoy the scenery", "To avoid wildlife", "To have more time to react to hazards"],
    correct: 3
},
{
    question: "What is an effective way to detect pedestrians or cyclists at night?",
    answers: ["Use night vision goggles", "Rely solely on streetlights", "Scan the road ahead and use reflective clothing", "Honk your horn frequently"],
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