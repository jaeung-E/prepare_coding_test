function solution(answers) {
  const answer = [];
  const scores = [];
  const students = {
    1: {
      answer: [1, 2, 3, 4, 5],
      score: 0,
    },
    2: {
      answer: [2, 1, 2, 3, 2, 4, 2, 5],
      score: 0,
    },
    3: {
      answer: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
      score: 0,
    },
  };

  for (const id in students) {
    const student = students[id];

    answers.forEach((answer, idx) => {
      const remainder = idx % student.answer.length;

      if (answer === student.answer[remainder]) student.score += 1;
    });

    scores.push(student.score);
  }

  const max = Math.max(...scores);

  for (const id in students) {
    const student = students[id];
    if (student.score === max) answer.push(parseInt(id));
  }

  return answer.sort((a, b) => a - b);
}
