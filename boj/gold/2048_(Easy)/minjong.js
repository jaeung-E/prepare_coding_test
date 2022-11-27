// https://www.acmicpc.net/problem/12100

const isLinux = process.platform === 'linux';
const file = isLinux ? '/dev/stdin' : '../../input.txt';
const input = require('fs')
  .readFileSync(file, 'utf-8')
  .trim()
  .split('\n');

const [[N], ...board] = input.map((x) => x.split(' ').map(Number));

const solution = (board) => {
  return search(0, board);
}

const search = (count, board) => {
  let maxValue = -Infinity;
  if (count === 5) {
    board.forEach((x) => maxValue = Math.max(maxValue, ...x));
    return maxValue;
  }

  for (let i = 0; i < 4; i += 1) {
    const copiedBoard = copyBoard(board);
    maxValue = Math.max(maxValue, search(count + 1, moveBoardItem(copiedBoard, i)));
  }
  return maxValue
}

const moveBoardItem = (board, direction) => {
  switch (direction) {
    case 0:
      moveItemLeft(board);
      break;
    case 1:
      moveItemRight(board);
      break;
    case 2:
      moveItemUp(board);
      break;
    case 3:
      moveItemDown(board);
      break;
    default:
      break;
  }
  return board;
}

const moveItemLeft = (board) => {
  for (let x = 0; x < N; x += 1) {
    let column = 0;
    for (let y = 1; y < N; y += 1) {
      if (board[x][y] !== 0) {
        let tempValue = board[x][y];
        board[x][y] = 0;

        if (board[x][column] === 0) {
          board[x][column] = tempValue;
        } else if (board[x][column] === tempValue) {
          board[x][column++] = tempValue * 2;
        } else {
          board[x][++column] = tempValue;
        }
      }
    }
  }
}

const moveItemRight = (board) => {
  for (let x = 0; x < N; x += 1) {
    let column = N - 1;
    for (let y = N - 2; y >= 0; y -= 1) {
      if (board[x][y] !== 0) {
        let tempValue = board[x][y];
        board[x][y] = 0;

        if (board[x][column] === 0) {
          board[x][column] = tempValue;
        } else if (board[x][column] === tempValue) {
          board[x][column--] = tempValue * 2;
        } else {
          board[x][--column] = tempValue;
        }
      }
    }
  }
}

const moveItemUp = (board) => {
  for (let y = 0; y < N; y += 1) {
    let row = 0;
    for (x = 1; x < N; x += 1) {
      if (board[x][y] !== 0) {
        let tempValue = board[x][y];
        board[x][y] = 0;

        if (board[row][y] === 0) {
          board[row][y] = tempValue;
        } else if (board[row][y] === tempValue) {
          board[row++][y] = tempValue * 2;
        } else {
          board[++row][y] = tempValue;
        }
      }
    }
  }
}


const moveItemDown = (board) => {
  for (let y = 0; y < N; y += 1) {
    let row = N - 1
    for (x = N - 2; x >= 0; x -= 1) {
      if (board[x][y] !== 0) {
        let tempValue = board[x][y];
        board[x][y] = 0;

        if (board[row][y] === 0) {
          board[row][y] = tempValue;
        } else if (board[row][y] === tempValue) {
          board[row--][y] = tempValue * 2;
        } else {
          board[--row][y] = tempValue;
        }
      }
    }
  }
}

const copyBoard = (board) => {
  return board.map(x => [...x]);
}

console.log(solution(board));