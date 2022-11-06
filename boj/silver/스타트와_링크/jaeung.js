const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const [[N], ...stats] = input.map((str) => str.split(" ").map(Number));

console.log(solution(N, stats));

function solution(N, stats) {
  return getDifferenceMinimum(N, N / 2, stats);
}

function getDifferenceMinimum(length, depth, stats) {
  const stack = [];
  const visited = Array(length + 1).fill(false);
  let minDifference = Infinity;

  for (let i = length; i >= 1; i--) {
    stack.push([i]);
  }

  while (stack.length > 0) {
    if (minDifference === 0) return 0;

    const sequence = stack.pop();
    const max = sequence[sequence.length - 1];

    for (let i = 1; i <= length; i++) {
      visited[i] = i <= max ? true : false;
    }

    if (depth === sequence.length) {
      minDifference = Math.min(minDifference, getDifference(sequence, stats));
    }

    for (let i = length; i >= sequence[0]; i--) {
      const isVisit = visited[i] === true;

      if (!isVisit) {
        stack.push([...sequence, i]);
        visited[i] = true;
      }
    }
  }

  return minDifference;
}

function getDifference(teamStart, stats) {
  const employee = Array.from(Array(N), (_, i) => ++i);
  const teamLink = employee.filter((num) => !teamStart.includes(num));
  let scoreStart = 0,
    scoreLink = 0;

  for (let i = 0; i < teamStart.length; i++) {
    for (let j = 0; j < teamStart.length; j++) {
      scoreStart += stats[teamStart[i] - 1][teamStart[j] - 1];
      scoreLink += stats[teamLink[i] - 1][teamLink[j] - 1];
    }
  }

  return Math.abs(scoreStart - scoreLink);
}
