const cells = Array.from(document.querySelectorAll('.cell'));
let currentPlayer = 'X';

function handleCellClick(event) {
  const cell = event.target;
  cell.textContent = currentPlayer;
  cell.classList.add('occupied');
  cell.removeEventListener('click', handleCellClick);
  
  if (checkForWin()) {
    alert(`Player ${currentPlayer} wins!`);
    resetGame();
    return;
  }
  
  if (checkForDraw()) {
    alert('It\'s a draw!');
    resetGame();
    return;
  }
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkForWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

function checkForDraw() {
  return cells.every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('occupied');
    cell.addEventListener('click', handleCellClick);
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});
