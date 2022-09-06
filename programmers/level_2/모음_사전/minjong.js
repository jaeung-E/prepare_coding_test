// https://school.programmers.co.kr/learn/courses/30/lessons/84512

function getPermutations (arr, length) {
  const result = [];
  if (length === 1) return arr.map((v) => v);

  arr.forEach((fixed, _, arr) => { 
    const perms = getPermutations(arr, length - 1);
    const combine = perms.map((v) => [fixed, ...v].join(''));
    result.push(...combine);
  })
  return result
}

function solution(word) {
  const result = [];

  for (let i = 5; i >= 1; i -= 1) {
    result.push(...getPermutations(['A', 'E', 'I', 'O', 'U'], i));
  }

  return result.sort().findIndex((v => v === word)) + 1;
}
