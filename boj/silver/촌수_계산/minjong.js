const [[n], targets, [m], ...relationships] = require('fs').readFileSync('../../input.txt', 'utf-8').trim().split('\n').map((x) => x.split(' ').map(Number));

function solution(n, targets, m, relationships) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const visited = new Array(n + 1).fill(false);

  for (const [src, dst] of relationships) {
    graph[src].push(dst);
    graph[dst].push(src);
  }

  const queue = [[targets[0], 0]];

  while (queue.length !== 0) {
    const [src, count] = queue.shift();

    if (!visited[src]) {
      visited[src] = true;

      if (src === targets[1]) return count;

      for (const dst of graph[src]) {
        if (!visited[dst]) {
          queue.push([dst, count + 1]);
        }
      }
    }
  }

  return -1;
};

console.log(solution(n, targets, m, relationships));
