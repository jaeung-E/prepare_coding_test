const [[N], ...edge] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : '../../input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(x => x.split(' ').map(Number));


function solution(N, edge) {
  const tree = Array.from({length: N + 1}, () => []);
  
  edge.forEach(([src, dst]) => {
    tree[src].push(dst);
    tree[dst].push(src);
  });

  const visited = Array(N + 1).fill(false)
  const parents = Array(N + 1);

  return dfs(1, tree, visited, parents);
}

function dfs(src, tree, visited, parents) {
  const stack = [src];

  while (stack.length !== 0) {
    const src = stack.pop();
    for (let dst of tree[src]) {
      if (!visited[dst]) {
        visited[dst] = true;
        parents[dst] = src;
        stack.push(dst);
      }
    }
  }

  return parents.slice(2).join('\n');
}

console.log(solution(N, edge));
