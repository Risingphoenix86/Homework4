var rootEl = document.getElementById('root');
var containerEl = document.getElementById('main-container');
var scoreForm = document.getElementById('initial-form');
var initialsText = document.getElementById('initials-text');
var startButton = document.getElementById('start-btn');
var scoreButton = document.getElementById('score-link');
var welcomeButton = document.getElementById('welcome-button')
var welcomeDiv = document.getElementById('welcome-div');
var quizDiv = document.getElementById('quiz-div');
var scoreDiv = document.getElementById('score-div');
var quizEndDiv = document.getElementById('quiz-end');
var scoreList = document.getElementById('scores');
var timerLeft = document.getElementById('time-left');

var timer;
var timeLeft = 60;
var question = 0;
var answer = 0;
var ansResult;
var miniTime;
var miniTimeCount = 5;
var scores = [];

init();


function init() {
    clearContainer();
    showWelcome();
}

function clearContainer() {
    welcomeDiv.style.display = "none";
    quizDiv.style.display = "none";
    scoreDiv.style.display = 'none';
    quizEndDiv.style.display = 'none';
    scoreList.innerHTML = '';
}

function showScores() {
    clearContainer();
    scoreDiv.style.display = 'block';
    scores = JSON.parse(localStorage.getItem('scores'));

    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];
        var li = document.createElement('li');
        li.textContent = score;
        li.setAttribute('data-index', i);
        scoreList.appendChild(li);
    }
    
}

function showWelcome() {
    clearContainer();
    welcomeDiv.style.display = 'block';
    
}

function startQuiz() {
    clearContainer();
    quizDiv.style.display = 'block';
    
    question = 0;
    timeLeft = 60;
    nextQuestion();
}

function nextQuestion() {
    question++;
    switch (question) {
        case 1:
            quizDiv.children[0].textContent = "Question 1:";
            quizDiv.children[1].textContent = "What type of variable holds the values true or false?";
            quizDiv.children[2].textContent = "1. Integer";
            quizDiv.children[3].textContent = "2. String";
            quizDiv.children[4].textContent = "3. Boolean";
            quizDiv.children[5].textContent = "4. Number";
            answer = 'btn-3';
            console.log('1');
            break;
        case 2:
            quizDiv.children[0].textContent = "Question 2:";
            quizDiv.children[1].textContent = "When sectioning HTML divisions, what is the <p> used for?";
            quizDiv.children[2].textContent = "1. Portion";
            quizDiv.children[3].textContent = "2. Paragraph";
            quizDiv.children[4].textContent = "3. Position";
            quizDiv.children[5].textContent = "4. Point";
            answer = 'btn-2';
            console.log('2');
            break;
        case 3:
            quizDiv.children[0].textContent = "Question 3:";
            quizDiv.children[1].textContent = "When you want to do a strict comparison between two variables, what opperator do you use?";
            quizDiv.children[2].textContent = "1. ===";
            quizDiv.children[3].textContent = "2. ==";
            quizDiv.children[4].textContent = "3. <>=";
            quizDiv.children[5].textContent = "4. !==";
            answer = 'btn-1';
            console.log('3');
            break;
        case 4:
            quizDiv.children[0].textContent = "Question 4:";
            quizDiv.children[1].textContent = "When using mathematical operators, what does '--' mean?";
            quizDiv.children[2].textContent = "1. New Variable";
            quizDiv.children[3].textContent = "2. Decrement value by 1";
            quizDiv.children[4].textContent = "3. Subtract 2";
            quizDiv.children[5].textContent = "4. Clear Value";
            answer = 'btn-2';
            console.log('4');
            break;
        default:
            console.log('reached');
            quizEnd();

    }
}

function checkAnswer(val) {
    if (val === answer) {
        ansResult = true;
        nextQuestion();
    } else {
        if ((timeLeft - 10) < 0 ) {
           timeLeft = 0; 
        } else {
            timeLeft - 10;
        }
        ansResult = false;
        nextQuestion();
    }
}

function quizTimer() {
    timer = setInterval(function() {
        timeLeft--;
        timerLeft.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            quizEnd();
        }
    }, 1000);
}

function answerTimer() {
    var answerDiv = document.getElementById('answer-slot');
    miniTime = setInterval(function() {
        miniTimeCount--;
        if (ansResult) {
            answerDiv.textContent = "Correct!";
        } else {
            answerDiv.textContent = "Wrong!";
        }
        if (miniTimeCount === 0 ) {
            clearInterval;
            answerDiv.textContent = '';
        }
    }, 1000);
}

function quizEnd() {
    clearContainer();
    quizEndDiv.style.display = 'block';
}

function storeScores() {
    localStorage.setItem('scores', JSON.stringify(scores));
}

scoreForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var scoreInitial = initialsText.value.trim();
    if (scoreInitial === '') {
        return;
    }
    scores.push(scoreInitial + '- ' + timeLeft);
    initialsText.value = '';

    storeScores();
    showWelcome();
});

quizDiv.addEventListener('click', function(event) {
    var element = event.target;
    if (element.matches('button') === true) {
        checkAnswer(element.id);
    }
});

startButton.addEventListener('click', startQuiz);

scoreButton.addEventListener('click', showScores);

welcomeButton.addEventListener('click', showWelcome);
