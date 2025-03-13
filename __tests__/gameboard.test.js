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

  expect(gameboard.grid[1][1].ship).toBe(ship);
  expect(gameboard.grid[1][2].ship).toBe(ship);
  expect(gameboard.grid[1][3].ship).toBe(ship);
});

test("Gameboard should be able to have multiple ships", () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(3);
  const ship2 = new Ship(4);

  gameboard.placeShip(1, 1, "horizontal", ship1);
  gameboard.placeShip(2, 1, "horizontal", ship2);

  expect(gameboard.grid[1][1].ship).toBe(ship1);
  expect(gameboard.grid[1][2].ship).toBe(ship1);
  expect(gameboard.grid[1][3].ship).toBe(ship1);
  expect(gameboard.grid[2][1].ship).toBe(ship2);
  expect(gameboard.grid[2][2].ship).toBe(ship2);
  expect(gameboard.grid[2][3].ship).toBe(ship2);
  expect(gameboard.grid[2][4].ship).toBe(ship2);
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

test("Allow attacks on grid cells", () => {
  const gameboard = new Gameboard();

  gameboard.receiveAttack(0, 0);

  expect(gameboard.grid[0][0].attacked).toBe(true);
});

test("Don't allow negative coordinate attacks", () => {
  const gameboard = new Gameboard();

  expect(gameboard.receiveAttack(-1, 0)).toBe(false);
  expect(gameboard.receiveAttack(0, -2)).toBe(false);
});

test("Don't allow out of bounds coordinate attacks", () => {
  const gameboard = new Gameboard();

  expect(gameboard.receiveAttack(12, 0)).toBe(false);
  expect(gameboard.receiveAttack(0, 13)).toBe(false);
});

test("Don't allow subsequent attacks on a grid cell", () => {
  const gameboard = new Gameboard();

  gameboard.receiveAttack(0, 0);

  expect(gameboard.receiveAttack(0, 0)).toBe(false);
});

test("Attack a ship's cell", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(1, 1, "horizontal", ship);
  gameboard.receiveAttack(1, 1);

  expect(gameboard.grid[1][1].attacked).toBe(true);
  expect(gameboard.grid[1][1].ship.hits).toBe(1);
});

test("Don't allow subsequent attacks on a ship cell", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(1, 1, "horizontal", ship);
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(1, 1);

  expect(gameboard.grid[1][1].ship.hits).toBe(1);
});

test("Destroy a ship", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(1, 1, "horizontal", ship);
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(1, 2);
  gameboard.receiveAttack(1, 3);

  expect(gameboard.grid[1][1].ship.hits).toBe(3);
  expect(gameboard.grid[1][2].ship.hits).toBe(3);
  expect(gameboard.grid[1][3].ship.hits).toBe(3);
  expect(gameboard.grid[1][3].ship.isSunk()).toBe(true);
});

test("Detect when all ships have been sunk", () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(3);
  const ship2 = new Ship(4);

  gameboard.placeShip(1, 1, "horizontal", ship1);
  gameboard.placeShip(2, 1, "horizontal", ship2);
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(1, 2);
  gameboard.receiveAttack(1, 3);
  gameboard.receiveAttack(2, 1);
  gameboard.receiveAttack(2, 2);
  gameboard.receiveAttack(2, 3);
  gameboard.receiveAttack(2, 4);

  expect(gameboard.checkSunkenShips()).toBe("all ships sunk");
});
