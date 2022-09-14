function solution(nums) {
  const pokeTypes = [...new Set(nums)];
  return pokeTypes.length < nums.length / 2 ? pokeTypes.length : nums.length / 2
}