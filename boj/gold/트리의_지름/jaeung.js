const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const [[N], ...links] = input.map((str) => str.split(" ").map(Number));

solution(N, links);

function solution(N, links) {
  const tree = Array.from(Array(N + 1), () => []);

  links.forEach(([nodeA, nodeB, distance]) => {
    tree[nodeA].push([nodeB, distance]);
    tree[nodeB].push([nodeA, distance]);
  });

  const startNode = searchFarNode(1, tree);
  const endNode = searchFarNode(startNode[0], tree);

  console.log(endNode[1]);
}

function searchFarNode(rootNode, tree) {
  const visited = Array(N + 1).fill(false);
  const stack = [[rootNode, 0]];
  let distance = 0;
  let farNode = [0, 0];

  visited[rootNode] = true;

  loop: while (stack.length > 0) {
    const [node, weight] = stack[stack.length - 1];

    for (const [childNode, childWeight] of tree[node]) {
      const isVisit = visited[childNode] === true;

      if (!isVisit) {
        stack.push([childNode, childWeight]);
        visited[childNode] = true;
        distance += childWeight;
        continue loop;
      }
    }

    if (distance > farNode[1]) {
      farNode = [node, distance];
    }

    stack.pop();
    distance -= weight;
  }

  return farNode;
}
