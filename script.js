let currentPlayer = "X"; // Player X starts
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Empty game board

const cells = document.querySelectorAll(".cell");
const statusDiv = document.getElementById("status");

// Add click event to each cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleMove(index, cell));
});

function handleMove(index, cell) {
  // If the cell is already filled, return
  if (gameBoard[index] !== "") return;

  // Mark the cell
  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  // Check for winner
  if (checkWinner()) {
    statusDiv.textContent = `Player ${currentPlayer} Wins!`;
    disableBoard();
  } else if (gameBoard.every(cell => cell !== "")) {
    statusDiv.textContent = "It's a Draw!";
  } else {
    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDiv.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}
function restartGame() {
  let cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.innerText = '';
  });

  currentPlayer = 'X'; // or 'O', depending on your starting player
  gameActive = true; // reset game status
  document.getElementById('status').innerText = "Player X's Turn"; // if using status
}

function disableBoard() {
  cells.forEach(cell => cell.removeEventListener("click", handleMove));
}
