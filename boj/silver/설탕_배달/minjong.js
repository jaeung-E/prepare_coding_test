// https://www.acmicpc.net/problem/2839
// 1h 50m

const input = Number(`4`.trim());

function solution(N) {
  const dp = new Array(N + 1).fill(Infinity);

  dp[3] = 1;
  dp[5] = 1;

  for (let i = 6; i <= N; i += 1) {
    dp[i] = Math.min(dp[i - 3], dp[i - 5]) + 1;
  }

  return dp[N] === Infinity ? -1 : dp[N];
}

console.log(solution(input));


// 규칙을 찾기전 풀이
// function solution(N) {
//   let answer = Infinity;

//   const threes = {
//     3: 1
//   }

//   const fives = {
//     5: 1
//   }

//   for (let i = 6; i <= N; i += 1) {
//     if (i % 3 === 0) {
//       threes[i] = i / 3;
//     }
//     if (i % 5 === 0) {
//       fives[i] = i / 5;
//     }
//   }

//   if (threes[N]) answer = Math.min(threes[N], answer);
//   if (fives[N]) answer = Math.min(fives[N], answer);

//   for (const f of Object.keys(fives)) {
//     for (const t of Object.keys(threes)) {
//       if (f === t) continue;
//       if (Number(f) + Number(t) === N) {
//         answer = Math.min(fives[f] + threes[t], answer);
//       }
//     }
//   }

//   return answer === Infinity ? -1 : answer;
// }

// console.log(solution(input));