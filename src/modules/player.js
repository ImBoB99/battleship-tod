import { Gameboard } from "./gameboard";

export class Player {
  constructor(playerType, playerName) {
    if (playerType !== "real" && playerType !== "computer") {
      throw new Error("Invalid player type. Must be 'real' or 'computer'.");
    }

    this.playerType = playerType; // "real" or "computer"
    this.gameboard = new Gameboard();
    this.availableMoves = this.generateAllMoves(); // Store all possible moves
    this.playerName = playerName;
  }

  generateAllMoves() {
    let moves = [];
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        moves.push([x, y]);
      }
    }
    return moves;
  }

  computerAttack(enemyGameboard) {
    if (this.availableMoves.length === 0) return false; // No moves left

    const randomIndex = Math.floor(Math.random() * this.availableMoves.length);
    const [x, y] = this.availableMoves.splice(randomIndex, 1)[0]; // Remove chosen move

    console.log(`Computer attacks (${x}, ${y})`);

    return enemyGameboard.receiveAttack(x, y);
  }
}
