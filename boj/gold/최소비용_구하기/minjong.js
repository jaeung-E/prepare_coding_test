// 80168 KB / 524 ms
const [[N], [M], ...buses] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : '../../input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(x => x.split(' ').map(Number))

const [start, end] = buses.pop()

const solution = (N, M, buses, start, end) => {
  const graph = Array.from({ length: N + 1 }, () => []);
  for (const [src, dst, cost] of buses) {
    graph[src].push({ dst, cost });
  }

  const heap = new MinHeap()
  const distance = Array.from({ length: N + 1 }, () => Infinity)

  heap.push({ node: start, cost: 0 })
  distance[start] = 0

  while (!heap.isEmpty()) {
    const { node: currentNode, cost: currentCost } = heap.pop()
    if (distance[currentNode] < currentCost) continue

    for (const { dst, cost } of graph[currentNode]) {
      const nextCost = currentCost + cost
      if (nextCost < distance[dst]) {
        distance[dst] = nextCost
        heap.push({ node: dst, cost: nextCost })
      }
    }
  }
  return distance[end]
}

class MinHeap {
  constructor() {
    this.heap = [null]
  }

  push(value) {
    this.heap.push(value)
    let currentIndex = this.heap.length - 1
    let parentIndex = Math.floor(currentIndex / 2)

    while (parentIndex !== 0 && this.heap[parentIndex].cost > value.cost) {
      const temp = this.heap[parentIndex]
      this.heap[parentIndex] = value
      this.heap[currentIndex] = temp

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2)
    }
  }

  pop() {
    if (this.heap.length === 2) return this.heap.pop()
    const returnValue = this.heap[1]
    this.heap[1] = this.heap.pop()

    let currentIndex = 1
    let leftIndex = 2
    let rightIndex = 3

    while (
      (this.heap[leftIndex] && this.heap[currentIndex].cost > this.heap[leftIndex].cost) ||
      (this.heap[rightIndex] && this.heap[currentIndex].cost > this.heap[rightIndex].cost)
    ) {
      if (this.heap[leftIndex] === undefined) {
        [this.heap[rightIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[rightIndex]]
      } else if (this.heap[rightIndex] === undefined) {
        [this.heap[leftIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[leftIndex]]
      } else if (this.heap[leftIndex].cost > this.heap[rightIndex].cost) {
        [this.heap[rightIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[rightIndex]]
      } else if (this.heap[leftIndex].cost <= this.heap[rightIndex].cost) {
        [this.heap[leftIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[leftIndex]]
      }
      leftIndex = currentIndex * 2
      rightIndex = currentIndex * 2 + 1
    }
    return returnValue
  }

  isEmpty() {
    return (this.heap.length === 1)
  }
}

console.log(solution(N, M, buses, start, end))