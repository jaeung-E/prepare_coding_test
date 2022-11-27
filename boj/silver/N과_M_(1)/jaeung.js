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

  for (let i = length; i >= 1; i--) {
    stack.push([i]);
  }

  while (stack.length > 0) {
    const sequence = stack.pop();
    const visited = Array(N + 1).fill(false);

    for (let i = 0; i <= sequence.length; i++) {
      visited[sequence[i]] = true;
    }

    if (sequence.length === depth) {
      result.push(sequence);
    }

    for (let i = length; i >= 1; i--) {
      const isVisit = visited[i] === true;

      if (!isVisit) {
        stack.push([...sequence, i]);
      }
    }
  }

  return result;
}
