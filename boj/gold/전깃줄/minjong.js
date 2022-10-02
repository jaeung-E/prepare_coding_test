// https://www.acmicpc.net/problem/2565
// over 2h
// 다른 사람의 풀이를 참고. https://dailymapins.tistory.com/m/239

const [[n], ...lines] = require('fs').readFileSync('../../input.txt', 'utf-8').trim().split('\n').map(x => x.split(' ').map(Number));

function solution(n, lines) {
  const dp = new Array(n).fill(1);

  lines.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < n; i += 1) {
    let count = 0;
    for (let j = 0; j < i; j += 1) {
      if (lines[i][1] > lines[j][1]) count = Math.max(count, dp[j]);
    }
    dp[i] = count + 1;
  }

  return n - Math.max(...dp);
}

console.log(solution(n, lines))