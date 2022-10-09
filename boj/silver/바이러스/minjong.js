// https://www.acmicpc.net/problem/2606

const [[c], [n], ...lines] = require('fs').readFileSync('../../input.txt', 'utf-8').trim().split('\n').map((x) => x.split(' ').map(Number));

function solution(c, n, lines) {
  let count = 0;
  const graph = Array.from({ length: c + 1 }, () => []);
  const visited = new Array(c + 1).fill(false);

  for (const [src, dst] of lines) {
    graph[src].push(dst);
    graph[dst].push(src);
  }

  const queue = [1];

  while (queue.length !== 0) {
    const src = queue.shift();

    if (!visited[src]) {
      visited[src] = true;
      count += 1;

      for (const dst of graph[src]) {
        if (!visited[dst]) {
          queue.push(dst);
        }
      }
    }
  }

  return count - 1;
}

console.log(solution(c, n, lines));