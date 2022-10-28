const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const [R, C] = input.shift().split(" ").map(Number);
const grids = input.map((str) => str.split(""));

console.log(solution(R, C, grids));

function solution(R, C, grids) {
  const visited = Array.from(Array(R), () => Array(C).fill(false));
  let pipeCount = 0;

  for (let x = 0; x < R; x++) {
    if (searchLine(x, visited, grids)) pipeCount++;
  }

  return pipeCount;
}

function searchLine(x, visited, grids) {
  const stack = [[x, 0]];
  const dx = [-1, 0, 1];
  const dy = [1, 1, 1];

  visited[x][0] = true;

  loop: while (stack.length > 0) {
    const [currentX, currentY] = stack[stack.length - 1];
    const isEnd = currentY === C - 1;

    if (isEnd) return true;

    for (let i = 0; i < dx.length; i++) {
      const nx = currentX + dx[i];
      const ny = currentY + dy[i];
      const isVisit = isBound(nx, ny, R, C) && visited[nx][ny] === true;
      const isEmpty = isBound(nx, ny, R, C) && grids[nx][ny] === ".";

      if (!isVisit && isEmpty) {
        stack.push([nx, ny]);
        visited[nx][ny] = true;
        continue loop;
      }
    }

    stack.pop();
  }

  return false;
}

function isBound(x, y, R, C) {
  if (x >= 0 && y >= 0 && x < R && y < C) return true;

  return false;
}
