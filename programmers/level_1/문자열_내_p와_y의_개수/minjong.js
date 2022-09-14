// https://school.programmers.co.kr/learn/courses/30/lessons/12916
// under 5min

function solution(s){
  return [...s].filter(x => x.toLowerCase() === 'p').length === [...s].filter(x => x.toLowerCase() === 'y').length;
}