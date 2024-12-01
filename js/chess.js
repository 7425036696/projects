const initialPositions = {
    '1-1': '/assests/Brook', '1-2': '/assests/Bknight', '1-3': '/assests/Bbishop', '1-4': '/assests/Bqueen',
    '1-5': '/assests/Bking', '1-6': '/assests/Bbishop', '1-7': '/assests/Bknight', '1-8': '/assests/Brook',
    '2-1': '/assests/Bpawn', '2-2': '/assests/Bpawn', '2-3': '/assests/Bpawn', '2-4': '/assests/Bpawn',
    '2-5': '/assests/Bpawn', '2-6': '/assests/Bpawn', '2-7': '/assests/Bpawn', '2-8': '/assests/Bpawn',
    '7-1': '/assests/Wpawn', '7-2': '/assests/Wpawn', '7-3': '/assests/Wpawn', '7-4': '/assests/Wpawn',
    '7-5': '/assests/Wpawn', '7-6': '/assests/Wpawn', '7-7': '/assests/Wpawn', '7-8': '/assests/Wpawn',
    '8-1': '/assests/Wrook', '8-2': '/assests/Wknight', '8-3': '/assests/Wbishop', '8-4': '/assests/Wqueen',
    '8-5': '/assests/Wking', '8-6': '/assests/Wbishop', '8-7': '/assests/Wknight', '8-8': '/assests/Wrook'
};

const chessBoard = document.querySelector('.chess-board');
let selectedPiece = null; // Store the selected piece to move
let currentTurn = 'white'; // Track whose turn it is, 'white' or 'black'
let pawnMoved = { 'W': {}, 'B': {} }; // Track if a pawn has already moved for each color

// Function to reset highlighted squares
const resetHighlightedSquares = () => {
    const highlighted = document.querySelectorAll('.highlight');
    highlighted.forEach(square => {
        square.classList.remove('highlight');
        const circle = square.querySelector('.highlight-circle');
        if (circle) {
            circle.remove();
        }
    });
};

// Function to handle the turn change
const switchTurn = () => {
    currentTurn = currentTurn === 'white' ? 'black' : 'white';
};

// Add pieces and set up the board
for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
        const square = document.createElement('div');
        square.id = `square-${row}-${col}`;
        square.className = 'square ' + ((row + col) % 2 === 0 ? 'white' : 'black');

        // Add a piece if present in initialPositions
        const piece = initialPositions[`${row}-${col}`];
        if (piece) {
            const img = document.createElement('img');
            img.src = piece + '.png'; // Assuming images are stored in the "assests" folder
            img.className = 'piece';
            square.appendChild(img);

            // Add click listener for pieces
            square.addEventListener('click', () => {
                // Prevent the piece from being selected if it's not the player's turn
                if ((currentTurn === 'white' && !piece.includes('W')) || (currentTurn === 'black' && !piece.includes('B'))) {
                    return; // Not the correct turn
                }

                resetHighlightedSquares(); // Reset any previous highlights

                selectedPiece = { element: img, currentPosition: `${row}-${col}`, pieceType: piece.split('/').pop().split('.')[0] };
                
                const isWhite = selectedPiece.pieceType.includes('W');
                const direction = isWhite ? -1 : 1; // White pawns move up, black pawns move down
                const currentPosition = selectedPiece.currentPosition;

                // Check piece movement
                if (selectedPiece.pieceType.includes('pawn')) {
                    handlePawnMovement(row, col, direction, isWhite);
                } else if (selectedPiece.pieceType.includes('rook')) {
                    handleRookMovement(row, col);
                } else if (selectedPiece.pieceType.includes('knight')) {
                    handleKnightMovement(row, col);
                } else if (selectedPiece.pieceType.includes('bishop')) {
                    handleBishopMovement(row, col);
                } else if (selectedPiece.pieceType.includes('queen')) {
                    handleQueenMovement(row, col);
                } else if (selectedPiece.pieceType.includes('king')) {
                    handleKingMovement(row, col);
                }
            });
        }

        chessBoard.appendChild(square);
    }
}

// Movement Handlers for different pieces
const handlePawnMovement = (row, col, direction, isWhite) => {
    const currentPosition = `${row}-${col}`;
    const nextSquare1 = `${row + direction}-${col}`;
    const nextSquare2 = `${row + (2 * direction)}-${col}`;

    // Check if the pawn can move one or two squares based on whether it has moved before
    if (isWhite && !pawnMoved['W'][currentPosition]) {
        highlightSquare(nextSquare1);
        highlightSquare(nextSquare2);
    } else if (!isWhite && !pawnMoved['B'][currentPosition]) {
        highlightSquare(nextSquare1);
        highlightSquare(nextSquare2);
    } else {
        highlightSquare(nextSquare1);
    }
};

// Handle Rook Movement
const handleRookMovement = (row, col) => {
    // Rooks move in straight lines along rows or columns
    highlightStraightMovement(row, col, 8);
};

// Handle Knight Movement
const handleKnightMovement = (row, col) => {
    // Knights move in "L" shape (2 squares in one direction, 1 square perpendicular)
    const knightMoves = [
        [row - 2, col + 1], [row - 2, col - 1], [row + 2, col + 1], [row + 2, col - 1],
        [row - 1, col + 2], [row - 1, col - 2], [row + 1, col + 2], [row + 1, col - 2]
    ];

    knightMoves.forEach(([r, c]) => {
        if (isValidMove(r, c)) {
            highlightSquare(`${r}-${c}`);
        }
    });
};

// Handle Bishop Movement
const handleBishopMovement = (row, col) => {
    // Bishops move diagonally
    highlightDiagonalMovement(row, col, 8);
};

// Handle Queen Movement
const handleQueenMovement = (row, col) => {
    // Queen moves like both a rook and a bishop
    highlightStraightMovement(row, col, 8);
    highlightDiagonalMovement(row, col, 8);
};

// Handle King Movement
const handleKingMovement = (row, col) => {
    const kingMoves = [
        [row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1],
        [row - 1, col - 1], [row - 1, col + 1], [row + 1, col - 1], [row + 1, col + 1]
    ];

    kingMoves.forEach(([r, c]) => {
        if (isValidMove(r, c)) {
            highlightSquare(`${r}-${c}`);
        }
    });
};

// Helper functions for movement
const isValidMove = (r, c) => {
    return r >= 1 && r <= 8 && c >= 1 && c <= 8;
};

const highlightStraightMovement = (row, col, range) => {
    // Highlight vertical and horizontal squares (Rook & Queen movement)
    for (let i = 1; i <= range; i++) {
        if (i !== row) highlightSquare(`${i}-${col}`);
        if (i !== col) highlightSquare(`${row}-${i}`);
    }
};

const highlightDiagonalMovement = (row, col, range) => {
    // Highlight diagonal squares (Bishop & Queen movement)
    for (let i = 1; i <= range; i++) {
        if (row + i <= 8 && col + i <= 8) highlightSquare(`${row + i}-${col + i}`);
        if (row - i >= 1 && col + i <= 8) highlightSquare(`${row - i}-${col + i}`);
        if (row + i <= 8 && col - i >= 1) highlightSquare(`${row + i}-${col - i}`);
        if (row - i >= 1 && col - i >= 1) highlightSquare(`${row - i}-${col - i}`);
    }
};

// Function to highlight squares
const highlightSquare = (squareId) => {
    const square = document.getElementById(`square-${squareId}`);
    if (square) {
        square.classList.add('highlight');
        const circle = document.createElement('div');
        circle.classList.add('highlight-circle');
        square.appendChild(circle);

        // When the circle is clicked, move the piece
        circle.addEventListener('click', () => {
            const oldSquare = document.getElementById(`square-${selectedPiece.currentPosition}`);
            oldSquare.innerHTML = ''; // Clear the square (removes the image)

            // Move the image to the new square
            square.appendChild(selectedPiece.element);

            // Update the piece's position
            selectedPiece.currentPosition = squareId;

            // Track that the pawn has moved
            if (selectedPiece.pieceType === 'Wpawn') {
                pawnMoved['W'][selectedPiece.currentPosition] = true;
            } else if (selectedPiece.pieceType === 'Bpawn') {
                pawnMoved['B'][selectedPiece.currentPosition] = true;
            }

            // Reset highlighted squares after the move
            resetHighlightedSquares();

            // Switch turns after the move
            switchTurn();
        });
    }
};
