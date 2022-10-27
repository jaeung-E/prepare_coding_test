const isLinux = process.platform === 'linux'
const input = require('fs')
  .readFileSync(isLinux ? '/dev/stdin' : '../../input.txt', 'utf-8')
  .trim()
  .split('\n');

let isCycle = false;

function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);
  const map = input.slice(1);
  const visited = Array.from({ length: N }, () => new Array(M).fill(false));

  for (let x = 0; x < N; x += 1) {
    for (let y = 0; y < M; y += 1) {
      dfs(x, y, x, y, 1, map, visited);
      if (isCycle) return 'Yes';
    }
  }

  return 'No';
}

function dfs(x, y, startX, startY, count, map, visited) {
  const width = map.length;
  const height = map[0].length;
  const DX = [1, -1, 0, 0];
  const DY = [0, 0, -1, 1];
  visited[startX][startY] = true;

  for (let i = 0; i < DX.length; i += 1) {
    const nx = x + DX[i];
    const ny = y + DY[i];

    const isBound = checkBound(nx, ny, width, height);
    if (!isBound) continue;

    const isSameColor = (map[startX][startY] === map[nx][ny]);
    if (!isSameColor) continue;

    if (count >= 4 && nx === startX && ny === startY) {
      isCycle = true;
      return;
    }

    const isVisited = (visited[nx][ny] === true);
    if (!isVisited) {
      visited[nx][ny] = true;
      dfs(nx, ny, startX, startY, count + 1, map, visited);
      visited[nx][ny] = false;
    }
  }
}

function checkBound(x, y, width, height) {
  return (x >= 0 && x < width && y >= 0 && y < height);
}

console.log(solution(input))
