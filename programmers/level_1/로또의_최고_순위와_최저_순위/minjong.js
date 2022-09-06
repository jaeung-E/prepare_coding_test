function solution(lottos, win_nums) {
  const score = {6: 1, 5: 2, 4: 3, 3: 4, 2: 5, 1: 6}
  
  const zeroCount = lottos.filter(lotto => lotto === 0).length;
  const matchCount = lottos.filter(lotto => win_nums.includes(lotto)).length;
  
  const min = matchCount;
  const max = matchCount + zeroCount;
  
  return [max === 0 ? 6 : score[max], min === 0 ? 6 : score[min]]
}