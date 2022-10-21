const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

function solution(input) {
  const N = +input[0];
  const visited = Array(N + 1).fill(false);
  const nodes = Array.from(Array(N + 1), () => []);
  const stack = [[1, 0]];
  let moveCount = 0;

  visited[1] = true;

  for (let i = 1; i < N; i++) {
    const line = input[i].split(" ");
    const a = +line[0];
    const b = +line[1];

    nodes[a].push(b);
    nodes[b].push(a);
  }

  loop: while (stack.length > 0) {
    const [peek, depth] = stack[stack.length - 1];
    const isLeafNode = nodes[peek].length === 1;

    for (const node of nodes[peek]) {
      const isVisit = visited[node] === true;

      if (!isVisit) {
        stack.push([node, depth + 1]);
        visited[node] = true;
        continue loop;
      }
    }

    if (isLeafNode) {
      moveCount += depth;
    }

    stack.pop();
  }

  const answer = moveCount % 2 === 0 ? "No" : "Yes";
  console.log(answer);
}

solution(input);
