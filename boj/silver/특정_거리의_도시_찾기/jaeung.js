const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const [[N, _, K, X], ...edge] = input.map((str) => str.split(" ").map(Number));

console.log(solution());

function solution() {
  const graph = Array.from({ length: N + 1 }, (_, i) =>
    Array(N + 1).fill(Infinity)
  );

  for (let i = 1; i <= N; i++) {
    graph[i][i] = 0;
  }

  edge.forEach(([from, to]) => {
    graph[from][to] = 1;
  });

  const answer = dijkstra(X, graph);

  return answer !== "" ? answer : -1;
}

function dijkstra(startNode, graph) {
  const distance = [...graph[startNode]];
  const visited = Array(N + 1).fill(false);
  let result = "";

  visited[startNode] = true;

  while (true) {
    const nextIndex = getMinIndex(distance, visited);
    visited[nextIndex] = true;

    if (nextIndex === 0) break;

    for (let i = 1; i <= N; i++) {
      const nextWeight = distance[nextIndex] + graph[nextIndex][i];
      const isVisit = visited[i];

      if (nextWeight < distance[i] && !isVisit) distance[i] = nextWeight;
    }
  }

  distance.forEach((value, index) => {
    if (value === K) result += `${index}\n`;
  });

  return result;
}

function getMinIndex(distance, visited) {
  let min = Infinity;
  let index = 0;

  for (let i = 1; i <= N; i++) {
    if (distance[i] < min && !visited[i]) {
      min = distance[i];
      index = i;
    }
  }

  return index;
}
