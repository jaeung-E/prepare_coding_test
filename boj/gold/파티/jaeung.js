const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const [[N, M, X], ...routes] = input.map((str) => str.split(" ").map(Number));

function solution() {
  const graph = Array.from({ length: N + 1 }, () => []);
  const reverseGraph = Array.from({ length: N + 1 }, () => []);
  let result = -Infinity;

  routes.forEach(([from, to, weight]) => {
    graph[from].push([to, weight]);
    reverseGraph[to].push([from, weight]);
  });

  const distanceToCity = dijkstra(X, graph);
  const distanceToArrival = dijkstra(X, reverseGraph);

  for (let i = 1; i <= N; i++) {
    result = Math.max(result, distanceToCity[i] + distanceToArrival[i]);
  }

  return result;
}

function dijkstra(start, graph) {
  const distance = Array(N + 1).fill(Infinity);
  const heap = new Heap();

  distance[start] = 0;
  heap.push([start, 0]);

  while (heap.size() > 1) {
    const [departure, departureWeight] = heap.poll();

    graph[departure].forEach(([arrival, arrivalWeight]) => {
      const nextWeight = departureWeight + arrivalWeight;

      if (distance[arrival] > nextWeight) {
        distance[arrival] = nextWeight;
        heap.push([arrival, distance[arrival]]);
      }
    });
  }

  return distance;
}

class Heap {
  constructor() {
    this.heap = [null];
  }

  push(node) {
    this.heap.push(node);
    let index = this.heap.length - 1;

    while (this.getParent(index) && this.getParent(index)[1] > node[1]) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }

  poll() {
    if (!this.heap.length) return null;

    let index = 1;
    this.swap(index, this.heap.length - 1);
    const value = this.heap.pop();

    while (
      this.getLeftChild(index) !== undefined &&
      (this.getLeftChild(index) < this.heap[index] ||
        this.getRightChild(index) < this.heap[index])
    ) {
      let smallerIndex = index * 2;

      if (
        this.getRightChild(index) !== undefined &&
        this.getRightChild(index) < this.heap[smallerIndex]
      ) {
        smallerIndex = index * 2 + 1;
      }

      this.swap(index, smallerIndex);
      index = smallerIndex;
    }

    return value;
  }

  swap(indexA, indexB) {
    [this.heap[indexA], this.heap[indexB]] = [
      this.heap[indexB],
      this.heap[indexA],
    ];
  }

  getParent(nodeIndex) {
    return this.heap[this.getParentIndex(nodeIndex)];
  }

  getParentIndex(nodeIndex) {
    return Math.floor(nodeIndex / 2);
  }

  getLeftChild(nodeIndex) {
    return this.heap[nodeIndex * 2];
  }

  getRightChild(nodeIndex) {
    return this.heap[nodeIndex * 2 + 1];
  }

  size() {
    return this.heap.length;
  }
}

console.log(solution());
