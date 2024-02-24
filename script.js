class GameBoard {
  constructor() {
    this.board = ["", "", "", "", "", "", "", "", ""];
  }
  // Gameboard Methods
  createBoard() {
    const board = document.querySelector(".game-board");
    let id = 0;
    this.board.forEach((spot) => {
      let cell = document.createElement("div");
      cell.className = "board-cell";
      cell.id = id;
      id++;
      board.appendChild(cell);
    });
  }
  deleteBoard() {
    const board = document.querySelector(".game-board");
    // Setting inner html to blank removes all child elements,
    // then we remove all pieces in gameboard
    board.innerHTML = "";
    this.board = this.board.map(() => "");
  }
  printBoard() {
    console.log(this.board);
  }
  checkCell(cell) {
    if (cell == "") {
      return true;
    } else {
      return false;
    }
  }
  addToBoard(cell, piece) {
    this.board[cell] = piece;
    const spot = document.getElementById(`${cell}`);
    if (piece == "X") {
      spot.innerHTML +=
        '<svg width="75px" height="75px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet" fill="#A9BEC8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M114.31 117.18L81.14 68.9l33-49.02c.48-.73.54-1.66.12-2.43a2.357 2.357 0 0 0-2.08-1.25H84.33c-.78 0-1.51.38-1.95 1.03L64 43.97L45.62 17.22a2.373 2.373 0 0 0-1.95-1.03H15.83c-.87 0-1.68.48-2.08 1.25c-.42.77-.36 1.71.12 2.43L46.86 68.9l-33.17 48.28c-.49.72-.55 1.66-.14 2.44c.41.77 1.22 1.26 2.09 1.26H44.9c.79 0 1.52-.39 1.96-1.04L64 94.36l17.15 25.48c.44.65 1.17 1.04 1.96 1.04h29.25c.88 0 1.68-.49 2.1-1.26c.4-.78.35-1.72-.15-2.44z" fill="#A9BEC8"></path></g></svg>';
    } else if (piece == "O") {
      spot.innerHTML +=
        '<svg width="75px" height="75px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet" fill="#A9BEC8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M64.01 15.06c-34.13 0-55.46 24.1-55.46 53.82c0 29.73 21.33 53.82 55.46 53.82c34.12 0 55.45-24.1 55.45-53.82c-.01-29.73-21.33-53.82-55.45-53.82zm0 81.78c-17.73 0-28.82-12.52-28.82-27.96s11.08-27.96 28.82-27.96c17.73 0 28.81 12.52 28.81 27.96c-.01 15.44-11.09 27.96-28.81 27.96z" clip-rule="evenodd" fill="#A9BEC8" fill-rule="evenodd"></path></g></svg>';
    }
  }
  checkWin(piece) {
    // To check if there is a winner, we will check multiple win conditions
    let win = false;
    const winConditions = [
      // rows
      [this.board[0], this.board[1], this.board[2]],
      [this.board[3], this.board[4], this.board[5]],
      [this.board[6], this.board[7], this.board[8]],
      // columns
      [this.board[0], this.board[3], this.board[6]],
      [this.board[1], this.board[4], this.board[7]],
      [this.board[2], this.board[5], this.board[8]],
      // diagonal
      [this.board[0], this.board[4], this.board[8]],
      [this.board[6], this.board[4], this.board[2]],
    ];
    // We check by keeping track of a count variable that goes through every combination
    winConditions.forEach((cell) => {
      let winCount = 0;
      cell.forEach((spot) => {
        if (spot == piece) {
          winCount++;
          if (winCount == 3) {
            win = true;
          }
        }
      });
    });

    //   Keeping track of a tie
    let tieCount = 0;
    this.board.forEach((cell) => {
      if (cell != "") {
        tieCount++;
        if (tieCount == 9 && win == false) {
          win = "Tie";
        }
      }
    });

    return win;
  }
}







class Player {
  constructor(name, piece) {
    this.name = name;
    this.piece = piece;
    this.wins = 0;
  }
  addWin() {
    this.wins++;
  }
}


class GameBackend {
  constructor(playerOneName, playerTwoName) {
    this.turns = 1;
    this.games = 0;
    this.ties = 0;
    this.playerOne = new Player(playerOneName, "X");
    this.playerTwo = new Player(playerTwoName, "O");
    this.gameEnd = document.querySelector('.game-end');
    this.board = new GameBoard();
  }
  // Game Methods
  updateStats() {
    const getPlayerOne = document.querySelector(".player-one");
    getPlayerOne.innerHTML = `
  <p>${this.playerOne.name}</p>
  <svg width="75px" height="75px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#ffffff" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="32" cy="18.14" r="11.14"></circle><path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"></path></g></svg>

  <p>Wins: ${this.playerOne.wins}</p>`;
    const getPlayerTwo = document.querySelector(".player-two");
    getPlayerTwo.innerHTML = `
  <p>${this.playerTwo.name}</p>
  <svg width="75px" height="75px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#ffffff" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="32" cy="18.14" r="11.14"></circle><path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"></path></g></svg>
  <p>Wins: ${this.playerTwo.wins}</p>`;
    const gameStats = document.querySelector(".game-stats");
    gameStats.innerHTML = `<p>Player Turn: ${this.turns % 2 == 0 ? 2 : 1}</p> <p>Total Games: ${this.games}</p> <p>Tie Games: ${this.ties}</p>`;
  }
  playGame() {
    this.games++;
    let gameComplete = false;
    this.updateStats();
    const nextTurn = () => {
      this.turns++;
      this.updateStats();
    };
    const determinePlayerTurn = (turns) => turns % 2 == 0 ? this.playerTwo : this.playerOne;

    const playRound = (currentPlayer) => {
      if (this.board.checkWin(currentPlayer.piece) == "Tie") {
        this.gameEnd.innerHTML = "IT'S A TIE! Restart to play again.";
      } else if (this.board.checkWin(currentPlayer.piece)) {
        gameComplete = true;
        currentPlayer.addWin();
        this.gameEnd.innerHTML = `${currentPlayer.name} wins! Restart to play again.`;
      }
    };

    const board = document.querySelector(".game-board");
    board.addEventListener("click", (e) => {
      const cell = e.target;
      const currentPlayer = determinePlayerTurn(this.turns);
      if (!gameComplete) {
        if (this.board.checkCell(this.board.board[cell.id])) {
          this.board.addToBoard(cell.id, currentPlayer.piece);
          playRound(currentPlayer);
          nextTurn();
        }
      }
    });
  }
  restartGame() {
    this.turns = 1;
    this.board.deleteBoard();
    this.gameEnd.innerHTML = "";
  }
}




class GameUI {
  constructor() {
    this.logic;
  }
  handleScreenShown() {
    // start screen to play screen
    const playerForm = document.querySelector("form");
    let startUI = playerForm.parentNode;
    const gameInProgress = document.querySelector(".game-in-progress.off");
    const gameBoard = document.querySelector(".game-board.off");
    let children = [...gameInProgress.children];
    playerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const playerOne = document.getElementById("playerOneName").value;
      const playerTwo = document.getElementById("playerTwoName").value;
      this.logic = new GameBackend(playerOne, playerTwo);
      startUI.className = "start-ui closed";
      gameInProgress.classList.remove("off");
      gameBoard.classList.remove("off");
      children.forEach((child) => {
        child.classList.remove("off");
      });
      this.logic.board.createBoard();
      this.logic.playGame();
    });
    // restart functionality
    const restartGame = document.querySelector(".restart");
    restartGame.addEventListener("click", () => {
      this.logic.restartGame();
      gameInProgress.classList.add("off");
      gameBoard.classList.add("off");
      children.forEach((child) => {
        child.classList.add("off");
      });

      gameInProgress.classList.remove("off");
      gameBoard.classList.remove("off");
      children.forEach((child) => {
        child.classList.remove("off");
      });
      this.logic.board.createBoard();
      this.logic.playGame();
    });
  }
}


const UI = new GameUI();
UI.handleScreenShown();
