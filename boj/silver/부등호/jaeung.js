const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const N = +input[0];
const inequalities = input[1].split(" ");

console.log(solution(N, inequalities));

function solution(N, inequalities) {
  const RANGE = 9;
  const [max, min] = getSequence(RANGE, inequalities, N + 1);

  return `${max}\n${min}`;
}

function getSequence(range, inequalities, depth) {
  const stack = [];
  let maxSequence = -Infinity;
  let minSequence = Infinity;

  for (let i = range; i >= 0; i--) {
    stack.push([i]);
  }

  while (stack.length > 0) {
    const sequence = stack.pop();
    const length = sequence.length;
    const visited = Array(range + 1).fill(false);

    for (let i = 0; i < length; i++) {
      visited[sequence[i]] = true;
    }

    if (length === depth) {
      const value = sequence.join("");

      maxSequence = Math.max(maxSequence, value);
      minSequence = Math.min(minSequence, value);
    }

    if (inequalities[length - 1] === "<") {
      for (let i = sequence[length - 1] + 1; i <= range; i++) {
        if (!visited[i]) stack.push([...sequence, i]);
      }
    }

    if (inequalities[length - 1] === ">") {
      for (let i = 0; i < sequence[length - 1]; i++) {
        if (!visited[i]) stack.push([...sequence, i]);
      }
    }
  }

  return [`${maxSequence}`, String(minSequence).padStart(depth, "0")];
}
