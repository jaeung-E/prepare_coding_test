const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const [[N], ...initialBoard] = input.map((str) => str.split(" ").map(Number));

console.log(solution());

function solution() {
  let max = 0;
  const stack = [[initialBoard, 0]];

  while (stack.length > 0) {
    const [board, count] = stack.pop();
    let temp = copyArray(board);

    if (count === 5) {
      board.forEach((arr) => (max = Math.max(max, ...arr)));
      continue;
    }

    for (let i = 0; i < 4; i++) {
      stack.push([moveBlock(temp), count + 1]);
      temp = rotateBoard(temp);
    }
  }

  return max;
}

function rotateBoard(board) {
  const rotatedBoard = copyArray(board);

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      rotatedBoard[x][y] = board[y][N - x - 1];
    }
  }

  return rotatedBoard;
}

function moveBlock(board) {
  const newBoard = Array.from({ length: N }, () => Array(N).fill(0));
  const queue = [];

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (board[x][y] !== 0) queue.push(board[x][y]);
    }

    let row = 0;

    while (queue.length > 0) {
      const block = queue.shift();

      if (newBoard[row][y] === 0) {
        newBoard[row][y] = block;
      } else if (newBoard[row][y] === block) {
        newBoard[row][y] *= 2;
        row++;
      } else {
        newBoard[++row][y] = block;
      }
    }
  }

  return newBoard;
}

function copyArray(array) {
  return JSON.parse(JSON.stringify(array));
}
