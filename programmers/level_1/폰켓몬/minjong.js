// https://school.programmers.co.kr/learn/courses/30/lessons/1845
// under 5min

function solution(nums) {
  const pokeTypes = [...new Set(nums)];
  return pokeTypes.length < nums.length / 2 ? pokeTypes.length : nums.length / 2
}