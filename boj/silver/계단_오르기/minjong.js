// https://www.acmicpc.net/problem/2579
// over 2h

const [N, ...stairs] = require('fs').readFileSync('../../input.txt', 'utf-8').trim().split('\n').map(Number);

function solution(N, stairs) {
  const dp = new Array(N).fill(0);

  dp[0] = stairs[0];
  dp[1] = stairs[0] + stairs[1];
  dp[2] = Math.max(stairs[0], stairs[1]) + stairs[2];

  for (let i = 3; i < N; i += 1) {
    dp[i] = Math.max(dp[i - 3] + stairs[i - 1], dp[i - 2]) + stairs[i];
  }

  return dp[N - 1];
}

console.log(solution(N, stairs));