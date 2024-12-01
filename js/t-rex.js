let board;
let width = 750;
let height = 250;
let context;
let dinoWidth = 80;
let x = 50;

let img;
let dinoHeight = 94;
let y = height - dinoHeight;
let dino = {
    x: x,
    y: y,
    width: dinoWidth,
    height: dinoHeight
};
let array = [];
let w1 = 34;
let w2 = 69;
let w3 = 102;
let cactusHeight = 70;
let cactusX = 700;
let cactusY = height - cactusHeight;
let img1;
let img2;
let img3;

let velocityX = -8;
let velocityY = 0;
let gravity = 0.4;
let gameOver = false;
let score = 0; // Initialize the score variable
let scoreInterval; // Variable to store the score increment interval

window.onload = () => {
    board = document.querySelector('.board');
    board.height = height;
    board.width = width;
    context = board.getContext('2d');

    // Load dinosaur image
    img = new Image();
    img.src = '/assests/dino.png';
    img.onload = function () {
        context.drawImage(img, dino.x, dino.y, dino.width, dino.height);
    };

    // Load cactus images
    img1 = new Image();
    img1.src = '/assests/cactus1.png';
    img2 = new Image();
    img2.src = '/assests/cactus2.png';
    img3 = new Image();
    img3.src = '/assests/cactus3.png';

    // Start the game loop
    requestAnimationFrame(update);

    // Generate cacti periodically
    setInterval(() => {
        place();
    }, 1000);

    // Listen for jump events
    document.addEventListener('keydown', move);

    // Start increasing the score over time
    scoreInterval = setInterval(() => {
        if (!gameOver) {
            score++;  // Increase score over time
            updateScoreDisplay();  // Update the score display
        }
    }, 100); // Increment score every 100 milliseconds
};

let update = () => {
    if (gameOver) {
        clearInterval(scoreInterval); // Stop score incrementing when the game is over
        return;
    }

    // Update dinosaur's vertical position
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, height - dinoHeight);

    // Clear the canvas
    context.clearRect(0, 0, board.width, board.height);

    // Draw the dinosaur if the image is loaded
    if (img.complete && img.naturalWidth > 0) {
        context.drawImage(img, dino.x, dino.y, dino.width, dino.height);
    } else {
        console.error('Dino image not loaded, skipping rendering.');
    }

    // Update and draw cacti
    for (let i = 0; i < array.length; i++) {
        let cactus = array[i];
        cactus.x += velocityX;

        // Check for collision
        if (detectCollision(dino, cactus)) {
            gameOver = true;
            alert('Game Over! Press F5 to restart.');
            return;
        }

        // Draw cactus if the image is loaded
        if (cactus.img.complete && cactus.img.naturalWidth > 0) {
            context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
        } else {
            console.error('Cactus image not loaded, skipping rendering.');
        }
    }

    // Remove off-screen cacti
    array = array.filter(cactus => cactus.x + cactus.width > 0);

    // Request the next frame
    requestAnimationFrame(update);
};

// Function to update the score display on the page
let updateScoreDisplay = () => {
    let scoreDisplay = document.querySelector('#scoreDisplay');
    scoreDisplay.textContent = 'Score: ' + score; // Update the score text
};

let place = () => {
    if (gameOver) return;

    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    };

    let chance = Math.random();
    if (chance > 0.90) {
        cactus.img = img3;
        cactus.width = w3;
    } else if (chance > 0.70) {
        cactus.img = img2;
        cactus.width = w2;
    } else {
        cactus.img = img1;
        cactus.width = w1;
    }

    array.push(cactus);

    // Limit the number of cacti
    if (array.length > 5) {
        array.shift();
    }
};

let move = (e) => {
    if (!gameOver) {
        if ((e.code === 'Space' || e.code === 'ArrowUp') && dino.y === height - dinoHeight) {
            velocityY = -10; // Apply jump velocity
        }
    }
};

// Collision detection
let detectCollision = (dino, cactus) => {
    return (
        dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y
    );
};
