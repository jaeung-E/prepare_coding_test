// https://www.acmicpc.net/problem/2156
// 2h

const [n, ...wines] = require('fs').readFileSync('../../input.txt', 'utf-8').trim().split('\n').map(Number);

function solution(n, wines) {
  const dp = new Array(n).fill(0);

  dp[0] = wines[0]
  dp[1] = wines[0] + wines[1];
  dp[2] = Math.max(wines[0] + wines[1], wines[1] + wines[2], wines[0] + wines[2]);

  for (let i = 3; i < n; i += 1) {
    dp[i] = Math.max(dp[i - 3] + wines[i - 1], dp[i - 2]) + wines[i];
    dp[i] = Math.max(dp[i], dp[i - 1]);
  }

  return dp[n - 1];
}

console.log(solution(n, wines))