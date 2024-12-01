let moleTile = null;
let plantTile = null;
let score = 0;
let mole = null;
let plant = null;
let timer = document.querySelector('.timer');
let gameOver = false;
let start = document.querySelector('.button');
let input = document.querySelector('input');
let retry = document.querySelector('.retry');

start.addEventListener('click', () => {
    const timeValue = parseInt(input.value);

    if (timeValue) {
        if (timeValue > 10) {
            document.querySelector('.warning').classList.add('visible');
        } else {
            document.querySelector('.finish').classList.remove('hidden');
            document.querySelector('.finish').classList.add('visible');
            document.querySelector('.start').classList.add('hidden');
            document.querySelector('.warning').classList.remove('visible');
            setGame(timeValue * 60); // Start game with time in seconds
        }
    } else {
        document.querySelector('.warning').classList.add('visible');
    }
});

retry.addEventListener('click', () => {
    // Hide the last screen when retry is clicked and reset the game state
    document.querySelector('.last').classList.remove('visible');
    document.querySelector('.last').classList.add('hidden');
    document.querySelector('.finish').classList.add('hidden');
    document.querySelector('.start').classList.remove('hidden');
    document.querySelector('.board').innerHTML = ''; // Reset the game board

    score = 0;
    gameOver = false;
    document.querySelector('.score').innerText = score;

    document.querySelector('.warning').classList.remove('visible'); // Hide warning

    const timeValue = parseInt(input.value); // Get the input value again for restarting
    setGame(timeValue * 60); // Restart the game with the same time
});

const setGame = (timeLeft) => {
    // Create the game board
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement('div');
        tile.id = i.toString();
        tile.classList.add('tile');
        document.querySelector('.board').append(tile);

        // Add click event listener for each tile
        tile.addEventListener('click', (e) => {
            if (gameOver) return;
            if (e.target.classList.contains('mole')) {
                score += 10;
                document.querySelector('.score').innerText = score;
                e.target.remove();
                mole = null;
            } else {
                score -= 10;
                document.querySelector('.score').innerText = score;
            }
        });
    }

    // Start the timer
    const intervalId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timer.innerText = `${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;
        } else {
            clearInterval(intervalId);
            gameOver = true;
            document.querySelector('.finish').classList.add('hidden');
            document.querySelector('.last').classList.remove('hidden');
            document.querySelector('.last').classList.add('visible');
            document.querySelector('.last h1').innerHTML = 'Your final score: ' + score;
        }
    }, 1000); // Corrected interval timing to 1000ms (1 second)

    // Spawn a mole every second
    setInterval(() => {
        if (!gameOver) setMole();
    }, 1000);

    // Spawn a plant every 2 seconds
    setInterval(() => {
        if (!gameOver) setPlant();
    },800);
};

const getRandom = () => Math.floor(Math.random() * 9).toString();

const setMole = () => {
    if (mole && mole.parentElement) mole.remove();
    let num = getRandom();
    if (plantTile && plantTile.id === num) return;
    mole = document.createElement('div');
    mole.classList.add('mole');
    moleTile = document.getElementById(num);
    moleTile.append(mole);
};

const setPlant = () => {
    if (plant && plant.parentElement) plant.remove();
    let num = getRandom();
    if (moleTile && moleTile.id === num) return;
    plant = document.createElement('div');
    plant.classList.add('piranha');
    plantTile = document.getElementById(num);
    plantTile.append(plant);
};
