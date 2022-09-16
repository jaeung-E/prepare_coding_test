// https://school.programmers.co.kr/learn/courses/18/lessons/1878?language=javascript
// 10min

function solution(v) {
  const answer = [];
  const xCount = {};
  const yCount = {};
  
  v.forEach(([x, y]) => {
      xCount[x] ? xCount[x] += 1 : xCount[x] = 1;
      yCount[y] ? yCount[y] += 1 : yCount[y] = 1;
  });
  
  Object.entries(xCount).forEach(([key, value]) => {
      if (value === 1) answer.push(+key);
  });
  
  Object.entries(yCount).forEach(([key, value]) => {
      if (value === 1) answer.push(+key);
  });
  
  return answer;
}