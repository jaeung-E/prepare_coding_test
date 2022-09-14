// https://school.programmers.co.kr/learn/courses/30/lessons/42748
// 5m

function solution(array, commands) {
  return commands.map(([i, j, k]) => {
      return array.slice(i - 1, j).sort((a, b) => a - b)[k - 1]
  })
}