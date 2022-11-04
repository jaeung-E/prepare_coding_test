const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split(" ");
const [N, M] = input.map(Number);

console.log(solution(N, M));

function solution(N, M) {
  const result = permutation(N, M).reduce(
    (str, sequence) => (str += `${sequence.join(" ")}\n`),
    ""
  );

  return result;
}

function permutation(length, depth) {
  const result = [];
  const stack = [];
  const visited = Array(N + 1).fill(false);

  for (let i = length; i >= 1; i--) {
    stack.push([i]);
  }

  while (stack.length > 0) {
    const sequence = stack.pop();

    for (let i = 1; i <= length; i++) {
      const isVisit = sequence.includes(i) === true;
      visited[i] = isVisit ? true : false;
    }

    if (sequence.length === depth) {
      result.push(sequence);
    }

    for (let i = length; i >= 1; i--) {
      const isVisit = visited[i] === true;

      if (!isVisit) {
        stack.push([...sequence, i]);
        visited[i] = true;
      }
    }
  }

  return result;
}
