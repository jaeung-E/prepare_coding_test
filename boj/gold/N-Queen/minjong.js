const isLinux = process.platform === 'linux';
const file = isLinux ? '/dev/stdin' : '../../input.txt';
const input = require('fs')
  .readFileSync(file, 'utf-8')
  .trim();

const N = Number(input);

const solution = (N) => {
  const queens = new Array(N).fill(0);
  return search(queens, 0)
}

const search = (queens, row) => {
  let count = 0;

  if (queens.length === row) return 1;

  for (let column = 0; column < queens.length; column += 1) {
    queens[row] = column;
    const isPlacedQueen = checkQueens(queens, row);
    if (isPlacedQueen) count += search(queens, row + 1)
  }
  return count;
}

const checkQueens = (queens, row) => {
  for (let i = 0; i < row; i += 1) {
    if (queens[i] === queens[row] || Math.abs(queens[i] - queens[row]) === (row - i)) return false;
  }
  return true;
}

console.log(solution(N));