// https://school.programmers.co.kr/learn/courses/30/lessons/12944
// under 5min

function solution(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
}