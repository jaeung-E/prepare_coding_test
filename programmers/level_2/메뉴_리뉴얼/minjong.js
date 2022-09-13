// https://school.programmers.co.kr/learn/courses/30/lessons/72411
// 55min

function getCombinations(arr, length) {
  if (length === 1) return arr.map(x => [x]);

  const result = [];
  arr.forEach((fixed, index, arr) => {
    const rest = arr.slice(index + 1);
    const combinations = getCombinations(rest, length - 1);
    const combine = combinations.map(x => [fixed, ...x]);
    result.push(...combine);
  })

  return result;
}

function solution(orders, course) {
  const answer = [];

  for (const ea of course) {
    const courseOrder = {};

    for (const order of orders) {

      const combinations = getCombinations(order.split(''), ea);

      for (const course of combinations) {
        const key = course.sort().join('');
        if (key in courseOrder) courseOrder[key] += 1;
        else courseOrder[key] = 1;

      }
    }
    const max = Math.max(...Object.values(courseOrder));
    if (max > 1) {
      answer.push(...Object.keys(courseOrder).filter(key => courseOrder[key] === max))
    }
  }
  return answer.sort();
}