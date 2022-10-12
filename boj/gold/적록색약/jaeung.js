const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const N = +input.shift();
const grids = input.map((str) => str.split(""));

solution(N, grids);

function solution(N, grids) {
  let normalCount = 0,
    weaknessCount = 0;
  const visited = Array.from(Array(N), () => Array(N).fill(false));
  const visitedWeakness = Array.from(Array(N), () => Array(N).fill(false));
  const weaknessGrids = Array.from(grids, (arr) =>
    arr.join("").replaceAll("G", "R").split("")
  );

  grids.forEach((x, i) => {
    x.forEach((_, j) => {
      const isVisited = visited[i][j] === true;
      const isVisitedWeakness = visitedWeakness[i][j] === true;

      if (!isVisitedWeakness) {
        weaknessCount++;
        searchArea(i, j, visitedWeakness, weaknessGrids);
      }

      if (!isVisited) {
        normalCount++;
        searchArea(i, j, visited, grids);
      }
    });
  });

  console.log(normalCount, weaknessCount);
}

function searchArea(x, y, visited, grids) {
  const queue = [[x, y]];
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    dx.forEach((_, index) => {
      const nx = x + dx[index];
      const ny = y + dy[index];
      const isVisited = isBound(nx, ny, N) && visited[nx][ny] === true;
      const isSameColor = isBound(nx, ny, N) && grids[x][y] === grids[nx][ny];

      if (!isVisited && isSameColor) {
        queue.push([nx, ny]);
        visited[nx][ny] = true;
      }
    });
  }
}

function isBound(x, y, N) {
  if (x >= 0 && y >= 0 && x < N && y < N) return true;

  return false;
}
