import { Player } from "../src/modules/player";
import { Gameboard } from "../src/modules/gameboard";

test("The Player class should create a computer and real player", () => {
  const realPlayer = new Player("real");
  const computerPlayer = new Player("computer");

  expect(realPlayer).toBeInstanceOf(Player);
  expect(computerPlayer).toBeInstanceOf(Player);

  expect(realPlayer.gameboard).toBeInstanceOf(Gameboard);
  expect(computerPlayer.gameboard).toBeInstanceOf(Gameboard);
});

test("Player should throw an error if given an invalid player type", () => {
  expect(() => new Player("alien")).toThrow("Invalid player type. Must be 'real' or 'computer'.");
  expect(() => new Player("human")).toThrow("Invalid player type. Must be 'real' or 'computer'.");
  expect(() => new Player("")).toThrow("Invalid player type. Must be 'real' or 'computer'.");
  expect(() => new Player()).toThrow("Invalid player type. Must be 'real' or 'computer'.");
});

test("Player should be able to attack an enemy gameboard", () => {
  const player = new Player("real");
  const enemy = new Player("computer");

  // Spy on the receiveAttack method to check if it's called
  const spy = jest.spyOn(enemy.gameboard, "receiveAttack");

  player.attack(enemy.gameboard, 3, 3);

  expect(spy).toHaveBeenCalledWith(3, 3);
});

test("Computer player should attack without repeating", () => {
  const computer = new Player("computer");
  const enemy = new Player("real");

  const initialMoves = computer.availableMoves.length;
  computer.computerAttack(enemy.gameboard);
  const newMoves = computer.availableMoves.length;

  expect(newMoves).toBe(initialMoves - 1); // The moves should decrease by 1
});

test("Computer should stop attacking when no moves remain", () => {
  const computer = new Player("computer");
  const enemy = new Player("real");

  // Simulate 100 attacks (emptying availableMoves)
  while (computer.availableMoves.length > 0) {
    computer.computerAttack(enemy.gameboard);
  }

  expect(computer.computerAttack(enemy.gameboard)).toBe(false); // Should return false
});

test("Player should not be able to attack out-of-bounds coordinates", () => {
  const player = new Player("real");
  const enemy = new Player("computer");

  expect(player.attack(enemy.gameboard, -1, 5)).toBe(false); // Negative X
  expect(player.attack(enemy.gameboard, 5, -1)).toBe(false); // Negative Y
  expect(player.attack(enemy.gameboard, 10, 5)).toBe(false); // Out of bounds X
  expect(player.attack(enemy.gameboard, 5, 10)).toBe(false); // Out of bounds Y
});
