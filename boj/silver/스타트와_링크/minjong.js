const isLinux = process.platform === 'linux'
const file = isLinux ? '/dev/stdin' : '../../input.txt';
const input = require('fs')
  .readFileSync(file, 'utf-8')
  .trim()
  .split('\n');

const N = Number(input[0]);
const S = input.splice(1);

function solution(N, S) {
  const graph = S.map((v) => v.split(' ').map(Number));
  const people = Array.from({ length: N }, (_, i) => i);
  const teams = buildTeam(people, N / 2);

  let minimumValue = Infinity;
  
  for (let i = 0; i < teams.length / 2; i += 1) {
    const teamStart = teams[i];
    const teamLink = people.filter((person) => !teamStart.includes(person));
    
    const teamStartStatus = getStatus(teamStart, graph) 
    const teamLinkStatus = getStatus(teamLink, graph)

    minimumValue = Math.min(minimumValue, Math.abs(teamStartStatus - teamLinkStatus));
  }
  return minimumValue;
}

function buildTeam(arr, length) {
  if (length === 1) return arr.map(x => [x]);

  const team = [];
  arr.forEach((fixed, index, arr) => {
    const rest = arr.slice(index + 1);
    const combinations = buildTeam(rest, length - 1);
    const combine = combinations.map(x => [fixed, ...x]);
    team.push(...combine);
  })
  return team;
}

function getStatus(team, graph) {
  let sum = 0;
  for (let i = 0; i < team.length; i += 1) {
    for (let j = 0; j < team.length; j += 1) {
      sum += graph[team[i]][team[j]];
    }
  }
  return sum;
}

console.log(solution(N, S));