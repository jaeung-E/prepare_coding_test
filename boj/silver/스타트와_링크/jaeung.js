const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const [[N], ...stats] = input.map((str) => str.split(" ").map(Number));

console.log(solution(N, stats));

function solution(N, stats) {
  const employee = Array.from(Array(N), (_, i) => ++i);
  const teamList = combination(N, N / 2);
  let minDifference = Infinity;

  for (let i = 0; i < teamList.length; i++) {
    const teamStart = teamList[i];
    const teamLink = employee.filter((num) => !teamStart.includes(num));
    const overallStart = getTeamOverall(teamStart, stats);
    const overallLink = getTeamOverall(teamLink, stats);
    const difference = Math.abs(overallStart - overallLink);

    minDifference = Math.min(minDifference, difference);
  }

  return minDifference;
}

function combination(length, depth) {
  const result = [];
  const stack = [];
  const visited = Array(length + 1).fill(false);

  for (let i = length; i >= 1; i--) {
    stack.push([i]);
  }

  while (stack.length > 0) {
    const sequence = stack.pop();
    const max = Math.max(...sequence);

    for (let i = 1; i <= length; i++) {
      visited[i] = i <= max ? true : false;
    }

    if (depth === sequence.length) {
      result.push(sequence);
    }

    for (let i = length; i >= sequence[0]; i--) {
      const isVisit = visited[i] === true;

      if (!isVisit) {
        stack.push([...sequence, i]);
        visited[i] = true;
      }
    }
  }

  return result;
}

function getTeamOverall(team, stats) {
  let overall = 0;

  for (let i = 0; i < team.length; i++) {
    for (let j = 0; j < team.length; j++) {
      overall += stats[team[i] - 1][team[j] - 1];
    }
  }

  return overall;
}
