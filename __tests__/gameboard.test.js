import { Gameboard } from "../src/modules/gameboard";
import { Ship } from "../src/modules/ship";

test("Gameboard should have an empty 10x10 grid", () => {
  const gameboard = new Gameboard();

  // check the number of rows (should be 10)
  expect(gameboard.grid.length).toBe(10);

  // check that each row has 10 cells, resulting in 10 columns
  gameboard.grid.forEach((row) => {
    expect(row.length).toBe(10);
  });

  //check if there's any ships
  expect(gameboard.ships.length).toBe(0);
});

test("Gameboard should be able to place ship at certain coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(1, 1, "vertical", ship);

  expect(gameboard.grid[1][1]).toBe(ship);
});
