function solution(lottos, win_nums) {
  let count = 0;
  const zeros = lottos.filter((num) => num === 0).length;
  const rank = 7;

  lottos = lottos.filter((number) => number > 0);
  lottos.forEach((lotto) => {
    win_nums.includes(lotto) && count++;
  });

  const minRank = count !== 0 ? rank - count : rank - count - 1;

  const maxRank = zeros !== 0 ? rank - count - zeros : minRank;

  return [maxRank, minRank];
}
