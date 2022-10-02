const fs = require("fs");
const input = fs
  .readFileSync("dev/stdin")
  .toString()
  .split("\r\n")
  .map((str) => Number(str));

const [N, ...wines] = input;
const memo = [];

memo[0] = wines[0];
memo[1] = wines[0] + wines[1];
memo[2] = Math.max(memo[1], wines[0] + wines[2], wines[1] + wines[2]);

for (let i = 3; i < wines.length; i++) {
  memo[i] = Math.max(
    memo[i - 1],
    memo[i - 2] + wines[i],
    memo[i - 3] + wines[i - 1] + wines[i]
  );
}

console.log(memo[N - 1]);
