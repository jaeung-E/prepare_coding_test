function solution(orders, course) {
  const answer = [];

  course.forEach((num) => {
    const orderDict = {};

    orders.forEach((order) => {
      const orderArr = order.split("").sort();
      const combinationArr = combination(orderArr, num);

      combinationArr.forEach((arr) => {
        const o = arr.join("");
        orderDict[o] ? ++orderDict[o] : (orderDict[o] = 1);
      });
    });

    const orderEntries = Object.entries(orderDict);
    const max = Math.max(...orderEntries.map((arr) => arr[1]));
    const filterArr = orderEntries
      .filter((arr) => arr[1] === max && max !== 1)
      .map((arr) => arr[0]);

    answer.push(...filterArr);
  });

  return answer.sort();
}

function combination(arr, num) {
  if (num === 1) return arr.map((elem) => [elem]);

  const combinations = [];

  arr.forEach((element, index) => {
    const smallerCombinations = combination(arr.slice(index + 1), num - 1);
    smallerCombinations.forEach((combination) => {
      combinations.push([element].concat(combination));
    });
  });

  return combinations;
}
