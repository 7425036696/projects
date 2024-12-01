let selectedWordObj;
let guessedLetters = [];
let incorrectGuesses = 0;
const maxAttempts = 6;
let img = document.querySelector('.left img');
const wordDisplay = document.querySelector('.w-display');
const hintDisplay = document.querySelector('.hint b');
const incorrectGuessesDisplay = document.querySelector('.g-text b');
const modalMessage = document.querySelector('.content p');
const playAgainButton = document.querySelector('.play-again');
let img2 = new Image(); // Image for victory or defeat
const modal = document.querySelector('.modal'); // Assuming modal exists in the HTML

// Initialize game
function initGame() {
    // Reset the game board and score
    board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0)); // Reset board to all zeros
    score = 0; // Reset score

    // Add two random tiles to the board
    addRandomTile();
    addRandomTile();

    // Update the UI with the new board state and score
    updateBoard();

    // Remove any "game over" state from the UI
    container.classList.remove('over'); // Remove game over class
    h1.classList.remove('over'); // Remove game over class from title
}


// Select a new word randomly from the word list
function selectNewWord() {
    selectedWordObj = wordList[Math.floor(Math.random() * wordList.length)];
}

// Update the word display and save game state to localStorage
function updateDisplay() {
    wordDisplay.innerHTML = '';
    const letters = selectedWordObj.word.split('');
    letters.forEach(letter => {
        const li = document.createElement('li');
        li.className = 'letter';
        li.textContent = guessedLetters.includes(letter) ? letter : '';
        if (guessedLetters.includes(letter)) {
            li.classList.add('guessed');
        }
        wordDisplay.appendChild(li);
    });
    incorrectGuessesDisplay.textContent = incorrectGuesses;
    localStorage.setItem('hangmanGame', JSON.stringify({
        selectedWordObj,
        guessedLetters,
        incorrectGuesses,
        imgSrc: img.src // Save image source to localStorage
    }));
    checkGameStatus();
}

// Handle letter guess
function handleGuess(letter) {
    if (!guessedLetters.includes(letter) && incorrectGuesses < maxAttempts) {
        guessedLetters.push(letter);
        if (!selectedWordObj.word.includes(letter)) {
            incorrectGuesses++;
            img.src = `/assests/hangman-${incorrectGuesses}.svg`; // Change image according to incorrect guesses
        }
        updateDisplay();
    }
}

// Check the game status (win or loss)
function checkGameStatus() {
    if (incorrectGuesses >= maxAttempts) {
        img2.src = '/assests/lost.gif'; // Change img2 to lost.gif on defeat
        showGameOver(); // Show game over animation
    } else if (selectedWordObj.word.split('').every(letter => guessedLetters.includes(letter))) {
        img2.src = '/assests/victory.gif'; // Change img2 to victory.gif on win
        showModal('Congratulations! You guessed the word!');
        playAgainButton.style.display = 'block'; // Show the button on victory
        playAgainButton.classList.add('block'); // Add block class
    }
}

// Show game over animation
function showGameOver() {
    playAgainButton.style.display = 'block'; // Show play again button
    playAgainButton.classList.add('block'); // Add block class
    document.querySelector('.left').children[0].remove(); // Remove existing hangman image

    // Add hangman body and animate
    document.querySelector('.left').insertAdjacentHTML('beforeend', `<svg height="400" width="400">
        <g id="body">
            <g id="head">
                <circle cx="200" cy="80" r="20" stroke="black" stroke-width="4" fill="white"/>
                <g id="rEyes">
                    <circle cx="193" cy="80" r="4"/>
                    <circle cx="207" cy="80" r="4"/>
                </g>
                <g id="xEyes" class="hide">
                    <line x1="190" y1="78" x2="196" y2="84"/>
                    <line x1="204" y1="78" x2="210" y2="84"/>
                    <line x1="190" y1="84" x2="196" y2="78"/>
                    <line x1="204" y1="84" x2="210" y2="78"/>
                </g>
            </g>
            <line x1="200" y1="100" x2="200" y2="150" />
            <line id="armL" x1="200" y1="120" x2="170" y2="140" />
            <line id="armR" x1="200" y1="120" x2="230" y2="140" />
            <line id="legL" x1="200" y1="150" x2="180" y2="190" />
            <line id="legR" x1="200" y1="150" x2="220" y2="190" />
        </g>
        <line x1="10" y1="250" x2="150" y2="250" />
        <line id="door1" x1="150" y1="250" x2="200" y2="250" />
        <line id="door2" x1="200" y1="250" x2="250" y2="250" />
        <line x1="250" y1="250" x2="390" y2="250" />
        <line x1="100" y1="250" x2="100" y2="20" />
        <line x1="100" y1="20" x2="200" y2="20" />
        <line id="rope" x1="200" y1="20" x2="200" y2="60" />
    </svg>`);

    // Start animation
    wos();
}

function wos() {
    dropBody();
    $("#rEyes").addClass("hide");
    $("#xEyes").removeClass("hide");
}

function dropBody() {
    $("#door1").velocity({ rotateZ: 90 }, 1000);
    $("#door2").velocity({ rotateZ: -90 }, 1000);
    fall();
}

function fall() {
    let dur = 500;
    let del = 1000;
    $("#body").velocity({ translateY: "200px" }, { duration: dur, delay: del });
    $("#rope").velocity({ y2: "+=200px" }, { duration: dur, delay: del });
    $("#armL").velocity({ y2: "-=60px" }, { duration: dur, delay: del });
    $("#armR").velocity({ y2: "-=60px" }, { duration: dur, delay: del });
    finish();
}

function finish() {
    $("#armL").velocity({ y2: "+=70px", x2: "+=10px" }, 500);
    $("#armR").velocity({ y2: "+=70px", x2: "-=10px" }, 500);
}

// Restart the game on play again
playAgainButton.addEventListener('click', () => {
    localStorage.removeItem('hangmanGame'); // Clear saved game
    let img = new Image()
    document.querySelector('.left').innerHTML = ''; 
    img.src = '/assests/hangman-0.svg';
    document.querySelector('.left').append(img)
     // Reset the hangman image to the initial state
 // Clear the existing hangman SVG
    initGame(); // Start a new game
});

// Event listener for letter buttons
document.querySelectorAll('.letter-button').forEach(button => {
    button.addEventListener('click', () => {
        handleGuess(button.textContent.toLowerCase());
    });
});

// Initialize the game
initGame();
 