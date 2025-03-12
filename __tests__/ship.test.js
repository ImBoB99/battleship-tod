import { Ship } from "../src/modules/ship";

test("Ship should be created with the correct length and not sunk initially.", () => {
  const ship = new Ship(3);
  expect(ship.length).toBe(3);
  expect(ship.isSunk()).toBe(false);
});

test("Ship should be able to get hit and sink once it loses all healthy parts.", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
