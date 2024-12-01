const GRID_SIZE = 4; // Size of the grid
let board = []; // Game board
let score = 0; // Player's score
let scoreElement = document.querySelector('.middle button p'); // Score element in UI
let newElement = document.querySelector('.right button'); // New Game button
let h1 = document.querySelector('h1');
let container = document.querySelector('.game-container');

// Variables for touch support
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Threshold for swipe detection
const SWIPE_THRESHOLD = 30; // Minimum distance in pixels for a valid swipe

// Initialize the game board
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


// Add a random tile (2 or 4) to an empty position on the board
function addRandomTile() {
    let emptyTiles = [];
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (board[r][c] === 0) {
                emptyTiles.push({ r, c });
            }
        }
    }
    if (emptyTiles.length) {
        const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4; // 90% chance for 2
    }
}

// Update the UI to reflect the current state of the board
function updateBoard() {
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach((cell, index) => {
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;
        cell.textContent = board[row][col] !== 0 ? board[row][col] : '';
        cell.className = 'grid-cell'; // Reset class
        if (board[row][col] > 0) {
            cell.classList.add(`tile-${board[row][col]}`); // Add class based on value
        } else {
            cell.classList.add('empty'); // Optionally add an empty class
        }
    });

    scoreElement.innerText = score; // Update the score element in UI
    localStorage.setItem('2048Game', JSON.stringify({ board, score })); // Save game state
}

// Handle movement of tiles based on user input
function move(direction) {
    let moved = false;
    let tempBoard = board.map(row => row.slice()); // Create a copy of the board

    const slideTiles = (row, col, rowInc, colInc) => {
        let currentRow = row;
        let currentCol = col;
        while (true) {
            const nextRow = currentRow + rowInc;
            const nextCol = currentCol + colInc;
            if (nextRow < 0 || nextRow >= GRID_SIZE || nextCol < 0 || nextCol >= GRID_SIZE) break;
            if (tempBoard[nextRow][nextCol] === 0) {
                tempBoard[nextRow][nextCol] = tempBoard[currentRow][currentCol];
                tempBoard[currentRow][currentCol] = 0;
                currentRow = nextRow;
                currentCol = nextCol;
                moved = true;
            } else if (tempBoard[nextRow][nextCol] === tempBoard[currentRow][currentCol]) {
                tempBoard[nextRow][nextCol] *= 2;
                score += tempBoard[nextRow][nextCol];
                tempBoard[currentRow][currentCol] = 0;
                moved = true;
                break;
            } else {
                break;
            }
        }
    };

    if (direction === 'left') {
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (tempBoard[r][c] !== 0) {
                    slideTiles(r, c, 0, -1);
                }
            }
        }
    } else if (direction === 'right') {
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = GRID_SIZE - 1; c >= 0; c--) {
                if (tempBoard[r][c] !== 0) {
                    slideTiles(r, c, 0, 1);
                }
            }
        }
    } else if (direction === 'up') {
        for (let c = 0; c < GRID_SIZE; c++) {
            for (let r = 0; r < GRID_SIZE; r++) {
                if (tempBoard[r][c] !== 0) {
                    slideTiles(r, c, -1, 0);
                }
            }
        }
    } else if (direction === 'down') {
        for (let c = 0; c < GRID_SIZE; c++) {
            for (let r = GRID_SIZE - 1; r >= 0; r--) {
                if (tempBoard[r][c] !== 0) {
                    slideTiles(r, c, 1, 0);
                }
            }
        }
    }

    if (moved) {
        board = tempBoard; // Update the board only if a move was made
        addRandomTile(); // Add a new tile after a successful move
        updateBoard(); // Update the UI
        checkGameOver(); // Check if the game is over
    }
}

// Check if the game is over
function checkGameOver() {
    const isGameOver = board.flat().every(cell => cell !== 0) && !canMove();
    if (isGameOver) {
        container.classList.add('over'); // Add game over class
        h1.classList.add('over'); // Add game over class to title
        alert('Game Over!'); // Alert the user
    }
}

// Check if there are any valid moves left
function canMove() {
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (board[r][c] === 0) return true; // Empty tile found
            if (c < GRID_SIZE - 1 && board[r][c] === board[r][c + 1]) return true; // Right
            if (r < GRID_SIZE - 1 && board[r][c] === board[r + 1][c]) return true; // Down
        }
    }
    return false; // No moves left
}

// Event listeners for keyboard input
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
    }
});

// Event listener for touch events
document.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
});

// Handle swipe gestures
function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX > 0) move('right');
        else move('left');
    } else if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        if (deltaY > 0) move('down');
        else move('up');
    }
}

// New game button event listener
newElement.addEventListener('click', () =>{
    debugger
    initGame()
});


initGame();