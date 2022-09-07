// https://school.programmers.co.kr/learn/courses/30/lessons/42576
// 10m

function solution(participant, completion) {

  const participantMap = new Map();

  participant.forEach((person => {
    if (participantMap.has(person)) {
      participantMap.set(person, participantMap.get(person) + 1);
    } else {
      participantMap.set(person, 1);
    }
  }));

  completion.forEach((person => {
    participantMap.set(person, participantMap.get(person) - 1);
  }));

  for (const person of [...participantMap.keys()]) {
    if (participantMap.get(person) !== 0) return person;
  }
}