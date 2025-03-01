document.addEventListener("DOMContentLoaded", () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const winningLine = document.getElementById("winning-line");
  const resetButton = document.getElementById("reset");
  const player1ScoreDisplay = document.getElementById("player1-score");
  const player2ScoreDisplay = document.getElementById("player2-score");
  
  let currentPlayer = 'X';
  let gameActive = true;
  let player1Score = 0;
  let player2Score = 0;

  function handleCellClick(event) {
      if (!gameActive) return;

      const cell = event.target;
      if (cell.textContent !== '') return;

      cell.textContent = currentPlayer;
      cell.classList.add('occupied');

      const winningCombo = checkForWin();
      if (winningCombo) {
          drawWinningLine(winningCombo);
          updateScores(currentPlayer);
          gameActive = false;
          setTimeout(resetBoard, 500);
          return;
      }

      if (checkForDraw()) {
          setTimeout(() => alert("It's a draw!"), 500);
          gameActive = false;
          setTimeout(resetBoard, 200);
          return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkForWin() {
      const winningCombos = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
      ];

      for (const combo of winningCombos) {
          const [a, b, c] = combo;
          if (
              cells[a].textContent &&
              cells[a].textContent === cells[b].textContent &&
              cells[a].textContent === cells[c].textContent
          ) {
              return combo;
          }
      }
      return null;
  }

  function checkForDraw() {
      return cells.every(cell => cell.textContent !== '');
  }

  function drawWinningLine(combo) {
      const [a, b, c] = combo;
      const cellA = cells[a].getBoundingClientRect();
      const cellC = cells[c].getBoundingClientRect();
      const board = document.querySelector('.board').getBoundingClientRect();

      const x1 = cellA.left + cellA.width / 2 - board.left;
      const y1 = cellA.top + cellA.height / 2 - board.top;
      const x2 = cellC.left + cellC.width / 2 - board.left;
      const y2 = cellC.top + cellC.height / 2 - board.top;

      const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

      winningLine.style.width = `${length}px`;
      winningLine.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  }

  function updateScores(winner) {
      if (winner === 'X') {
          player1Score++;
          player1ScoreDisplay.textContent = player1Score;
      } else {
          player2Score++;
          player2ScoreDisplay.textContent = player2Score;
      }
  }
  function drawWinningLine(combo) {
    const [a, , c] = combo;
    const board = document.querySelector('.board');
    const cellA = document.getElementById(`cell-${a}`).getBoundingClientRect();
    const cellC = document.getElementById(`cell-${c}`).getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();
    const winningLine = document.getElementById("winning-line");

    const x1 = cellA.left + cellA.width / 2 - boardRect.left;
    const y1 = cellA.top + cellA.height / 2 - boardRect.top;
    const x2 = cellC.left + cellC.width / 2 - boardRect.left;
    const y2 = cellC.top + cellC.height / 2 - boardRect.top;

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    winningLine.style.width = `${length}px`;
    winningLine.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
}


  function resetBoard() {
      cells.forEach(cell => {
          cell.textContent = '';
          cell.classList.remove('occupied');
      });

      winningLine.style.width = '0';
      gameActive = true;
      currentPlayer = 'X';
  }

  function resetGame() {
      resetBoard();  // Reset the board
      player1Score = 0;
      player2Score = 0;
      player1ScoreDisplay.textContent = '0';
      player2ScoreDisplay.textContent = '0';
  }

  resetButton.addEventListener('click', resetGame);
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});
