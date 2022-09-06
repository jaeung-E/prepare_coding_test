function solution(n, k) {
  const answer = n
    .toString(k)
    .split("0")
    .filter((num) => isPrime(Number(num)));

  return answer.length;
}

function isPrime(number) {
  if (number <= 1) return false;

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }

  return true;
}
