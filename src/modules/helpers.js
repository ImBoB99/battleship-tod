export function printGameBoard(grid) {
  for (let row = 0; row < grid.length; row++) {
    let rowString = "";
    for (let col = 0; col < grid[row].length; col++) {
      // If the cell is empty, print a dot (.)
      // Otherwise, print a symbol (e.g., 'S') to represent a ship
      rowString += grid[row][col].ship ? "S " : ". ";
    }
    console.log(rowString);
  }
}
