const boardSize = 10;
const mineCount = 10;
let board = [];

function createBoard() {
  const boardElement = document.getElementById('game-board');
  boardElement.innerHTML = '';
  board = [];

  // 지뢰 위치 생성
  let minePositions = new Set();
  while (minePositions.size < mineCount) {
    minePositions.add(Math.floor(Math.random() * boardSize * boardSize));
  }

  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;

    if (minePositions.has(i)) {
      cell.dataset.mine = 'true';
    }

    cell.addEventListener('click', () => handleCellClick(cell));
    boardElement.appendChild(cell);
    board.push(cell);
  }
}

function handleCellClick(cell) {
  if (cell.classList.contains('revealed')) return;

  cell.classList.add('revealed');

  if (cell.dataset.mine === 'true') {
    cell.textContent = '💣';
    alert('지뢰! 게임 종료');
    revealAll();
  } else {
    cell.textContent = '';
    // 나중에 주변 지뢰 개수 표시 가능
  }
}

function revealAll() {
  board.forEach(cell => {
    if (cell.dataset.mine === 'true') {
      cell.textContent = '💣';
      cell.classList.add('revealed');
    }
  });
}

function resetGame() {
  createBoard();
}

createBoard();
