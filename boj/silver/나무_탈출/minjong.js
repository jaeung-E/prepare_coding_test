// 시간 초과

const [N, ...edge] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : '../../input.txt', 'utf-8')
  .trim()
  .split('\n')
  // .map(x => x.split(' ').map(Number));


function solution(N, edge) {
  const tree = Array.from({ length: N + 1 }, () => []);

  edge.forEach((x) => {
    const [src, dst] = x.split(' ').map(Number);
    tree[src].push(dst);
    tree[dst].push(src);
  });

  const visited = Array(N + 1).fill(false)
  // const distance = Array(N + 1).fill(0);

  return dfs(1, tree, visited);
}

function dfs (src, tree, visited) {
  const stack = [[src, 0]];
  let leafDist = 0;
  visited[src] = true;

  while (stack.length !== 0) {
    const [src, dist] = stack.pop();

    for (const dst of tree[src]) {
      if (!visited[dst]) {
        visited[dst] = true;
        if (tree[dst].length === 1) leafDist += dist + 1;
        stack.push([dst, dist + 1]);
      }
    }
  }
  // return (leafDist.reduce((acc, cur) => acc + cur) % 2 == 0 ? 'No' : 'Yes');
  return leafDist % 2 === 0 ? 'No' : 'Yes';
}

// console.log(+N, edge);

console.log(solution(N, edge));