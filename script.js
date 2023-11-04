const board = ChessBoard('board', {
  position: 'start',
  draggable: true,
  onDragStart,
  onDrop,
  onSnapEnd
});

let game = new Chess();
let isPlayerTurn = true;

document.getElementById('startBtn').addEventListener('click', () => {
  board.position('start');
  game = new Chess();
  isPlayerTurn = true;
});

document.getElementById('resetBtn').addEventListener('click', () => {
  board.position('start');
  game = new Chess();
  isPlayerTurn = true;
});

function onDragStart(source, piece) {
  if (!isPlayerTurn || game.in_checkmate() || game.in_draw() || game.in_stalemate() || game.in_threefold_repetition() || game.insufficient_material()) {
    return false;
  }
}

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q' // promote to queen by default
  });

  removeGreySquares();
  board.position(game.fen());

  if (!move) return;

  isPlayerTurn = false;
  setTimeout(makeBestAIMove, 250);
}

function onSnapEnd() {
  board.position(game.fen());
}

function makeBestAIMove() {
  const bestMove = getBestMove();
  game.ugly_move(bestMove);
  board.position(game.fen());
  isPlayerTurn = true;
}

function getBestMove() {
  // In a complete project, you'd integrate a chess engine API like Stockfish here
  // For simplicity, this example generates a random move
  const legalMoves = game.ugly_moves();
  const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
  return randomMove;
}

function removeGreySquares() {
  const elements = document.querySelectorAll('.square-55d63');
  elements.forEach((el) => {
    el.style.background = '';
  });
}
