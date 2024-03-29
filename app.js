import {
  addBlurStyleToTable,
  blockHasMark,
  blurBlocks,
  checkTie,
  checkwinner,
  setMark,
} from "./helpers";

// Selecting Elements
const blockElements = Array.from(document.querySelectorAll(".block"));
const player1ScoreEl = document.querySelector(".player1-score-value");
const player2ScoreEl = document.querySelector(".player2-score-value");
const turnEl = document.querySelector(".turn");
const winnerBoxEl = document.querySelector(".winner-box");
const tableEl = document.querySelector(".table");
const rematchBtn = document.querySelector(".rematch-btn");
const body = document.querySelector("body");
const playersEl = document.querySelector(".players");
const winnerEl = document.querySelector(".winner");

// Important variables
let turn = false; // false for player one and true for player 2W
const playedBlocks = {
  player1: [],
  player2: [],
};
let winner = false;
let tie = false;

blockElements.forEach((blockEl) => {
  blockEl.addEventListener("mouseover", function () {
    // Set hover effect on empty blocks
    if (blockHasMark(blockEl)) return;
    if (winner) return;

    this.style.backgroundColor = "#dac3f9";
    this.style.cursor = "pointer";
  });
  blockEl.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "#f3ebfd";
    this.style.cursor = "default";
  });

  //  Main Flow
  blockEl.addEventListener("click", function () {
    // 1) Check if the block already has any sign or not and check if the game has finished or not
    if (blockHasMark(blockEl)) return;
    if (winner) return;

    // 2) Show the corresponding mark according to the player in the game table
    setMark(this, turn);

    // 3) Add marked block to playedblocks
    !turn
      ? playedBlocks.player1.push(+blockEl.dataset.blockNumber)
      : playedBlocks.player2.push(+blockEl.dataset.blockNumber);

    // 4) Check to see if we have a winner or not
    if (!turn) {
      if (checkwinner(playedBlocks.player1.sort())) {
        // Set display changes
        player1ScoreEl.textContent = +player1ScoreEl.textContent + 1;
        winnerBoxEl.style.display = "grid";
        tableEl.style.margin = 0;
        playersEl.classList.add("blur");
        addBlurStyleToTable(blurBlocks(playedBlocks.player1.sort()));
        console.log(winnerEl);
        console.log(winnerEl.innerHTML);
        winnerEl.innerHTML = "Player 1 Won 🔥";

        winner = true;
        return;
      }
    } else {
      if (checkwinner(playedBlocks.player2.sort())) {
        // Set display changes
        player2ScoreEl.textContent = +player2ScoreEl.textContent + 1;
        winnerBoxEl.style.display = "grid";
        tableEl.style.margin = 0;
        playersEl.classList.add("blur");
        addBlurStyleToTable(blurBlocks(playedBlocks.player2.sort()));
        winnerEl.innerHTML = "Player 2 Won 🔥";

        winner = true;
        return;
      }
    }

    // 5) Check for draw
    if (checkTie(playedBlocks)) {
      winnerBoxEl.style.display = "grid";
      tableEl.style.margin = 0;
      winnerEl.innerHTML = "Tie 🔥";

      tie = true;
    }

    // 6) Change turn
    turn = !turn;
    // 6.1) change mark in turn showcase
    setMark(turnEl, turn);

    console.log();
  });
});

rematchBtn.addEventListener("click", function () {
  winner = false;
  blockElements.forEach((el) => (el.innerHTML = ""));
  winnerBoxEl.style.display = "none";
  tableEl.style.margin = "0 auto";
  playersEl.classList.remove("blur");
  blockElements.forEach((blockEl) => blockEl.classList.remove("blur"));
  playedBlocks.player1 = [];
  playedBlocks.player2 = [];
  turn = false;
  turnEl.innerHTML = '<div class="dot"></div>';
});
