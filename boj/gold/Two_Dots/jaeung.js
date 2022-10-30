const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const board = input.map((str) => str.split(""));

console.log(solution(N, M, board));

function solution(N, M, board) {
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (searchCycle(x, y, N, M, board)) return "Yes";
    }
  }

  return "No";
}

function searchCycle(x, y, N, M, board) {
  const stack = [[x, y]];
  const visited = Array.from(Array(board.length), () =>
    Array(board[0].length).fill(false)
  );
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  visited[x][y] = true;

  loop: while (stack.length > 0) {
    const [currentX, currentY] = stack[stack.length - 1];
    const [startX, startY] = stack[0];

    for (let i = 0; i < dx.length; i++) {
      const nx = dx[i] + currentX;
      const ny = dy[i] + currentY;
      const isVisit = isBound(nx, ny, N, M) && visited[nx][ny] === true;
      const isSameColor =
        isBound(nx, ny, N, M) && board[currentX][currentY] === board[nx][ny];
      const isCycle =
        isBound(nx, ny, N, M) &&
        nx === startX &&
        ny === startY &&
        stack.length >= 4;

      if (!isVisit && isSameColor) {
        stack.push([nx, ny]);
        visited[nx][ny] = true;
        continue loop;
      }

      if (isCycle) return true;
    }

    stack.pop();
  }

  return false;
}

function isBound(x, y, N, M) {
  return x >= 0 && y >= 0 && x < N && y < M ? true : false;
}
