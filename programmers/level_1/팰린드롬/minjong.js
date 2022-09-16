// 문제 URL 없음.
// 10min

function solution(n, m) {
  let answer = 0;
  outer: for (const number of Array.from({length: m - n + 1}, (_, i) => String(i + n))) {
    if (number.length === 1) {
      answer += 1;
    } else {
      for (let i = 0; i < number.length / 2; i += 1) {
        if (number[i] !== number[number.length - i - 1]) continue outer;
      }
      answer += 1;
    }
  }
  return answer;
}



console.log(solution(100, 300));