document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game-container');
  const snakeElement = document.getElementById('snake');
  const foodElement = document.getElementById('food');

  let snakeX = 0;
  let snakeY = 0;
  let foodX = 0;
  let foodY = 0;
  let dx = 20;
  let dy = 0;
  let gameRunning = false;
  const snakeSize = 20;
  const gridSize = 20;
  let interval;

  function startGame() {
    snakeX = snakeY = 10 * snakeSize;
    foodX = Math.floor(Math.random() * gridSize) * snakeSize;
    foodY = Math.floor(Math.random() * gridSize) * snakeSize;
    drawSnake();
    drawFood();
    interval = setInterval(moveSnake, 100);
    gameRunning = true;
  }

  function drawSnake() {
    snakeElement.style.left = snakeX + 'px';
    snakeElement.style.top = snakeY + 'px';
  }

  function drawFood() {
    foodElement.style.left = foodX + 'px';
    foodElement.style.top = foodY + 'px';
  }

  function moveSnake() {
    snakeX += dx;
    snakeY += dy;

    if (snakeX < 0 || snakeX >= gridSize * snakeSize || snakeY < 0 || snakeY >= gridSize * snakeSize) {
      clearInterval(interval);
      alert('Game Over! Your score: ' + (snakeElement.childElementCount - 1));
      gameRunning = false;
      resetGame();
      return;
    }

    if (snakeX === foodX && snakeY === foodY) {
      const tail = document.createElement('div');
      tail.className = 'tail';
      snakeElement.appendChild(tail);
      foodX = Math.floor(Math.random() * gridSize) * snakeSize;
      foodY = Math.floor(Math.random() * gridSize) * snakeSize;
      drawFood();
    }

    const tails = snakeElement.children;
    for (let i = tails.length - 1; i > 0; i--) {
      const prevTailX = parseInt(tails[i - 1].style.left);
      const prevTailY = parseInt(tails[i - 1].style.top);
      tails[i].style.left = prevTailX + 'px';
      tails[i].style.top = prevTailY + 'px';
    }
    drawSnake();
  }

  function resetGame() {
    clearInterval(interval);
    while (snakeElement.firstChild) {
      snakeElement.removeChild(snakeElement.firstChild);
    }
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && dy === 0 && gameRunning) {
      dx = 0;
      dy = -snakeSize;
    } else if (e.key === 'ArrowDown' && dy === 0 && gameRunning) {
      dx = 0;
      dy = snakeSize;
    } else if (e.key === 'ArrowLeft' && dx === 0 && gameRunning) {
      dx = -snakeSize;
      dy = 0;
    } else if (e.key === 'ArrowRight' && dx === 0 && gameRunning) {
      dx = snakeSize;
      dy = 0;
    } else if (e.key === ' ' && !gameRunning) {
      startGame();
    }
  });
});
