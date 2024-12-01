const timerElement = document.querySelector('.timer');
const mainElement = document.querySelector('.main');
const optionss = document.querySelectorAll('.options div');
const question = document.querySelector('.question');
const next = document.querySelector('.next');
const scoreParagraph = document.querySelector('.score-paragraph');
const quesno = document.querySelector('.question-number');
const start = document.querySelector('.start');
const result = document.querySelector('.result');
const retry = document.querySelector('.retry');
const correctBar = document.querySelector('.correct-bar');
const correctPercentage = document.querySelector('.correct-percentage');
const wrongPercentage = document.querySelector('.wrong-percentage');
const attempted = document.querySelector('.attempted');
const pronounceIcon = document.querySelector('.icon');

// Variables
let intervalId, timerRunning = true, score = 0, index = 0;
let wrongAnswers = 0, attemptedCount = 0;
let isFirstAttempt = true;

// Function to pronounce the text
const pronounceText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
};

// Event listener for the pronounce icon
pronounceIcon.addEventListener('click', () => {
    const questionText = question.innerText;
    pronounceText(questionText);
});

// Helper: Show score paragraph
const showScoreParagraph = () => scoreParagraph?.classList.remove('hidden');

// Save quiz progress to localStorage
const saveProgress = () => {
    localStorage.setItem('quizProgress', JSON.stringify({
        index, score, wrongAnswers, attemptedCount,
    }));
};

// Update UI based on progress
const updateUI = () => {
    quesno.innerText = `${index + 1}/${questions.length}`;
    
    // Calculate correct and wrong percentages
    const correctPercentageValue = (score / questions.length) * 100;
    const wrongPercentageValue = 100 - correctPercentageValue;

    correctPercentage.innerText = `${correctPercentageValue.toFixed(2)}%`;
    wrongPercentage.innerText = `${wrongPercentageValue.toFixed(2)}%`;
    attempted.innerText = `${attemptedCount}/${questions.length}`;
    correctBar.style.width = `${correctPercentageValue}%`;

    scoreParagraph.innerText = `Score: ${score}/${questions.length}`;
    showScoreParagraph();
};

// Initialize progress from localStorage
if (localStorage.getItem('quizProgress')) {
    const savedData = JSON.parse(localStorage.getItem('quizProgress'));
    index = savedData.index || 0;
    score = savedData.score || 0;
    wrongAnswers = savedData.wrongAnswers || 0;
    attemptedCount = savedData.attemptedCount || 0;
    isFirstAttempt = false;
    updateUI();
}

// Start button click: Start quiz
start.addEventListener('click', () => {
    mainElement.classList.add('flex');
    start.classList.add('hidden');
    update();
    startTimer(30);
});

// Retry button click: Restart quiz
retry.addEventListener('click', () => {
    index = score = wrongAnswers = attemptedCount = 0;
    isFirstAttempt = true;

    correctPercentage.innerText = wrongPercentage.innerText = '0%';
    correctBar.style.width = '0%';
    attempted.innerText = `0/${questions.length}`;

    optionss.forEach(div => div.classList.remove('correct', 'wrong'));

    mainElement.classList.add('flex');
    result.classList.remove('flex');

    update();
    startTimer(30);

    localStorage.removeItem('quizProgress');
    showScoreParagraph();
});

// Update the current question and options
const update = () => {
    if (questions[index]) {
        quesno.innerText = `${index + 1}/${questions.length}`;
        question.innerText = questions[index].question;
        optionss.forEach((div, i) => {
            const optionText = questions[index].options[i].split(":")[1].trim();
            div.querySelector('span').innerText = optionText;
            div.classList.remove('correct', 'wrong');
            div.style.pointerEvents = 'auto';
        });
        saveProgress();
        updateUI();
    }
};

// Timer function
const startTimer = (duration) => {
    let timer = duration;
    clearInterval(intervalId);
    
    intervalId = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        timerElement.textContent =
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timer <= 15) mainElement.style.backgroundColor = '#D8DFB4';
        if (timer <= 5) mainElement.style.backgroundColor = '#DCADAD';

        if (--timer < 0) {
            clearInterval(intervalId);
            mainElement.style.backgroundColor = '';
            nextQuestion();
        }
    }, 1000);
};

// Handle next question logic
const nextQuestion = () => {
    index++;
    if (index >= questions.length) {
        result.classList.add('flex');
        mainElement.classList.remove('flex');
        mainElement.classList.add('hidden');
        updateUI();
        return;
    }
    update();
    startTimer(30);
    saveProgress();
};

// Handle option clicks
optionss.forEach(div => {
    div.addEventListener('click', (e) => {
        if (!timerRunning) return;

        const selectedOption = div.querySelector('span').innerText.trim();
        const correctOption = questions[index].answer;
        const correctOptionText = questions[index].options.find(option =>
            option.startsWith(correctOption)).split(":")[1].trim();

        // Check if the clicked option is correct
        if (selectedOption === correctOptionText) {
            div.classList.add('correct'); // Add 'correct' class to clicked option
            score++;
        } else {
            div.classList.remove('correct')
            div.classList.add('wrong'); // Add 'wrong' class to clicked option
            wrongAnswers++;
        }

        attemptedCount++;
        optionss.forEach(option => option.style.pointerEvents = 'none'); // Disable further clicks

        saveProgress();

        // Delay before moving to the next question
        setTimeout(() => {
            nextQuestion();
        }, 2000); // 2 seconds delay
    });
});


// Next button click
next.addEventListener('click', (e) => {
    e.preventDefault();
    nextQuestion();
});

// Initialize the quiz
update();
