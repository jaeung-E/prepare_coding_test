const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const [[N], ...links] = input.map((str) => str.split(" ").map(Number));

function solution(N, links) {
  let str = "";
  const answer = [];
  const stack = [1];
  const visited = Array(N + 1).fill(false);
  const nodes = Array.from(Array(N + 1), () => []);

  visited[1] = true;

  links.forEach(([a, b]) => {
    nodes[a].push(b);
    nodes[b].push(a);
  });

  loop: while (stack.length > 0) {
    const peek = stack[stack.length - 1];

    for (const node of nodes[peek]) {
      const isVisit = visited[node] === true;

      if (!isVisit) {
        visited[node] = true;
        stack.push(node);
        continue loop;
      }
    }

    stack.pop();
    answer[peek] = stack[stack.length - 1];
  }

  answer.slice(2).forEach((node) => (str += node + "\n"));
  console.log(str);
}

solution(N, links);
