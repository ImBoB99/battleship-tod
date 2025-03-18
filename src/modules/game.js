import { Player } from "../modules/player";
import { displayGameDom } from "../modules/dom";
import { Ship } from "../modules/ship";
import { printGameBoard } from "./helpers";

export class Game {
  constructor(playerName) {
    this.playerOne = new Player("real", playerName);
    this.playerTwo = new Player("computer", "Computer");
    this.currentPlayer = this.playerOne;
    this.gameOver = false;
  }

  startGame() {
    console.log("Game started!");

    // Creating ships for player one
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    const ship3 = new Ship(4);
    const ship4 = new Ship(5);

    // Create an array of ships
    const ships = [ship1, ship2, ship3, ship4];
    const shipNames = ["Ship 1", "Ship 2", "Ship 3", "Ship 4"];

    // Prompt for playerOne to input ship details
    for (let i = 0; i < ships.length; i++) {
      let validInput = false;
      while (!validInput) {
        // Prompt for coordinates and direction
        const coords = prompt(`${shipNames[i]} - Enter coordinates in format "row,col":`);
        const [row, col] = coords.split(",").map((num) => parseInt(num.trim()));

        const direction = prompt(
          `${shipNames[i]} - Enter direction ("horizontal" or "vertical"):`,
        ).toLowerCase();

        // Validate the input using the existing isValidPlacement method
        if (this.playerOne.gameboard.placeShip(row, col, direction, ships[i])) {
          validInput = true; // Exit loop if valid placement
          // Print the updated gameboard after placing the ship
          console.log(`Gameboard after placing ${shipNames[i]}:`);
          printGameBoard(this.playerOne.gameboard.grid); // Print the grid
        } else {
          alert("Invalid placement! Please try again.");
        }
      }
    }

    // Create ships for playerTwo (or could prompt for playerTwo too)
    const ship5 = new Ship(2);
    const ship6 = new Ship(3);
    const ship7 = new Ship(4);
    const ship8 = new Ship(5);

    // Hardcoded placement for playerTwo
    this.playerTwo.gameboard.placeShip(2, 3, "horizontal", ship8); // Length 5
    this.playerTwo.gameboard.placeShip(4, 6, "vertical", ship7); // Length 4
    this.playerTwo.gameboard.placeShip(6, 2, "horizontal", ship6); // Length 3
    this.playerTwo.gameboard.placeShip(8, 5, "horizontal", ship5); // Length 2

    // Render the game
    displayGameDom(this);
  }

  playTurn(x, y) {
    if (this.gameOver) return;

    const enemy = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;

    if (!enemy.gameboard.receiveAttack(x, y)) return; // Invalid move

    console.log(`${this.currentPlayer.playerName} attacked (${x}, ${y})`);

    displayGameDom(this);

    if (this.checkGameOver()) {
      console.log("Game Over!");
      alert(`${this.currentPlayer.playerName} wins!`);
      this.gameOver = true;
      return;
    }
    // Switch turns after a successful attack
    this.currentPlayer = enemy;

    if (this.currentPlayer.playerType === "computer") {
      setTimeout(() => {
        if (this.gameOver) return;
        // Add delay for realism
        const attackResult = this.currentPlayer.computerAttack(this.playerOne.gameboard);
        console.log("Computer attacked:", attackResult);

        displayGameDom(this);

        if (this.checkGameOver()) {
          console.log("Game Over!");
          alert("Computer wins!");
          this.gameOver = true;
          return;
        }

        this.currentPlayer = this.playerOne; // Switch back to the player
      }, 1000); // Delay for 1 second
    }
  }

  checkGameOver() {
    return (
      this.playerOne.gameboard.checkSunkenShips() || this.playerTwo.gameboard.checkSunkenShips()
    );
  }
}
