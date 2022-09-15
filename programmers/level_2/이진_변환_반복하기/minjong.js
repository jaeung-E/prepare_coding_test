// https://school.programmers.co.kr/learn/courses/30/lessons/70129
// 10min

function solution(s) {
  const answer = [0, 0];
  let x = s;

  while (x !== '1') {
    const originLength = x.length;
    x = x.replace(/0/g, '');
    answer[1] += originLength - x.length;
    x = x.length.toString(2);
    answer[0] += 1;
  }

  return answer;
}