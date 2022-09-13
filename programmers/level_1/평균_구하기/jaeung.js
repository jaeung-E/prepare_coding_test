function solution(arr) {
  const avg = arr.reduce((acc, num) => acc + num) / arr.length;

  return Number(avg);
}
