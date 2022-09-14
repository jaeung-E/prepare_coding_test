function solution(info, query) {
  const answer = [];
  const dict = {};

  info.map((str) => {
    const arr = str.split(" ");
    const score = Number(arr.pop());
    const result = [];
    combination(arr, 0, result);

    result.forEach((string) => {
      dict[string] ? dict[string].push(score) : (dict[string] = [score]);
    });
  });

  for (const key in dict) {
    dict[key].sort((a, b) => a - b);
  }

  query.forEach((q) => {
    const qArr = q.replaceAll(/and\s/g, "").split(" ");
    const targetScore = Number(qArr.pop());
    const key = qArr.join("");

    answer.push(binarySearch(dict[key], targetScore));
  });

  return answer;
}

function combination(arr, start, result) {
  const key = arr.join("");
  result.push(key);

  for (let i = start; i < arr.length; i++) {
    const tempArr = [...arr];
    tempArr[i] = "-";
    combination(tempArr, i + 1, result);
  }
}

function binarySearch(arr, targetScore) {
  if (!arr) return 0;

  let low = 0;
  let high = arr.length;

  while (low < high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] < targetScore) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return arr.length - low;
}

// 시간 초과 풀이
/* 
function solution(info, query) {
  const answer = [];

  query.forEach((str) => {
      let count = 0;
      const newQuery = str.split(' ').filter((s) => !s.match(/and|-/g));
      const queryScore = Number(newQuery.splice(-1));

      info.forEach((person) => {
          const personInfo = person.split(' ');
          const personScore = Number(personInfo.splice(-1));
          const isMatch = newQuery.every((s) => personInfo.includes(s));

          if (isMatch && personScore >= queryScore) count++;
      })

      answer.push(count);
  });

  return answer;
} 
 */
