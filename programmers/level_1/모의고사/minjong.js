// https://school.programmers.co.kr/learn/courses/30/lessons/42840
// 25m

function solution(answers) {
  const pattern = {
    A: [1, 2, 3, 4, 5],
    B: [2, 1, 2, 3, 2, 4, 2, 5],
    C: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
  }

  const score = {
    A: 0,
    B: 0,
    C: 0
  }

  for (let i = 0; i < answers.length; i += 1) {
    const indexA = i - (pattern.A.length * Math.floor(i / pattern.A.length))
    if (pattern.A[indexA] === answers[i]) score.A += 1;

    const indexB = i - (pattern.B.length * Math.floor(i / pattern.B.length))
    if (pattern.B[indexB] === answers[i]) score.B += 1;

    const indexC = i - (pattern.C.length * Math.floor(i / pattern.C.length))
    if (pattern.C[indexC] === answers[i]) score.C += 1;
  }

  const max = Math.max(...Object.values(score));

  return [...Object.keys(score)].filter(key => score[key] === max).map(key => key.charCodeAt() - 64).sort();
}