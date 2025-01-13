const board = document.getElementById("game-board");
const boardSize = 20; // 20x20 grid
let snake = [{ x: 10, y: 10 }]; // Initial snake position
let food = { x: 5, y: 5 }; // Initial food position
let direction = { x: 0, y: 0 }; // Snake starts stationary
let gameInterval;

// Initialize the board
function createBoard() {
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
  }
}

// Draw the board
function drawBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.className = "cell"); // Clear board

  // Draw snake
  snake.forEach(segment => {
    const index = segment.y * boardSize + segment.x;
    cells[index].classList.add("snake");
  });

  // Draw food
  const foodIndex = food.y * boardSize + food.x;
  cells[foodIndex].classList.add("food");
}

// Move the snake
function moveSnake() {
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  // Check collisions
  if (
    newHead.x < 0 || newHead.x >= boardSize ||
    newHead.y < 0 || newHead.y >= boardSize ||
    snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    clearInterval(gameInterval); // Stop game
    alert("Game Over!");
    return;
  }

  snake.unshift(newHead); // Add new head

  // Check if the snake ate food
  if (newHead.x === food.x && newHead.y === food.y) {
    generateFood(); // Generate new food
  } else {
    snake.pop(); // Remove the tail
  }

  drawBoard();
}

// Generate food at a random position
function generateFood() {
  do {
    food = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

// Handle key presses
function handleKeyPress(event) {
  const keyMap = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  };

  const newDirection = keyMap[event.key];
  if (newDirection) {
    // Prevent reversing direction
    if (
      direction.x + newDirection.x !== 0 ||
      direction.y + newDirection.y !== 0
    ) {
      direction = newDirection;
    }
  }
}

// Start the game
function startGame() {
  createBoard();
  drawBoard();
  gameInterval = setInterval(moveSnake, 200); // Move snake every 200ms
}

// Event listeners
document.addEventListener("keydown", handleKeyPress);

// Start
startGame();
