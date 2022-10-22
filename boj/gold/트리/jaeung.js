const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const [[N], links, [deleteNum]] = input.map((str) =>
  str.split(" ").map(Number)
);

console.log(solution(N, links, deleteNum));

function solution(N, links, deleteNum) {
  const visited = Array(N).fill(false);
  const tree = Array.from(Array(N), () => []);
  const rootNode = links.indexOf(-1);
  const stack = [rootNode];
  let countLeafNode = 0;

  if (rootNode === deleteNum) return 0;

  visited[rootNode] = true;

  for (let i = 0; i < N; i++) {
    const node = links[i];
    const isRoot = node === -1;
    const isDeleteNode = node === deleteNum || i === deleteNum;

    if (isRoot || isDeleteNode) continue;

    tree[i].push(node);
    tree[node].push(i);
  }

  loop: while (stack.length > 0) {
    const peek = stack[stack.length - 1];
    const isLeafNode =
      (tree[peek].length === 1 && peek !== rootNode) || tree[peek].length === 0;

    for (const node of tree[peek]) {
      const isVisit = visited[node] === true;

      if (!isVisit) {
        stack.push(node);
        visited[node] = true;
        continue loop;
      }
    }

    if (isLeafNode) countLeafNode++;

    stack.pop();
  }

  return countLeafNode;
}
