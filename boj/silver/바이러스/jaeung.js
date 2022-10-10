const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");

const [[PCs], [_], ...linkedComputers] = input.map((arr) =>
  arr.split(" ").map(Number)
);

const network = Array.from(Array(PCs + 1), () => Array(PCs + 1).fill(0));
const visited = new Array(PCs + 1).fill(false);
const queue = [];
let count = 0;

queue.push(1);
visited[1] = true;

linkedComputers.forEach(([pcA, pcB]) => {
  network[pcA][pcB] = 1;
  network[pcB][pcA] = 1;
});

while (queue.length > 0) {
  const computer = queue.shift();

  network[computer].forEach((c, index) => {
    const isLinked = c === 1 && !visited[index];

    if (isLinked) {
      queue.push(index);
      visited[index] = true;
      count++;
    }
  });
}

console.log(count);
