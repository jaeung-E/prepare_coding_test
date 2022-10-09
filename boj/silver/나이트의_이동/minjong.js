// https://www.acmicpc.net/problem/7562

const DX = [2, 1, -1, -2, -2, -1, 1, 2];
const DY = [1, 2, 2, 1, -1, -2, -2, -1];

const [[l], ...input] = require('fs').readFileSync('../../input.txt', 'utf-8').trim().split('\n').map((x) => x.split(' ').map(Number));

function solution(l, departure, arrival) {
  const board = Array.from({length: l}, () => new Array(l).fill(false));
  const queue = [[...departure, 0]]

  while (queue.length !== 0) {
    const [x, y, count] = queue.shift();

    if (!board[x][y]) {
      board[x][y] = true;

      if (x === arrival[0] && y == arrival[1]) return count

      for (let i = 0; i < 8; i += 1) {
        const nx = x + DX[i];
        const ny = y + DY[i];
        if ((nx >= 0 && nx < l && ny >= 0 && ny < l)) {
          if (!board[nx][ny]) {
            queue.push([nx, ny, count + 1]);
          }
        }
      }
    }
  }

}

for (let i = 0; i < input.length / 3; i += 1) {
  const sliceIndex = i * 3;
  const [[l], departure, arrival] = input.slice(sliceIndex, sliceIndex + 3)
  console.log(solution(l, departure, arrival));
}
