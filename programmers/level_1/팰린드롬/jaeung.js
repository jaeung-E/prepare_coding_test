function solution(n, m) {
  let answer = 0;

  for (let i = n; i <= m; i++) {
    const str = String(i);
    const reverse = str.split("").reverse().join("");

    str === reverse && answer++;
  }

  return answer;
}
