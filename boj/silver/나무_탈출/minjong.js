// 시간 초과

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : '../../input.txt', 'utf-8')
  .trim()
  .split('\n');


function solution(input) {
  const N = +input[0];
  const tree = Array.from({ length: N + 1 }, () => []);

  for (let i = 1; i< N; i += 1) {
    const [src, dst] = input[i].split(' ');
    tree[+src].push(+dst);
    tree[+dst].push(+src);
  };

  const visited = Array(N + 1).fill(false)

  return dfs(1, tree, visited);
}

function dfs(start, tree, visited) {
  const stack = [[start, 0]];
  visited[start] = true;
  
  let leafDist = 0;

  while (stack.length !== 0) {
    const [src, dist] = stack.pop();

    if (src !== start && tree[src].length === 1) {
      leafDist += dist;
      continue;
    }

    for (const dst of tree[src]) {
      if (!visited[dst]) {
        visited[dst] = true;
        stack.push([dst, dist + 1]);
      }
    }
  }
  return leafDist % 2 === 0 ? 'No' : 'Yes';
}

console.log(solution(input));