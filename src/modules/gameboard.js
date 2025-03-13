export class Gameboard {
  constructor() {
    this.size = 10;
    // eslint-disable-next-line prettier/prettier
    this.grid = Array.from({ length: this.size }, () => Array(this.size).fill(null));
    this.ships = [];
  }

  placeShip(x, y, direction, shipObj) {
    if (!this.isValidPlacement(x, y, direction, shipObj.length)) {
      console.log("Invalid ship placement");
      return false;
    }

    this.placeShipOnGrid(x, y, direction, shipObj);
    console.log(this.grid);
    return true;
  }

  isValidPlacement(x, y, direction, shipLength) {
    return (
      this.checkBounds(x, y, direction, shipLength) &&
      this.checkCells(x, y, direction, shipLength)
    );
  }

  checkBounds(x, y, direction, shipLength) {
    if (x < 0 || y < 0) return false; // Prevent negative coordinates

    if (direction === "horizontal") {
      return y + shipLength <= this.size; // Ensure ship fits within grid width
    } else if (direction === "vertical") {
      return x + shipLength <= this.size; // Ensure ship fits within grid height
    }
    return false;
  }

  checkCells(x, y, direction, shipLength) {
    if (direction === "horizontal") {
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[x][y + i] !== null) return false; // Cell is occupied
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[x + i][y] !== null) return false; // Cell is occupied
      }
    }
    return true;
  }

  placeShipOnGrid(x, y, direction, shipObj) {
    for (let i = 0; i < shipObj.length; i++) {
      if (direction === "horizontal") {
        this.grid[x][y + i] = { ship: shipObj, position: i };
      } else if (direction === "vertical") {
        this.grid[x + i][y] = { ship: shipObj, position: i };
      }
    }
  }
}
