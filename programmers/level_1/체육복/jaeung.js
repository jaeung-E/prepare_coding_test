function solution(n, lost, reserve) {
  const spare = lost.filter((num) => reserve.includes(num));
  lost = lost.filter((num) => !spare.includes(num)).sort((a, b) => a - b);
  reserve = reserve.filter((num) => !spare.includes(num)).sort((a, b) => a - b);

  lost = lost.filter((lostStudent) => {
    const rs = reserve.find(
      (reserveStudent) => Math.abs(reserveStudent - lostStudent) <= 1
    );
    if (!rs) return lostStudent;
    reserve = reserve.filter((reserveStudent) => reserveStudent !== rs);
  });

  return n - lost.length;
}
