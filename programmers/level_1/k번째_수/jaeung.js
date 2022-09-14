function solution(array, commands) {
  const answer = [];

  commands.forEach((command) => {
    const [start, end, index] = command;
    const newArray = array.slice(start - 1, end).sort((a, b) => a - b);

    answer.push(newArray[index - 1]);
  });

  return answer;
}
