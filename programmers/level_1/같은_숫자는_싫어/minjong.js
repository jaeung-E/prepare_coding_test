// https://school.programmers.co.kr/learn/courses/30/lessons/12906

function solution(arr) {
  const result = [];

  arr.forEach(value => {
    if (value !== result[result.length - 1]) result.push(value)
  });
  return result;
}