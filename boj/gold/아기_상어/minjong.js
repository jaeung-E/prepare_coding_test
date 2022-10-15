// https://www.acmicpc.net/problem/16236

const [[N], ...graph] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : '../../input.txt', 'utf-8')
  .split('\n')
  .map(x => x.split(' ').map(Number));


function solution(N, graph) {
  const [x, y] = findShark(graph);
  graph[x][y] = 0;

  let sharkSize = 2;
  let moveCount = 0;
  let eatCount = 0;

  const DX = [-1, 1, 0, 0];
  const DY = [0, 0, 1, -1];
  let visited = Array.from({ length: N }, () => Array(N).fill(false));
  const queue = [[x, y, 0]];
  visited[x][y] = true;

  while (queue.length > 0 && findFish(graph, sharkSize)) {
    sortQueue(queue);
    const [x, y, time] = queue.shift();

    if (graph[x][y] !== 0 && graph[x][y] < sharkSize) {
      graph[x][y] = 0;
      eatCount += 1;

      if (eatCount === sharkSize) {
        sharkSize += 1;
        eatCount = 0;
      }

      visited = Array.from({ length: N }, () => Array(N).fill(false));
      queue.splice(0);
      moveCount = time;
    }

    for (let i = 0; i < DX.length; i += 1) {
      const nx = x + DX[i];
      const ny = y + DY[i];

      if (nx >= 0 && nx < N && ny >= 0 & ny < N) {
        if (!visited[nx][ny] && graph[nx][ny] <= sharkSize) {
          visited[nx][ny] = true
          queue.push([nx, ny, time + 1]);
        }
      }
    }
  }
  return moveCount;
}

function sortQueue(queue) {
  queue.sort((a, b) => {
    if (a[2] === b[2]) {
      if (a[0] === b[0]) return a[1] - b[1];
      return a[0] - b[0]
    }
    return a[2] - b[2]
  })
}

function findShark(graph) {
  for (let x = 0; x < graph.length; x += 1) {
    for (let y = 0; y < graph[x].length; y += 1) {
      if (graph[x][y] === 9) return [x, y];
    }
  }
}

function findFish(graph, sharkSize) {
  for (let x = 0; x < graph.length; x += 1) {
    for (let y = 0; y < graph[x].length; y += 1) {
      if (graph[x][y] !== 0 && graph[x][y] < sharkSize) return true
    }
  }
  return false;
}

console.log(solution(N, graph));