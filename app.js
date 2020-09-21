const QUIZ = {
    // 5 or more questions are required
    questions: [
        {
            question: 'Which artist sang "Millions While You Young?',
            answers: {
                a: 'Kendrick Lamar',
                b: 'Eminem',
                c: '50 Cent',
                d: 'Nipsey Hussle'
            },
            correctAnswer: 'd'
        },
        {
            question: 'Which album won Album Of The Year award in 2019?',
            answers: {
                a: 'Invasion of Privacy',
                b: 'The Lost Boy',
                c: 'Victory Lap',
                d: 'Championships'
            },
            correctAnswer: 'a'
        },
        {
            question: 'Who is the lead singer of Pearl Jam?',
            answers: {
                a: 'Paul McCartney',
                b: 'Eddie Vedder',
                c: 'Steven Harwell',
                d: 'George Michael'
            },
            correctAnswer: 'b'
        },
        {
            question: 'Where is rapper Kanye West from?',
            answers: {
                a: 'Chicago',
                b: 'New York',
                c: 'Berkeley',
                d: 'Denver'
            },
            correctAnswer: 'a'
        },
        {
            question: 'What year did MTV make its debut?',
            answers: {
                a: '1978',
                b: '1991',
                c: '1981',
                d: '1984'
            },
            correctAnswer: 'c'
        }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0,
    message: '',
    message2: '',
    ansCor: false

};

//Welcome Screen Template
function welcomeScreen() {
    const template =
        `<div class="welcome-section"></div>
    <h1 class = "ready-title">Are you ready to test those music skills?"</h1>
    <img src="images/ManGuitar.png"  alt ="man playing guitar">
    <div>
    <button class = "startbtn">Start Quiz</button>
    </div>`;
    return template;
}

//Button for start quiz
function startQuiz() {
    $(".startbtn").on("click", function () {
        QUIZ.quizStarted = true;
        render();
    });
}

//Generate Question Template
function generateQuestion(questionNumber) {
    let currentChoices = [];
    for (letter in QUIZ.questions[QUIZ.questionNumber].answers) {
        currentChoices.push(`<label><input type="radio" id = "${QUIZ.questions[QUIZ.questionNumber].answers[letter]}" name="radio" value="${letter}"> ${letter} : ${QUIZ.questions[QUIZ.questionNumber].answers[letter]}</label>`)
    }
    currentChoices.join(' ');
    return `<div class ="questions-div">
    <h3 class = "current-score">Current Score: ${QUIZ.score}</h3>
    <h2 class = "question-area">${QUIZ.questions[questionNumber].question}</h2>
    <h3 class = "question-counter">Question #${questionNumber + 1} out of ${QUIZ.questions.length}</h3>
    </div>
    <div class = "answers-div">
    <form id = "questions-form">
    ${currentChoices.join(' ')}
    <button type="submit" class = "nextbtn" >Continue</button>
    </form>
    <div class="alert-sect"></div>
    </div>`
}

function checkAnswer() {
    $(".nextbtn").click(function (evt) {
        evt.preventDefault();
        let correctAns = QUIZ.questions[QUIZ.questionNumber].correctAnswer;
        let ansName = QUIZ.questions[QUIZ.questionNumber].n
        let userAns = $(`input[name = "radio"]:checked`).val();
        QUIZ.ansCor = userAns === correctAns;
        if (QUIZ.ansCor) {
            QUIZ.score++;
            QUIZ.message = "You Got That Right!!!";
            QUIZ.message2 = "WOOHOOO!!! The Answer Was: " + userAns.toUpperCase() + ") " + QUIZ.questions[QUIZ.questionNumber].answers[userAns];
        } else if (userAns !== correctAns) {
            QUIZ.message = "You Got That Wrong :P!!!";
            QUIZ.message2 = "You Should Study!!!! <br/> Correct answer is: " + correctAns.toUpperCase() + ") " + QUIZ.questions[QUIZ.questionNumber].answers[correctAns] + "<br/> " + "You Selected: " + userAns.toUpperCase() + ") " + QUIZ.questions[QUIZ.questionNumber].answers[userAns];
        }
        if (!userAns) {
            $(".alert-sect").text("Please Select An Answer!");
        } else {
            if (QUIZ.questionNumber + 1 === QUIZ.questions.length) {
                QUIZ.questionNumber++;
                renderEnd();
            } else {
                QUIZ.questionNumber++;
                renderResults();
            }
        }
    })
}

function resultScreen() {
    let template = '';
    if (QUIZ.questionNumber === QUIZ.questions.length) {
        template =
            `<div class="welcome-section"></div>
    <h1 class = "ready-title">THANK YOU FOR TAKING THIS QUIZ!"</h1>
    <h3 class = "question-counter"> You Scored ${QUIZ.score} Out Of ${QUIZ.questions.length}</h3>
    <button class = "restartbtn">Try Again</button>
    <div>
    </div>`;
    } else {
        template = `<div class = "questions-div">
         <h3 class = "current-score">Current Score: ${QUIZ.score}</h3>
    <h2 class = "message-area1">${QUIZ.message}</h2>
    <h3 class = "message-area2 ${!QUIZ.ansCor ? 'message-area2Wrong' : 'message-area2Right'}">${QUIZ.message2}</h3>
    </div>
    <div class = "Anshere"></div>
    <div></div>
    <button class = "continuebtn">Continue</button>`;
    }
    return template;
}


function continueQuiz() {
    $(".continuebtn").on("click", function () {
        render();
    });
}

function restartQuiz() {
    $(".restartbtn").on("click", function () {
        QUIZ.quizStarted = false;
        QUIZ.score = 0;
        QUIZ.questionNumber = 0;
        render();
        startQuiz();
    });
}

function render() {
    let page = '';
    if (QUIZ.quizStarted === false) {
        page += welcomeScreen();
    } else {
        if (QUIZ.quizStarted === true) {
            page += generateQuestion(QUIZ.questionNumber);
        }
    }
    $("main").html(page);
    checkAnswer();
}

function renderResults() {
    let page = '';
    page += resultScreen();
    $("main").html(page);
    continueQuiz();
}

function renderEnd() {
    let page = '';
    page += resultScreen();
    $("main").html(page);
    restartQuiz();
}

function main() {
    render();
    startQuiz();
    checkAnswer();
}


$(main);
