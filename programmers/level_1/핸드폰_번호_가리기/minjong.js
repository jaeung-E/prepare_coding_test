// https://school.programmers.co.kr/learn/courses/30/lessons/12948?language=javascript
// 5min

function solution(phone_number) {
  return phone_number.slice(phone_number.length - 4).padStart(phone_number.length, '*')
}