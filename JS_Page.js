const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setnextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setnextQuestion();
    quizScore = 0;
}

function setnextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct === 'true');
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.classList.add('hide'); // Hide nextButton on last question
        startButton.innerText = 'Restart';
        startButton.classList.remove("hide");
    }

    if (correct) {
        quizScore++;
    }
    document.getElementById('right-answers').innerHTML = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Which one of these is a Javascript Framework?',
        answers: [
            { text: 'Bootstrap', correct: false },
            { text: 'Django', correct: false },
            { text: 'React js', correct: true },
            { text: 'MongoDB', correct: false },
        ],
    },
    {
        question: 'Who is the Current Prime Minister of India?',
        answers: [
            { text: 'Manmohan Singh', correct: false },
            { text: 'Narendra Modi', correct: true },
            { text: 'Ramnath Kovind', correct: false },
            { text: 'Droupadi Murmu', correct: false },
        ],
    },
    {
        question: 'What will be The Result of this Expression 4+9?',
        answers: [
            { text: '13', correct: true },
            { text: '17', correct: false },
            { text: '12', correct: false },
            { text: '11', correct: false },
        ],
    },
    {
        question: 'Which is the capital city of Karnataka?',
        answers: [
            { text: 'Belgavi', correct: false },
            { text: 'Mysuru', correct: false },
            { text: 'Bengaluru', correct: true },
            { text: 'Chennai', correct: false },
        ],
    },
];
