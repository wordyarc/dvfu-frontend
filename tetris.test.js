import { describe, it, expect } from "vitest";
import { Tetris } from "./src/tetris.js";

describe("Правила", () => {
  it("1) Игровое поле инициализируется размером 20 рядов на 10 колонок", () => {
    const game = new Tetris();
    expect(game.playfield.length).toBe(20);
    expect(game.playfield[0].length).toBe(10);
  });

  it("2) Список следующих фигур (очередь) содержит ровно 3 элемента", () => {
    const game = new Tetris();
    expect(game.nextQueue.length).toBe(3);
  });

  it("3) Начисление очков за очищенные линии работает корректно", () => {
    const game = new Tetris();
    expect(game.score).toBe(0);
    game.calculateScore(1);
    expect(game.score).toBe(100);
    game.calculateScore(2);
    expect(game.score).toBe(400);
  });
});
