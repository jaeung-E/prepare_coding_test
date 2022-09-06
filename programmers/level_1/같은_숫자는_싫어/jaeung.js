function solution(arr) {
  return arr.filter((num, idx) => num !== arr[++idx]);
}
