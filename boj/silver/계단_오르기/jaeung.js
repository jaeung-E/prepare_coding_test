const fs = require("fs");
const input = fs
  .readFileSync("dev/stdin")
  .toString()
  .split("\r\n")
  .map((string) => Number(string));

const [line, ...stairs] = input;
const memo = [];

memo[0] = stairs[0];
memo[1] = stairs[0] + stairs[1];
memo[2] = Math.max(stairs[0], stairs[1]) + stairs[2];

for (let i = 3; i < line; i++) {
  const maxSum = Math.max(memo[i - 2], memo[i - 3] + stairs[i - 1]) + stairs[i];
  memo[i] = maxSum;
}

console.log(memo[line - 1]);
