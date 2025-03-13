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

  gameboard.placeShip(1, 1, "horizontal", ship);

  expect(gameboard.grid[1][1]).toEqual({ ship: ship, position: 0 });
  expect(gameboard.grid[1][2]).toEqual({ ship: ship, position: 1 });
  expect(gameboard.grid[1][3]).toEqual({ ship: ship, position: 2 });
});

test("Don't allow placement at negative X coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  // Store a deep copy of the grid before attempting placement
  const initialGrid = JSON.stringify(gameboard.grid);

  gameboard.placeShip(-1, 1, "horizontal", ship);

  // Ensure grid remains unchanged
  expect(JSON.stringify(gameboard.grid)).toBe(initialGrid);
});

test("Don't allow placement at negative Y coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  const initialGrid = JSON.stringify(gameboard.grid);

  gameboard.placeShip(1, -1, "horizontal", ship);

  expect(JSON.stringify(gameboard.grid)).toBe(initialGrid);
});

test("Don't allow placement out of bounds", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  const initialGrid = JSON.stringify(gameboard.grid);

  gameboard.placeShip(8, 8, "horizontal", ship);

  expect(JSON.stringify(gameboard.grid)).toBe(initialGrid);
});

test("Don't allow placement at negative Y coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  const initialGrid = JSON.stringify(gameboard.grid);

  gameboard.placeShip(1, -1, "horizontal", ship);

  expect(JSON.stringify(gameboard.grid)).toBe(initialGrid);
});

test("Don't allow overlapping ships", () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(3);
  const ship2 = new Ship(3);

  // Place the first ship at (2,2) horizontally
  gameboard.placeShip(2, 2, "horizontal", ship1);

  // Store a deep copy of the grid before attempting the second ship placement
  const initialGrid = JSON.stringify(gameboard.grid);

  // Try to place the second ship overlapping the first one
  gameboard.placeShip(2, 3, "horizontal", ship2); // Should fail

  // Ensure grid remains unchanged
  expect(JSON.stringify(gameboard.grid)).toBe(initialGrid);
});
