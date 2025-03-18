import { Game } from "./game";

export function gameSetup() {
  const appDiv = document.getElementById("app");

  const setupDiv = document.createElement("div");
  setupDiv.classList.add("setup-div");

  setupDiv.innerHTML = `
    <h1>Battleship</h1>
    <h2>The Odin Project TDD exercise</h2>
    <label for="player-name">Enter Your Name:</label>
    <input required type="text" id="player-name" placeholder="eg. Hippobobamus">
    <button id="start-game">Start Game</button>
  `;

  appDiv.appendChild(setupDiv);

  document.getElementById("start-game").addEventListener("click", () => {
    const playerName = document.getElementById("player-name").value;
    // update DOM to the actual game
    // start the game
    console.log(playerName);
    const game = new Game(playerName);
    game.startGame();
  });
}
