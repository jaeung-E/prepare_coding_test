const isLinux = process.platform === 'linux'
const file = isLinux ? '/dev/stdin' : '../../input.txt';
const input = require('fs')
  .readFileSync(file, 'utf-8')
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);

function solution(N, M) {
  const result = [];
  for (i = 1; i <= N; i += 1) {
    result.push(...findSequence(i, M));
  }
  return result.join('\n');
}

function findSequence(start, length) {
  const result = [];
  let visited = new Array(N + 1).fill(false);
  stack = [[start]];
  visited[start] = true;

  dfs: while (stack.length > 0) {
    const sequence = stack.pop();

    for (let i = 1; i <= N; i += 1) {
      if (!sequence.includes(i)) visited[i] = false;
      else visited[i] = true;
    }

    if (sequence.length === length) {
      result.push(sequence.join(' '));
    }

    for (let i = N; i >= 1; i -= 1) {
      if (!visited[i]) {
        visited[i] = true;
        const nextSequence = [...sequence];
        nextSequence.push(i);
        stack.push(nextSequence);
      }
    }
  }
  return result;
}

console.log(solution(N, M));