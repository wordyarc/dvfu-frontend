import {
  PLAYFIELD_COLUMNS,
  PLAYFIELD_ROWS,
  TETROMINO_NAMES,
  TETROMINOES,
  getRandomElement,
  rotateMatrix,
} from "./utilities.js";

export class Tetris {
  constructor() {
    this.playfield = [];
    this.tetromino = null;
    this.nextQueue = [];
    this.isGameOver = false;
    this.score = 0;
    this.highScore =
      typeof localStorage !== "undefined" &&
      localStorage.getItem("tetris-high-score")
        ? Number(localStorage.getItem("tetris-high-score"))
        : 0;
    this.init();
  }

  init() {
    this.generatePlayfield();
    while (this.nextQueue.length < 3) {
      this.addUniqueRandomTetromino();
    }
    this.generateTetromino();
  }

  generatePlayfield() {
    this.playfield = new Array(PLAYFIELD_ROWS)
      .fill()
      .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
  }

  addUniqueRandomTetromino() {
    const availableNames = TETROMINO_NAMES.filter(
      (name) => !this.nextQueue.includes(name),
    );
    const pool = availableNames.length > 0 ? availableNames : TETROMINO_NAMES;
    const name = getRandomElement(pool);
    this.nextQueue.push(name);
  }

  generateTetromino() {
    const name = this.nextQueue.shift();
    this.addUniqueRandomTetromino();

    const matrix = TETROMINOES[name];
    const column = PLAYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
    const row = -2;

    this.tetromino = {
      name,
      matrix,
      row,
      column,
      ghostColumn: column,
      ghostRow: row,
    };

    this.calculateGhostPosition();
  }

  moveTetrominoDown() {
    this.tetromino.row += 1;
    if (!this.isValid()) {
      this.tetromino.row -= 1;
      this.placeTetromino();
    }
  }

  moveTetrominoLeft() {
    this.tetromino.column -= 1;
    if (!this.isValid()) {
      this.tetromino.column += 1;
    } else {
      this.calculateGhostPosition();
    }
  }

  moveTetrominoRight() {
    this.tetromino.column += 1;
    if (!this.isValid()) {
      this.tetromino.column -= 1;
    } else {
      this.calculateGhostPosition();
    }
  }

  rotateTetromino() {
    const oldMatrix = this.tetromino.matrix;
    const rotatedMatrix = rotateMatrix(this.tetromino.matrix);
    this.tetromino.matrix = rotatedMatrix;
    if (!this.isValid()) {
      this.tetromino.matrix = oldMatrix;
    } else {
      this.calculateGhostPosition();
    }
  }

  dropTetrominoDown() {
    this.tetromino.row = this.tetromino.ghostRow;
    this.placeTetromino();
  }

  isValid() {
    const matrixSize = this.tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
      for (let column = 0; column < matrixSize; column++) {
        if (!this.tetromino.matrix[row][column]) continue;
        if (this.isOutsideOfGameBoard(row, column)) return false;
        if (this.isCollides(row, column)) return false;
      }
    }
    return true;
  }

  isOutsideOfGameBoard(row, column) {
    return (
      this.tetromino.column + column < 0 ||
      this.tetromino.column + column >= PLAYFIELD_COLUMNS ||
      this.tetromino.row + row >= this.playfield.length
    );
  }

  isCollides(row, column) {
    return this.playfield[this.tetromino.row + row]?.[
      this.tetromino.column + column
    ];
  }

  placeTetromino() {
    const matrixSize = this.tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
      for (let column = 0; column < matrixSize; column++) {
        if (!this.tetromino.matrix[row][column]) continue;
        if (this.isOutsideOfTopBoard(row)) {
          this.isGameOver = true;
          return;
        }

        this.playfield[this.tetromino.row + row][
          this.tetromino.column + column
        ] = this.tetromino.name;
      }
    }

    this.processFilledRows();
    this.generateTetromino();
  }

  isOutsideOfTopBoard(row) {
    return this.tetromino.row + row < 0;
  }

  processFilledRows() {
    const filledLines = this.findFilledRows();
    if (filledLines.length > 0) {
      this.calculateScore(filledLines.length);
      this.removeFilledRows(filledLines);
    }
  }

  calculateScore(clearedLines) {
    const pointsMap = { 1: 100, 2: 300, 3: 500, 4: 800 };
    const points = pointsMap[clearedLines] || 0;
    this.score += points;

    if (this.score > this.highScore) {
      this.highScore = this.score;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("tetris-high-score", this.highScore.toString());
      }
    }
  }

  findFilledRows() {
    const filledRows = [];
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
      if (this.playfield[row].every((cell) => Boolean(cell))) {
        filledRows.push(row);
      }
    }

    return filledRows;
  }

  removeFilledRows(filledRows) {
    filledRows.forEach((row) => {
      this.dropRowsAbove(row);
    });
  }

  dropRowsAbove(rowToDelete) {
    for (let row = rowToDelete; row > 0; row--) {
      this.playfield[row] = this.playfield[row - 1];
    }
    this.playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
  }

  calculateGhostPosition() {
    const tetrominoRow = this.tetromino.row;
    this.tetromino.row++;
    while (this.isValid()) {
      this.tetromino.row++;
    }
    this.tetromino.ghostRow = this.tetromino.row - 1;
    this.tetromino.ghostColumn = this.tetromino.column;
    this.tetromino.row = tetrominoRow;
  }
}
