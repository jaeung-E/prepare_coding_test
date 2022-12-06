const isLinux = process.platform === 'linux';
const file = isLinux ? '/dev/stdin' : '../../input.txt';
const input = require('fs')
  .readFileSync(file, 'utf-8')
  .trim()
  .split('\n');

const solution = (input) => {
  const firstData = input[0].split(' ');
  const N = Number(firstData[0]);
  const M = Number(firstData[1]);
  const K = Number(firstData[2]);
  const X = Number(firstData[3]);

  const answer = [];
  const graph = Array.from({length: N + 1}, () => []);
  for (let i = 1; i < input.length; i += 1) {
    const [src, dst] = input[i].split(' ')
    graph[+src].push(+dst);
  }

  const distance = new Array(N + 1).fill(0);
  const visited = new Array(N + 1).fill(false);

  const queue = new Queue();
  queue.enqueue(X);
  visited[X] = true;

  while (!queue.isEmpty()) {
    const src = queue.dequeue();

    for (const dst of graph[src]) {
      if (visited[dst]) continue;
      visited[dst] = true;
      distance[dst] = distance[src] + 1;
      queue.enqueue(dst);
      if (distance[dst] === K) answer.push(dst);
    }
  }

  if (answer.length === 0) return -1;
  return answer.sort((a, b) => a - b).join('\n');
}


class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.queue[this.rear++] = value;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front++];
    return value;
  }

  peek() {
    return this.queue[this.front];
  }

  isEmpty() {
    return this.front === this.rear;
  }

}

console.log(solution(input));