function solution(answers) {
  const answer = [];
  const students = {
    1: [1, 2, 3, 4, 5],
    2: [2, 1, 2, 3, 2, 4, 2, 5],
    3: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  };

  for (const id in students) {
    const student = students[id];
    let score = 0;

    answers.forEach((answer, idx) => {
      const remainder = idx % student.length;

      if (answer === student[remainder]) score += 1;
    });

    answer.push([id, score]);
  }

  const max = Math.max(...answer.map((arr) => arr[1]));

  return answer
    .filter((arr) => arr[1] === max)
    .map((arr) => parseInt(arr[0]))
    .sort((a, b) => a - b);
}
