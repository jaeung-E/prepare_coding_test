// https://school.programmers.co.kr/learn/courses/30/lessons/12977
// 10min

function getCombinations(arr, length) {
  if (length === 1) return arr.map(v => [v]);
  
  const result = [];
  arr.forEach((fixed, index, arr) => {
      const rest = arr.slice(index + 1);
      const combination = getCombinations(rest, length - 1);
      const combine = combination.map(value => [fixed, ...value])
      result.push(...combine);
  })
  return result;
}

function solution(nums) {
  const combinations = getCombinations(nums, 3);
  const primeNumbers = combinations.map(v => v.reduce((acc, cur) => acc + cur, 0));
  
  return primeNumbers.filter((number) => {
      if (number === 1) return false;
      for (let i = 2; i < number / 2; i += 1) {
          if (number % i === 0) return false;
      }
      return true
  }).length;
}