export function displayGameDom(game) {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML = "";

  const gameDiv = document.createElement("div");
  gameDiv.classList.add("game");

  gameDiv.append(...generatePlayerData(game.playerOne, game.playerTwo, game));

  appDiv.appendChild(gameDiv);
}

function generatePlayerData(playerOne, playerTwo, game) {
  const playerOneDiv = document.createElement("div");
  const playerTwoDiv = document.createElement("div");

  const playerOneName = document.createElement("h1");
  playerOneName.innerText = `Player One: ${playerOne.playerName}`;

  const playerTwoName = document.createElement("h1");
  playerTwoName.innerText = `Player Two: ${playerTwo.playerName}`;

  playerOneDiv.appendChild(playerOneName);
  playerTwoDiv.appendChild(playerTwoName);

  generatePlayerGrid(game, playerOne, playerOneDiv);
  generatePlayerGrid(game, playerTwo, playerTwoDiv);

  return [playerOneDiv, playerTwoDiv];
}

function generatePlayerGrid(game, player, playerDiv) {
  const grid = document.createElement("div");
  grid.classList.add("grid-container");

  for (let x = 0; x < player.gameboard.grid.length; x++) {
    for (let y = 0; y < player.gameboard.grid[x].length; y++) {
      const gridCell = document.createElement("div");
      const cellData = player.gameboard.grid[x][y];

      gridCell.classList.add("grid-cell");
      gridCell.dataset.x = x;
      gridCell.dataset.y = y;
      gridCell.dataset.attacked = cellData.attacked || false;

      // Apply classes dynamically based on grid state
      if (cellData.attacked) {
        if (cellData.ship) {
          gridCell.classList.add("hit"); // If a ship was there
        } else {
          gridCell.classList.add("miss"); // If it was an empty cell
        }
      }

      if (player.playerType === "computer") {
        addCellEventListener(gridCell, game, player, x, y);
      }

      grid.appendChild(gridCell);
    }
  }

  playerDiv.appendChild(grid);
}

function addCellEventListener(gridCell, game, player, x, y) {
  function handleAttack() {
    if (gridCell.dataset.attacked === "true") return;

    if (game.currentPlayer === player) {
      console.log("You cannot attack your own board!");
      return;
    }

    game.playTurn(x, y);

    console.log(`Attack at (${x}, ${y}) on`, player);

    gridCell.removeEventListener("click", handleAttack);
  }

  gridCell.addEventListener("click", handleAttack);
}
