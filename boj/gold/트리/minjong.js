const [[N], parentNodes, [removeNode]] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : '../../input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(x => x.split(' ').map(Number));

function solution(N, parentNodes, removeNode) {
  const tree = Array.from({ length: N }, () => []);
  const start = parentNodes.findIndex(x => x === -1);

  if (start === removeNode) return 0;

  parentNodes.forEach((parentNode, i) => {
    if (parentNode !== -1 && parentNode !== removeNode && i !== removeNode) {
      tree[parentNode].push(i);
      tree[i].push(parentNode);
    }
  });

  const visited = Array(N).fill(false);

  return dfs(start, tree, visited);
}

function dfs (start, tree, visited) {
  const stack = [start];
  visited[start] = true;

  let leafCount = 0;

  while (stack.length !== 0) {
    const src = stack.pop();

    if ((src !== start && tree[src].length === 1) || tree[src].length === 0) {
      leafCount += 1;
      continue;
    }

    for (const dst of tree[src]) {
      if (!visited[dst]) {
        visited[dst] = true;
        stack.push(dst);
      }
    }
  }

  return leafCount;
}
console.log(solution(N, parentNodes, removeNode));