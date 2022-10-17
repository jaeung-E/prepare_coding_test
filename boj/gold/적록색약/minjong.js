// https://www.acmicpc.net/problem/10026

const [N, ...rgb] = require('fs').readFileSync('../../input.txt', 'utf-8').trim().split('\n');

function solution(N, nomRgb) {
  let nomCount = 0;
  let bldCount = 0;

  const nomVisited = Array.from({ length: N }, () => Array(N).fill(false));
  const bldVisited = Array.from({ length: N }, () => Array(N).fill(false));

  const bldRgb = rgb.map(x => x.replaceAll("G", "R"));
  for (let x = 0; x < rgb.length; x += 1) {
    for (let y = 0; y < rgb[x].length; y += 1) {
      if (!nomVisited[x][y]) {
        nomCount += 1;
        bfs(x, y, nomVisited, nomRgb);
      }

      if (!bldVisited[x][y]) {
        bldCount += 1;
        bfs(x, y, bldVisited, bldRgb);
      }
    }
  }

  return `${nomCount} ${bldCount}`
}

function bfs(x, y, visited, graph) {
  const DX = [-1, 1, 0, 0];
  const DY = [0, 0, 1, -1];
  const queue = [[x, y]];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let i = 0; i < DX.length; i += 1) {
      const nx = x + DX[i];
      const ny = y + DY[i];

      if (nx >= 0 && nx < graph.length && ny >= 0 && ny < graph[nx].length) {
        if (!visited[nx][ny] && graph[x][y] === graph[nx][ny]) {
          visited[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }
  }
}

console.log(solution(Number(N), rgb));