const fs = require("fs");
const input = fs
  .readFileSync("dev/stdin")
  .toString()
  .split("\r\n")
  .map((str) => str.split(" ").map(Number));

const [N, maxWeight] = input.shift();
const knapsacks = [...input];
const memo = Array.from(Array(N + 1), () => Array(maxWeight + 1).fill(0));

for (let i = 1; i <= N; i++) {
  const [weight, value] = knapsacks[i - 1];

  for (let j = 1; j <= maxWeight; j++) {
    if (weight <= j) {
      memo[i][j] = Math.max(value + memo[i - 1][j - weight], memo[i - 1][j]);
    } else {
      memo[i][j] = memo[i - 1][j];
    }
  }
}

console.log(memo[N][maxWeight]);
