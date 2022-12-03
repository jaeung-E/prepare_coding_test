const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const [N, M, K, X] = input[0].split(" ").map(Number);

console.log(solution());

function solution() {
  const graph = {};

  for (let i = 1; i <= M; i++) {
    const [from, to] = input[i].split(" ");

    if (!graph[from]) graph[from] = [];

    graph[+from].push([+to, 1]);
  }

  const answer = dijkstra(X, graph);

  return answer !== "" ? answer : -1;
}

function dijkstra(startNode, graph) {
  const distance = Array(N + 1).fill(Infinity);
  const visited = Array(N + 1).fill(false);
  let result = "";

  graph[startNode].forEach(([node, weight]) => {
    distance[node] = weight;
  });

  visited[startNode] = true;

  while (true) {
    const nextIndex = getMinIndex(distance, visited, graph);
    const arr = graph[nextIndex];

    visited[nextIndex] = true;

    if (nextIndex === 0) break;

    for (let i = 0; i < arr.length; i++) {
      const [node, weight] = arr[i];
      const nextWeight = distance[nextIndex] + weight;
      const isVisit = visited[node];

      if (nextWeight < distance[node] && !isVisit) distance[node] = nextWeight;
    }
  }

  distance.forEach((value, index) => {
    if (value === K) result += `${index}\n`;
  });

  return result;
}

function getMinIndex(distance, visited, graph) {
  let min = Infinity;
  let index = 0;

  for (let i = 1; i <= N; i++) {
    if (distance[i] < min && !visited[i] && graph[i]) {
      min = distance[i];
      index = i;
    }
  }

  return index;
}
