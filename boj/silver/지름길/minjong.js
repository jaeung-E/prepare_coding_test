const isLinux = process.platform === 'linux'
const file = isLinux ? '/dev/stdin' : '../../input.txt';
const input = require('fs')
  .readFileSync(file, 'utf-8')
  .trim()
  .split('\n');


const solution = (input) => {
  const [N, D] = input[0].split(' ').map(Number);
  
  const graph = Array.from({ length: D + 1}, () => []);
  for (let i = 1; i < input.length; i += 1){
    const [a, b, c] = input[i].split(' ').map(Number);
    if (D < b) continue;
    if (b - a <= c) continue;
    graph[a].push([b, c]);
  }

  const distance = Array.from({length: D + 1}, () => Infinity);
  const heap = new MinHeap();

  distance[0] = 0;

  for (let i = 0; i <= D; i += 1) {
    if (i > 0) distance[i] = Math.min(distance[i], distance[i - 1] + 1);

    heap.push([i, distance[i]]);
    while (!heap.isEmpty()) {
      const [src, _] = heap.pop();

      for (const [dst, nextDistance] of graph[src]) {
        if (distance[dst] > distance[src] + nextDistance) {
          distance[dst] = distance[src] + nextDistance;
          heap.push([dst, distance[dst]]);
        }
      }
    }
  }

  return distance[D];
}


class MinHeap {
  constructor() {
      this.heap = [[null, null]];
  }

  push(value) {
      this.heap.push(value);
      let currentIndex = this.heap.length - 1;
      let parentIndex = Math.floor(currentIndex / 2);

      while (parentIndex !== 0 && this.heap[parentIndex][1] > value[1]) {
          const temp = this.heap[parentIndex];
          this.heap[parentIndex] = value;
          this.heap[currentIndex] = temp;

          currentIndex = parentIndex;
          parentIndex = Math.floor(currentIndex / 2);
      }
  }

  pop() {
      const returnValue = this.heap[1];
      this.heap[1] = this.heap.pop();

      let currentIndex  = 1;
      let leftIndex = 2;
      let rightIndex = 3;
      
      while ((this.heap[leftIndex] && this.heap[rightIndex]) && (
            this.heap[currentIndex][1] > this.heap[leftIndex][1] || 
            this.heap[currentIndex][1] > this.heap[rightIndex][1])) {
          if (this.heap[leftIndex][1] > this.heap[rightIndex][1]) {
              const temp = this.heap[currentIndex];
              this.heap[currentIndex] = this.heap[rightIndex];
              this.heap[rightIndex] = temp;
              currentIndex = rightIndex;
          } else {
              const temp = this.heap[currentIndex];
              this.heap[currentIndex] = this.heap[leftIndex];
              this.heap[leftIndex] = temp;
              currentIndex = leftIndex;
          }
          leftIndex = currentIndex * 2;
          rightIndex = currentIndex * 2 + 1;
      }
      return returnValue;
  }

  isEmpty () {
    return this.heap.length === 2;
  }
}

console.log(solution(input));