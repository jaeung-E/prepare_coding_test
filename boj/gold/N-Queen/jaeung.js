const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim();
const N = +input;

console.log(solution(N));

function solution(N) {
  let count = 0;
  const stack = Array.from(Array(N), (_, index) => [index + 1]);

  while (stack.length > 0) {
    const board = stack.pop();

    if (board.length === N) {
      count++;
      continue;
    }

    for (let i = 1; i <= N; i++) {
      if (isPossible(board, i)) {
        stack.push([...board, i]);
      }
    }
  }

  return count;
}

function isPossible(board, nextCol) {
  const nextRow = board.length + 1;

  for (let i = 0; i < board.length; i++) {
    const prevRow = i + 1;
    const prevCol = board[i];
    const isSameCol = prevCol === nextCol;
    const isDiagonal = nextRow - prevRow === Math.abs(nextCol - prevCol);

    if (isSameCol || isDiagonal) return false;
  }

  return true;
}
