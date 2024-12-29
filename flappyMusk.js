document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('flappyMuskCanvas');
    const ctx = canvas.getContext('2d');

    // Game variables
    const gravity = 0.6;
    const jump = -10;
    const pipeWidth = 50;
    const pipeGap = 150;
    let gameOver = false;
    let gameStarted = false; // Tracks if the game has started

    // Elon image as the bird
    const elonImage = new Image();
    elonImage.src = 'static/images/elon_head.jpeg'; // Replace with a path to Elon Musk's head image

    const bird = {
        x: 50,
        y: canvas.height / 2,
        width: 40,
        height: 40,
        velocity: 0
    };

    let pipes = [];

    function createInitialPipes() {
        pipes = [];
        for (let i = 0; i < 3; i++) {
            const pipeX = canvas.width + i * 200;
            const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 20)) + 10;
            pipes.push({ x: pipeX, top: pipeHeight, bottom: pipeHeight + pipeGap });
        }
    }

    function drawBird() {
        ctx.drawImage(elonImage, bird.x, bird.y, bird.width, bird.height);
    }

    function drawPipes() {
        ctx.fillStyle = '#b8bb26';
        pipes.forEach(pipe => {
            // Top pipe
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
            // Bottom pipe
            ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
        });
    }

    function updatePipes() {
        pipes.forEach(pipe => {
            pipe.x -= 2;
            if (pipe.x + pipeWidth < 0) {
                pipe.x = canvas.width;
                pipe.top = Math.floor(Math.random() * (canvas.height - pipeGap - 20)) + 10;
                pipe.bottom = pipe.top + pipeGap;
            }
        });
    }

    function checkCollision() {
        if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
            return true;
        }
        return pipes.some(pipe => (
            bird.x + bird.width > pipe.x &&
            bird.x < pipe.x + pipeWidth &&
            (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
        ));
    }

    function resetGame() {
        bird.y = canvas.height / 2;
        bird.velocity = 0;
        gameOver = false;
        gameStarted = false; // Reset the game state
        createInitialPipes();
        gameLoop(); // Restart the game loop
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw elements
        drawPipes();
        drawBird();

        // Update bird only if the game has started
        if (gameStarted) {
            bird.velocity += gravity;
            bird.y += bird.velocity;
        }

        // Update pipes
        updatePipes();

        // Check for collisions
        if (checkCollision()) {
            gameOver = true;
        }

        // Show Game Over
        if (gameOver) {
            ctx.fillStyle = '#ff0000';
            ctx.font = '24px Arial'; // Reduced font size
            ctx.textAlign = 'center';
            const middleY = canvas.height / 2;

            ctx.fillText('Game Over!', canvas.width / 2, middleY - 20);
            ctx.fillText('Click or Press Space to Restart', canvas.width / 2, middleY + 20);
            return;
        }

        // Show "Click or Space to Start" message if the game hasn't started
        if (!gameStarted) {
            ctx.fillStyle = '#ffffff';
            ctx.font = '18px Arial'; // Smaller font size for instructions
            ctx.textAlign = 'center';
            ctx.fillText('Click or Press Space to Start', canvas.width / 2, canvas.height / 2 - 40);
        }

        requestAnimationFrame(gameLoop);
    }

    // Jump on click or spacebar press
    function jumpAction() {
        if (gameOver) {
            resetGame();
        } else {
            if (!gameStarted) {
                gameStarted = true; // Start the game on the first action
            }
            bird.velocity = jump; // Make the bird jump
        }
    }

    canvas.addEventListener('click', jumpAction);

    document.addEventListener('keydown', function (e) {
        if (e.code === 'Space') {
            e.preventDefault(); // Prevent scrolling when pressing space
            jumpAction();
        }
    });

    // Initialize the game
    elonImage.onload = () => {
        createInitialPipes();
        gameLoop();
    };
});
