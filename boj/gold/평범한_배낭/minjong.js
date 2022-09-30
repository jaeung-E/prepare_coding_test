// https://www.acmicpc.net/problem/12865
// over 2h
// 다른 사람들의 풀이를 참고. https://gywlsp.github.io/boj/12865/

const [[N, K], ...wv] = require('fs').readFileSync('../../input.txt', 'utf-8').trim().split('\n').map(x => x.split(' ').map(Number));

function solution(N, K, wv) {
  const dp = Array.from({ length: N + 1 }, () => new Array(K + 1).fill(0));

  for (let i = 1; i <= N; i += 1) {
    const [w, v] = wv[i - 1];
    for (let j = 0; j <= K; j += 1) {
      if (j < w) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + v);
      }
    }
  }

  return dp[N][K];
}

console.log(solution(N, K, wv));