
// https://www.acmicpc.net/problem/1149
// 40m

const [[N], ...houses] = require('fs').readFileSync('../../input.txt', 'utf-8').trim().split('\n').map(x => x.split(' ').map(Number));

function solution(N, houses) {
  const dp = houses.map(v => [...v])

  for (let i = 1; i < N; i += 1) {
    dp[i][0] += Math.min(dp[i - 1][1], dp[i - 1][2])
    dp[i][1] += Math.min(dp[i - 1][0], dp[i - 1][2])
    dp[i][2] += Math.min(dp[i - 1][0], dp[i - 1][1])
  }

  return Math.min(...dp[N - 1]);
}

console.log(solution(N, houses));