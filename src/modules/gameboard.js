export class Gameboard {
  constructor() {
    this.size = 10;
    // eslint-disable-next-line prettier/prettier
    this.grid = Array.from({ length: this.size }, () => Array(this.size).fill(null));
    this.ships = [];
  }

  placeShip(x, y, direction, shipObj) {
    if (gridRestraintCheck(x, y)) {
      if (this.checkCells(x, y, direction, shipObj.length)) {
        if (direction === "horizontal") {
          for (let i = 0; i < shipObj.length; i++) {
            this.grid[x][y + i] = shipObj;
          }
        } else if (direction === "vertical") {
          for (let i = 0; i < shipObj.length; i++) {
            this.grid[x + i][y] = shipObj;
          }
        }
      }
      console.log(this.grid);
    }
  }

  checkCells(x, y, direction, shipLength) {
    if (direction === "horizontal") {
      for (let i = 0; i < shipLength; i++) {
        // Check if the current cell in the row is already occupied (not null)
        if (this.grid[x][y + i] !== null) {
          return false; // If any cell is not null, return false
        }
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[x + i][y] !== null) {
          return false;
        }
      }
    }
    // if all cells are null, return true
    return true;
  }
}

function gridRestraintCheck(x, y) {
  if (x >= 0 && x < 10 && y >= 0 && y < 10) return true;
}
