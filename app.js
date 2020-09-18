
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

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
    message2: ''

};

function questionSection(questionNumber) {
    let currentQuestion = QUIZ.questions[questionNumber].question;
    let questionArr = QUIZ.questions.length;
    const template =
        `<div class = "questions-div">
      <h2 class = "question-counter">Question #${questionNumber + 1} out of ${questionArr}</h2>
      <h3 class = "question-area">${currentQuestion}</h3>
      </div>
      <div class = "Anshere"></div>
      <div></div>`
    return template;
}

function answerSection(questionNumber) {
    let currentChoices = [];

    for (letter in QUIZ.questions[questionNumber].answers) {
        currentChoices.push(`<label><input type="radio" name="radio" value="${letter}"> ${letter} : ${QUIZ.questions[questionNumber].answers[letter]}</label>`)
    }
    // add this question and its answers to the output
    const template = `<div class = "answers-div">${currentChoices.join(' ')}
    </div>
    <div></div>
    <button class = "nextbtn">Next Question</button>`
    return template;
}

function alertSection() {
    const template =
    `<div class="alert-sect"></div>`;
    return template;
}
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

function resultScreen(){
    const template =
        `<div class="welcome-section"></div>
    <h1 class = "ready-title">THANK YOU FOR TAKING THIS QUIZ!"</h1>
    <h3 class = "question-area"> You Scored ${QUIZ.score} Out Of ${QUIZ.questions.length}</h3>
    <div>
    </div>`;
    return template;
}

function checkAnswer(correctAns) {
    $(".nextbtn").click(function () {
        let correctAns = QUIZ.questions[QUIZ.questionNumber].correctAnswer;
        let userAns = $(`input[name = "radio"]:checked`).val();
        if(userAns === correctAns){
            QUIZ.score ++;
            QUIZ.message = "You Got That Right!!!";
            QUIZ.message2 = "WOOHOOO!!!";
        }else if(userAns !== correctAns){
            QUIZ.message = "You Got That Wrong :P!!!";
            QUIZ.message2 = "You Should Study!!!!";
        }
        if (!userAns) {
            $(".alert-sect").text("Please Select An Answer!");
        } else {
            if (QUIZ.questionNumber + 1 === QUIZ.questions.length) {
                QUIZ.questionNumber ++;
                renderEnd();
            } else {
                QUIZ.questionNumber ++;
                renderResults();
            }
        }
    })
    const template = `<div class = "questions-div">
                <h2 class = "message-area1">${QUIZ.message}</h2>
                <h3 class = "message-area2">${QUIZ.message2}</h3>
                </div>
                <div class = "Anshere"></div>
                <div></div>
                <button class = "continuebtn">Continue</button>`;
                return template;
}

function continueQuiz(){
    $(".continuebtn").on( "click", function() {
        render();
        console.log("clicked")
    });
}
function startQuiz(){
    $(".startbtn").on( "click", function() {
        QUIZ.quizStarted = true;
        render();
        console.log("clicked")
    });
}

function render() {
    let page = '';
    if (QUIZ.quizStarted === false) {
        page += welcomeScreen();
    } else {
        if (QUIZ.quizStarted === true) {
            page += questionSection(QUIZ.questionNumber) + answerSection(QUIZ.questionNumber) + alertSection();
        }
    }
    $("main").html(page);
    checkAnswer();
}

function renderResults() {
    let page = '';
    let correctAns = QUIZ.questions[QUIZ.questionNumber].correctAnswer;
    page += checkAnswer(correctAns);
    $("main").html(page);
    continueQuiz();
}

function renderEnd(){
    let page = '';
    page += resultScreen();
    $("main").html(page);
    checkAnswer();
}

function main() {
    render();
    startQuiz();
    checkAnswer();
}


$(main);
