// 16532 KB / 248 ms
const [[N, M, X], ...roads] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : '../../input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(x => x.split(' ').map(Number))

const solution = (N, M, X, roads) => {
  let result = -Infinity
  const roadsToX = Array.from({ length: N + 1 }, () => [])
  const roadsToHome = Array.from({ length: N + 1 }, () => [])

  for (const [src, dst, cost] of roads) {
    roadsToX[src].push({ dst, cost })
    roadsToHome[dst].push({ dst: src, cost })
  }

  const distanceToX = dijkstra(X, roadsToX)
  const distanceToHome = dijkstra(X, roadsToHome)

  for (let i = 1; i <= N; i++) {
    result = Math.max(result, distanceToX[i] + distanceToHome[i])
  }

  return result
}


const dijkstra = (start, graph) => {
  const distance = Array(N + 1).fill(Infinity)
  const heap = new MinHeap();

  distance[start] = 0;
  heap.push({ node: start, cost: 0 })

  while (!heap.isEmpty()) {
    const { node: currentNode, cost: currentCost } = heap.pop()
    for (const { dst, cost } of graph[currentNode]) {
      const nextCost = currentCost + cost
      if (nextCost < distance[dst]) {
        distance[dst] = nextCost
        heap.push({ node: dst, cost: nextCost })
      }
    }
  }

  return distance
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
      [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]]

      currentIndex = parentIndex
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

console.log(solution(N, M, X, roads))