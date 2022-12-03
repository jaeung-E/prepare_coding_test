const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const [N, M, K, X] = input[0].split(" ").map(Number);
class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.storage = [];
  }

  size() {
    return this.rear - this.front;
  }

  enqueue(value) {
    this.storage[this.rear++] = value;
  }

  dequeue() {
    const value = this.storage[this.front];
    delete this.storage[this.front];

    if (this.size() > 0) this.front++;

    return value;
  }

  display() {
    console.log([...this.storage]);
  }
}

console.log(solution());

function solution() {
  const graph = {};

  for (let i = 1; i <= M; i++) {
    const [from, to] = input[i].split(" ");

    if (!graph[from]) graph[from] = [];

    graph[+from].push(+to);
  }

  const answer = getDistance(X, graph);

  return answer === "" ? -1 : answer;
}

function getDistance(startNode, graph) {
  let result = "";
  const distance = Array(N + 1).fill(Infinity);
  const queue = new Queue();
  queue.enqueue(startNode);

  distance[startNode] = 0;

  while (queue.size() > 0) {
    const node = queue.dequeue();
    if (!graph[node]) continue;

    graph[node].forEach((nextNode) => {
      if (distance[nextNode] === Infinity) {
        distance[nextNode] = distance[node] + 1;
        queue.enqueue(nextNode);
      }
    });
  }

  distance.forEach((value, index) => {
    if (value === K) result += `${index}\n`;
  });

  return result;
}
