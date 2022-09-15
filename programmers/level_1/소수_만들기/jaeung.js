// 조합을 이용한 풀이
function solution(nums) {
  return combination(nums, 3).reduce((acc, arr) => {
    const sum = arr.reduce((sum, num) => sum + num, 0);
    if (isPrime(sum)) return acc + 1;

    return acc;
  }, 0);
}

function combination(arr, num) {
  const res = [];
  if (num === 1) return arr.map((v) => [v]);

  arr.forEach((v, idx, arr) => {
    const rest = arr.slice(idx + 1);
    const combinations = combination(rest, num - 1);
    const attach = combinations.map((combination) => [v, ...combination]);

    res.push(...attach);
  });

  return res;
}

function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }

  return true;
}

// 3중 for문을 이용한 풀이
/* function solution(nums) {
  let answer = 0;
  const len = nums.length;

  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len - 1; j++) {
      for (let k = j + 1; k < len; k++) {
        isPrime(nums[i] + nums[j] + nums[k]) && answer++;
      }
    }
  }

  return answer;
}

const isPrime = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }

  return true;
}; */
