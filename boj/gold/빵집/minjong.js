const isLinux = process.platform === 'linux'
const input = require('fs')
  .readFileSync(isLinux ? '/dev/stdin' : '../../input.txt', 'utf-8')
  .trim()
  .split('\n');

function solution(input) {
  const [r, c] = input[0].split(' ').map(Number);
  const graph = Array.from({ length: r }, () => []);

  input.slice(1).forEach((v, i) => {
    graph[i].push(...v.split(''));
  });

  const visited = Array.from({ length: r }, () => new Array(c).fill(false));
  let pipeCount = 0;

  for (let i = 0; i < r; i += 1) {
    const x = i;
    const y = 0;
    if (dfs(x, y, graph, visited)) pipeCount += 1;
  }

  return pipeCount
}

function dfs(x, y, graph, visited) {
  const width = graph.length;
  const height = graph[0].length;
  const DX = [-1, 0, 1];
  const DY = [1, 1, 1];
  visited[x][y] = true;

  if (y === (height - 1)) {
    return true;
  }

  for (let i = 0; i < DX.length; i += 1) {
    const nx = x + DX[i];
    const ny = y + DY[i];

    const isBound = checkBound(nx, ny, width, height);
    if (!isBound) continue;

    const isBuilding = (graph[nx][ny] === 'x');
    if (isBuilding) continue

    const isVisited = (visited[nx][ny] === true);

    if (!isVisited) {
      if (dfs(nx, ny, graph, visited)) return true;
    }
  }
  return false
}

function checkBound(x, y, width, height) {
  return (x >= 0 && x < width && y >= 0 && y < height);
}

console.log(solution(input));