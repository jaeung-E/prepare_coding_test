const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().split("\r\n");

const [[line], ...houses] = input.map((str) => str.split(" ").map(Number));

for (let i = 1; i < line; i++) {
  houses[i][0] += Math.min(houses[i - 1][1], houses[i - 1][2]);
  houses[i][1] += Math.min(houses[i - 1][0], houses[i - 1][2]);
  houses[i][2] += Math.min(houses[i - 1][0], houses[i - 1][1]);
}

console.log(Math.min(...houses[line - 1]));
