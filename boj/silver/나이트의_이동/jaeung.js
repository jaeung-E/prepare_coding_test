const getInput = () => {
  const fs = require("fs");
  const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");

  return input.map((str) => str.split(" ").map(Number));
};

const solution = (N, TC) => {
  const answer = [];

  for (let i = 0; i < N * 3; i += 3) {
    const [[sideLength], [startX, startY], [endX, endY]] = TC.slice(i, i + 3);
    answer.push(bfs(sideLength, startX, startY, endX, endY));
  }

  answer.forEach((num) => console.log(num));
};

const bfs = (sideLength, startX, startY, endX, endY) => {
  const chessboard = Array.from(Array(sideLength), () =>
    Array(sideLength).fill(0)
  );
  const dx = [-2, -1, 1, 2, 2, 1, -1, -2];
  const dy = [1, 2, 2, 1, -1, -2, -2, -1];
  const queue = [];

  queue.push([startX, startY, 0]);
  chessboard[startX][startY] = 1;

  while (queue.length > 0) {
    const [currentX, currentY, depth] = queue.shift();
    const isEnd = endX === currentX && endY === currentY;

    if (isEnd) return depth;

    dx.forEach((_, index) => {
      const nx = dx[index] + currentX;
      const ny = dy[index] + currentY;

      if (isBound(nx, ny, sideLength) && chessboard[nx][ny] === 0) {
        queue.push([nx, ny, depth + 1]);
        chessboard[nx][ny] = 1;
      }
    });
  }

  return 0;
};

const isBound = (x, y, sideLength) => {
  if (x < sideLength && y < sideLength && x >= 0 && y >= 0) return true;

  return false;
};

const [[N], ...TC] = getInput();
solution(N, TC);
