const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString();

let totalSugar = input;
let sugarBag = 0;

while (totalSugar > 0) {
  if (totalSugar % 5 === 0) {
    sugarBag += totalSugar / 5;
    totalSugar = 0;
    break;
  }

  totalSugar -= 3;
  sugarBag++;
}

const answer = totalSugar !== 0 ? -1 : sugarBag;

console.log(answer);
