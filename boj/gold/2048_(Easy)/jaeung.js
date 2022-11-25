const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const [[N], ...board] = input.map((str) => str.split(" ").map(Number));

console.log(solution());

function solution() {
  let max = 0;
  const stack = [[board, 0]];
  const options = ["UP", "RIGHT", "DOWN", "LEFT"];

  while (stack.length > 0) {
    const [board, count] = stack.pop();

    if (count === 5) {
      board.forEach((arr) => (max = Math.max(max, ...arr)));
      continue;
    }

    options.forEach((option) => {
      stack.push([moveBlock(option, board), count + 1]);
    });
  }

  return max;
}

function moveBlock(option, array) {
  const newBoard = copyArray(array);
  const queue = [];

  switch (option) {
    case "UP":
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          if (newBoard[x][y] !== 0) {
            queue.push(newBoard[x][y]);
            newBoard[x][y] = 0;
          }
        }

        let column = 0;

        while (queue.length > 0) {
          const block = queue.shift();

          if (newBoard[column][y] === 0) {
            newBoard[column][y] = block;
          } else if (newBoard[column][y] === block) {
            newBoard[column][y] *= 2;
            column++;
          } else {
            newBoard[++column][y] = block;
          }
        }
      }

      break;
    case "RIGHT":
      for (let x = 0; x < N; x++) {
        for (let y = N - 1; y >= 0; y--) {
          if (newBoard[x][y] !== 0) {
            queue.push(newBoard[x][y]);
            newBoard[x][y] = 0;
          }
        }

        let row = N - 1;

        while (queue.length > 0) {
          const block = queue.shift();

          if (newBoard[x][row] === 0) {
            newBoard[x][row] = block;
          } else if (newBoard[x][row] == block) {
            newBoard[x][row] *= 2;
            row--;
          } else {
            newBoard[x][--row] = block;
          }
        }
      }

      break;
    case "DOWN":
      for (let y = 0; y < N; y++) {
        for (let x = N - 1; x >= 0; x--) {
          if (newBoard[x][y] != 0) {
            queue.push(newBoard[x][y]);
            newBoard[x][y] = 0;
          }
        }

        let column = N - 1;

        while (queue.length > 0) {
          const block = queue.shift();

          if (newBoard[column][y] === 0) {
            newBoard[column][y] = block;
          } else if (newBoard[column][y] == block) {
            newBoard[column][y] *= 2;
            column--;
          } else {
            newBoard[--column][y] = block;
          }
        }
      }

      break;
    case "LEFT":
      for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
          if (newBoard[x][y] !== 0) {
            queue.push(newBoard[x][y]);
            newBoard[x][y] = 0;
          }
        }

        let row = 0;

        while (queue.length > 0) {
          const block = queue.shift();

          if (newBoard[x][row] === 0) {
            newBoard[x][row] = block;
          } else if (newBoard[x][row] == block) {
            newBoard[x][row] *= 2;
            row++;
          } else {
            newBoard[x][++row] = block;
          }
        }
      }

      break;
    default:
      console.error("유효하지 않은 옵션입니다.");
  }

  return newBoard;
}

function copyArray(array) {
  return JSON.parse(JSON.stringify(array));
}
