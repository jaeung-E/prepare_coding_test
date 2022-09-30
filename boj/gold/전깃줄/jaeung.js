const [[N], ...wires] = require("fs")
  .readFileSync("dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split(" ").map(Number));
const memo = [];

wires.sort((a, b) => a[0] - b[0]);

for (let i = 0; i < N; i++) {
  const [currentStart, currentEnd] = wires[i];
  let count = 0;

  for (let j = 0; j < i; j++) {
    const [beforeStart, beforeEnd] = wires[j];
    const isWiring = currentEnd > beforeEnd && currentStart > beforeStart;

    if (isWiring) count = Math.max(count, memo[j]);
  }

  memo[i] = count + 1;
}

console.log(N - Math.max(...memo));
