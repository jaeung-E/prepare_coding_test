const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const [[N, M, K, X], ...edge] = input.map((str) => str.split(" ").map(Number));

solution();

function solution() {
  console.log(N, M, K, X, ...edge);
}
