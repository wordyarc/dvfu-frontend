import { Tetris } from "./tetris.js";
import {
  PLAYFIELD_COLUMNS,
  PLAYFIELD_ROWS,
  SAD,
  TETROMINOES,
  convertPositionToIndex,
} from "./utilities.js";

let tetris = loadGame();

const gridElement = document.querySelector(".grid");
const scoreElement = document.querySelector("#score");
const highScoreElement = document.querySelector("#high-score");
const nextQueueElement = document.querySelector(".next-queue");

const totalCells = PLAYFIELD_COLUMNS * PLAYFIELD_ROWS;

for (let i = 0; i < totalCells; i++) {
  const div = document.createElement("div");
  gridElement.appendChild(div);
}

const cells = document.querySelectorAll(".grid>div");

let isGameOverFinished = false;

let dropInterval = 700;
let timeSinceLastDrop = 0;
let lastUpdateTime = performance.now();
let animationFrameId = null;

initKeydown();
draw();
startLoop();

function initKeydown() {
  document.addEventListener("keydown", onKeydown);
}

function onKeydown(event) {
  if (isGameOverFinished) {
    restartGame();
    return;
  }

  if (tetris.isGameOver) return;

  switch (event.key) {
    case "ArrowUp":
      rotate();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case " ":
      dropDown();
      break;
    default:
      break;
  }
}

function startLoop() {
  lastUpdateTime = performance.now();
  timeSinceLastDrop = 0;
  cancelAnimationFrame(animationFrameId);
  animationFrameId = requestAnimationFrame(update);
}

function stopLoop() {
  cancelAnimationFrame(animationFrameId);
}

function moveDown() {
  tetris.moveTetrominoDown();
  draw();
  saveGame();

  if (tetris.isGameOver) {
    gameOver();
  }
}

function moveLeft() {
  tetris.moveTetrominoLeft();
  draw();
  saveGame();
}

function moveRight() {
  tetris.moveTetrominoRight();
  draw();
  saveGame();
}

function rotate() {
  tetris.rotateTetromino();
  draw();
  saveGame();
}

function dropDown() {
  tetris.dropTetrominoDown();
  draw();
  saveGame();

  if (tetris.isGameOver) {
    gameOver();
  }
}

function draw() {
  cells.forEach((cell) => cell.removeAttribute("class"));
  drawPlayfield();
  drawTetromino();
  drawGhostTetromino();
  drawScore();
  drawNextQueue();
}

function drawScore() {
  scoreElement.textContent = tetris.score;
  highScoreElement.textContent = tetris.highScore;
}

function drawPlayfield() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      if (!tetris.playfield[row][column]) continue;
      const name = tetris.playfield[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawTetromino() {
  const name = tetris.tetromino.name;
  const size = tetris.tetromino.matrix.length;
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      if (!tetris.tetromino.matrix[row][column]) continue;
      if (tetris.tetromino.row + row < 0) continue;
      const cellIndex = convertPositionToIndex(
        tetris.tetromino.row + row,
        tetris.tetromino.column + column,
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawGhostTetromino() {
  const size = tetris.tetromino.matrix.length;
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      if (!tetris.tetromino.matrix[row][column]) continue;
      if (tetris.tetromino.ghostRow + row < 0) continue;
      const cellIndex = convertPositionToIndex(
        tetris.tetromino.ghostRow + row,
        tetris.tetromino.ghostColumn + column,
      );
      cells[cellIndex].classList.add("ghost");
    }
  }
}

function gameOver() {
  stopLoop();
  localStorage.removeItem("tetris-save");
  gameOverAnimation();
}

function gameOverAnimation() {
  const filledCells = [...cells].filter((cell) => cell.classList.length > 0);
  filledCells.forEach((cell, i) => {
    setTimeout(() => cell.classList.add("hide"), i * 10);
    setTimeout(() => cell.removeAttribute("class"), i * 10 + 500);
  });

  setTimeout(
    () => {
      drawSad();
      isGameOverFinished = true;
    },
    filledCells.length * 10 + 1000,
  );
}

function drawSad() {
  const TOP_OFFSET = 5;
  for (let row = 0; row < SAD.length; row++) {
    for (let column = 0; column < SAD[0].length; column++) {
      if (!SAD[row][column]) continue;
      const cellIndex = convertPositionToIndex(TOP_OFFSET + row, column);
      cells[cellIndex].classList.add("sad");
    }
  }
}

function restartGame() {
  isGameOverFinished = false;
  localStorage.removeItem("tetris-save");
  tetris = new Tetris();
  draw();
  startLoop();
}

function saveGame() {
  if (tetris.isGameOver) return;
  localStorage.setItem("tetris-save", JSON.stringify(tetris));
}

function loadGame() {
  const savedData = localStorage.getItem("tetris-save");
  if (!savedData) return new Tetris();

  try {
    const parsedData = JSON.parse(savedData);
    const game = new Tetris();
    game.playfield = parsedData.playfield;
    game.tetromino = parsedData.tetromino;
    game.nextQueue = parsedData.nextQueue || game.nextQueue;
    game.isGameOver = parsedData.isGameOver;
    game.score = parsedData.score || 0;
    return game;
  } catch (e) {
    console.error("Ошибка при загрузке сохранения:", e);
    return new Tetris();
  }
}

function update(time = performance.now()) {
  const deltaTime = time - lastUpdateTime;
  lastUpdateTime = time;

  if (!tetris.isGameOver && !isGameOverFinished) {
    timeSinceLastDrop += deltaTime;
    if (timeSinceLastDrop > dropInterval) {
      moveDown();
      timeSinceLastDrop = 0;
    }
    animationFrameId = requestAnimationFrame(update);
  }
}

function drawNextQueue() {
  if (!nextQueueElement) return;
  nextQueueElement.innerHTML = "";

  tetris.nextQueue.forEach((shapeName) => {
    const matrix = TETROMINOES[shapeName];
    const container = document.createElement("div");
    container.className = "next-item";

    const miniGrid = document.createElement("div");
    miniGrid.className = "mini-grid";
    miniGrid.style.gridTemplateColumns = `repeat(${matrix.length}, 1fr)`;

    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        const cell = document.createElement("div");
        cell.className = "mini-cell";
        if (matrix[r][c]) {
          cell.classList.add(shapeName);
        }
        miniGrid.appendChild(cell);
      }
    }
    container.appendChild(miniGrid);
    nextQueueElement.appendChild(container);
  });
}
