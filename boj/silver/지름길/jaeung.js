const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const [[N, D], ...edge] = input.map((str) => str.split(" ").map(Number));

console.log(solution());

function solution() {
  const graph = Array.from({ length: D + 1 }, () => []);

  for (let i = 0; i < N; i++) {
    const [from, to, weight] = edge[i];

    if (to > D) continue;
    if (to - from <= weight) continue;

    graph[from].push([to, weight]);
  }

  return getMinDistance(graph);
}

function getMinDistance(graph) {
  const distance = Array(D + 1).fill(Infinity);

  distance[0] = 0;

  for (let i = 0; i <= D; i++) {
    const prevDistance = distance[i - 1];

    if (i > 0) distance[i] = Math.min(distance[i], prevDistance + 1);

    graph[i].forEach(([nextDistance, weight]) => {
      if (distance[nextDistance] > distance[i] + weight)
        distance[nextDistance] = distance[i] + weight;
    });
  }

  return distance[D];
}
