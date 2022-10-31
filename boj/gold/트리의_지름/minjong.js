const isLinux = process.platform === 'linux'
const input = require('fs')
  .readFileSync(isLinux ? '/dev/stdin' : '../../input.txt', 'utf-8')
  .trim()
  .split('\n');

function solution(input) {
  const n = Number(input[0]);
  const tree = Array.from({ length: n + 1 }, () => []);
  input.slice(1).forEach((v) => {
    const [parentNode, childNode, weight] = v.split(' ').map(Number);
    tree[parentNode].push([childNode, weight]);
    tree[childNode].push([parentNode, weight]);
  });

  return dfs(dfs(1, tree).maxValue, tree).maxDistance;
}

function dfs(start, tree) {
  const visited = new Array(tree.length).fill(false);
  visited[start] = true;
  const stack = [[start, 0]];
  let maxValue = 0;
  let maxDistance = 0;
  while (stack.length !== 0) {
    const [node, distance] = stack.pop();

    if (maxDistance < distance) {
      maxValue = node;
      maxDistance = distance;
    }

    for (const [childNode, weight] of tree[node]) {
      if (!visited[childNode]) {
        visited[childNode] = true;
        stack.push([childNode, distance + weight]);
      }
    }
  }
  return { maxValue, maxDistance };
}

console.log(solution(input));