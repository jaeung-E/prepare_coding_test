function solution(nums) {
  const maxChoice = nums.length / 2;
  const pokemonList = nums
    .sort((a, b) => a - b)
    .filter((num, idx) => num !== nums[idx + 1]).length;

  return pokemonList > maxChoice ? maxChoice : pokemonList;
}
