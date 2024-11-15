const quizData = [
    {
        question: "What should you do if your vehicle starts to hydroplane?",
        answers: ["Brake suddenly", "Speed up", "Steer straight and ease off the gas pedal", "Turn the steering wheel sharply"],
        correct: 2
    },
    {
        question: "What is the recommended following distance in ideal driving conditions?",
        answers: ["1 second", "2 seconds", "3 seconds", "4 seconds"],
        correct: 2
    },
    {
        question: "What should you do if you experience a tire blowout while driving?",
        answers: ["Brake hard to stop quickly", "Steer in the opposite direction of the blowout", "Gradually slow down and pull off the road", "Accelerate to regain control"],
        correct: 2
    },
    {
        question: "When driving at night, how should you adjust your speed?",
        answers: ["Drive faster than during the day", "Drive slower than during the day", "Maintain the same speed as during the day", "Depends on road conditions"],
        correct: 1
    },
    {
        question: "What does the 'two-second rule' help with while driving?",
        answers: ["Avoiding traffic congestion", "Keeping a safe following distance", "Predicting weather changes", "Navigating roundabouts"],
        correct: 1
    },
    {
        question: "Why is it important to check your blind spots before changing lanes?",
        answers: ["To make other drivers aware of your intentions", "To avoid rear-end collisions", "To prevent side-impact crashes", "To ensure no vehicles are next to you"],
        correct: 3
    },
    {
        question: "What should you do if you encounter a tailgater behind you?",
        answers: ["Brake suddenly to teach them a lesson", "Speed up to create more distance", "Change lanes if possible to let them pass", "Ignore them and continue driving normally"],
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