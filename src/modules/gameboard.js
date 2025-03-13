export class Gameboard {
  constructor() {
    this.size = 10;
    this.grid = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => ({
        ship: null,
        attacked: false,
        position: null,
      })),
    );
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(x, y, direction, shipObj) {
    if (!this.isValidPlacement(x, y, direction, shipObj.length)) {
      console.log("Invalid ship placement");
      return false;
    }

    this.placeShipOnGrid(x, y, direction, shipObj);
    this.ships.push(shipObj);
    return true;
  }

  isValidPlacement(x, y, direction, shipLength) {
    return (
      this.checkBounds(x, y, direction, shipLength) && this.checkCells(x, y, direction, shipLength)
    );
  }

  checkBounds(x, y, direction, shipLength) {
    if (x < 0 || y < 0) return false; // Prevent negative coordinates

    if (direction === "horizontal") {
      return y + shipLength <= 10; // Ensure ship fits within grid width
    } else if (direction === "vertical") {
      return x + shipLength <= 10; // Ensure ship fits within grid height
    }
    return false;
  }

  checkCells(x, y, direction, shipLength) {
    if (direction === "horizontal") {
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[x][y + i].ship !== null) return false; // Cell is occupied
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[x + i][y].ship !== null) return false; // Cell is occupied
      }
    }
    return true;
  }

  placeShipOnGrid(x, y, direction, shipObj) {
    for (let i = 0; i < shipObj.length; i++) {
      if (direction === "horizontal") {
        this.grid[x][y + i].ship = shipObj;
        this.grid[x][y + i].position = i;
      } else if (direction === "vertical") {
        this.grid[x + i][y].ship = shipObj;
        this.grid[x + i][y].position = i;
      }
    }
  }

  receiveAttack(x, y) {
    if (x < 0 || y < 0) return false; // Prevent negative coordinates
    if (x > 9 || y > 9) return false; // Prevent out of bounds coordinates

    if (this.grid[x][y].attacked) return false; // Prevent attacking the same cell

    const ship = this.grid[x][y].ship;
    if (this.grid[x][y].ship !== null) {
      this.grid[x][y].attacked = true; // Mark cell as attacked
      ship.hit(); // Call the hit method of the ship
    } else {
      this.grid[x][y].attacked = true; // Mark cell as attacked
      this.missedAttacks.push([x, y]);
      console.log(`Attacked empty cell, ${x} ${y}`);
    }
  }

  checkSunkenShips() {
    // Check if there are any ships in the array
    if (this.ships.length > 0) {
      // Uses `every` to check if all ships are sunk
      const allSunk = this.ships.every((ship) => ship.isSunk());

      if (allSunk) {
        return "all ships sunk";
      } else {
        return "not all ships are sunk";
      }
    } else {
      return "no ships to check";
    }
  }
}
