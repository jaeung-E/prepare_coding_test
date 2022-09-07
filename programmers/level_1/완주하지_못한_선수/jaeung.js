function solution(participant, completion) {
  const answer = {};

  participant.forEach((name) =>
    answer[name] ? answer[name]++ : (answer[name] = 1)
  );
  completion.forEach((name) => answer[name]--);

  return Object.entries(answer)
    .filter((arr) => arr[1] === 1)
    .flatMap((arr) => arr[0])
    .join("");
}
