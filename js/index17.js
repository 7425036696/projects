const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        let index = cell.getAttribute('data-index');
        
        if (gameState[index] !== '' || !gameActive) {
            return; // Cell already taken or game is not active
        }

        gameState[index] = currentPlayer;
        cell.innerText = currentPlayer;

        checkResult();
    });
});

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningPatterns.length; i++) {
        const [a, b, c] = winningPatterns[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusDisplay.textContent = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState.fill('');
    
    cells.forEach(cell => {
        cell.innerText = '';
        statusDisplay.textContent = '';
    });
}