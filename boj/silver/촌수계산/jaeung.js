const getInput = () => {
  const fs = require("fs");
  const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");

  return input.map((str) => str.split(" ").map(Number));
};

const solution = (N, startNumber, endNumber, relations) => {
  const familyTrees = Array.from(Array(N + 1), () => Array(N + 1).fill(0));

  relations.forEach(([start, end]) => {
    familyTrees[start][end] = 1;
    familyTrees[end][start] = 1;
  });

  console.log(bfs(startNumber, endNumber, familyTrees));
};

const bfs = (startNumber, endNumber, familyTrees) => {
  const visited = Array(N + 1).fill(false);
  const queue = [];

  queue.push([startNumber, 0]);
  visited[startNumber] = true;

  while (queue.length > 0) {
    const [people, depth] = queue.shift();

    if (people === endNumber) return depth;

    familyTrees[people].forEach((value, index) => {
      const isVisited = value === 1 && !visited[index];

      if (isVisited) {
        queue.push([index, depth + 1]);
        visited[index] = true;
      }
    });
  }

  return -1;
};

const [[N], [startNumber, endNumber], _, ...relations] = getInput();
solution(N, startNumber, endNumber, relations);
