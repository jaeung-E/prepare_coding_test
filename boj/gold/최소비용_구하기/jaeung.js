const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const [[N], [_], ...locations] = input.map((str) => str.split(" ").map(Number));
const [from, to] = locations.pop();

function solution() {
  const graph = Array.from({ length: N + 1 }, () => []);
  const distance = Array(N + 1).fill(Infinity);
  const heap = new Heap();

  heap.push([from, 0]);
  distance[from] = 0;

  locations.forEach(([start, end, weight]) => {
    graph[start].push([end, weight]);
  });

  while (heap.size() > 1) {
    const [departure, departureWeight] = heap.poll();

    if (distance[departure] < departureWeight) continue;

    graph[departure].forEach(([arrival, arrivalWeight]) => {
      const nextWeight = departureWeight + arrivalWeight;

      if (nextWeight < distance[arrival]) {
        distance[arrival] = nextWeight;
        heap.push([arrival, nextWeight]);
      }
    });
  }

  return distance[to];
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
