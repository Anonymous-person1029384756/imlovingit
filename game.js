// Flappy Bird Game Logic

// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Bird properties
const bird = {
    x: 50,
    y: canvas.height / 2,
    gravity: 0.6,
    jump: -10,
    velocity: 0,
    width: 30,
    height: 30,
};

// Game variables
let isGameOver = false;
const pipes = [];
let score = 0;

// Function to draw the bird
function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

// Function to create pipes
function createPipe() {
    const pipe = {
        x: canvas.width,
        height: Math.random() * (canvas.height - 20) + 20,
        width: 30,
    };
    pipes.push(pipe);
}

// Function to draw pipes
function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, canvas.height - pipe.height, pipe.width, pipe.height);
    });
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!isGameOver) {
        // Bird logic
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        // Draw bird
        drawBird();

        // Pipe logic
        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
            createPipe();
        }
        pipes.forEach(pipe => {
            pipe.x -= 2;
            if (pipe.x + pipe.width < 0) {
                pipes.shift();
                score++;
            }
        });

        // Draw pipes
        drawPipes();

        // Collision detection
        pipes.forEach(pipe => {
            if (
                bird.x < pipe.x + pipe.width &&
                bird.x + bird.width > pipe.x &&
                bird.y + bird.height > canvas.height - pipe.height
            ) {
                isGameOver = true;
            }
        });

        requestAnimationFrame(gameLoop);
    } else {
        // Game Over
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
        ctx.fillText('Score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
    }
}

// Jump function
function jump() {
    if (!isGameOver) {
        bird.velocity = bird.jump;
    }
}

// Event listener for jump
document.addEventListener('keydown', jump);

// Start the game
gameLoop();
