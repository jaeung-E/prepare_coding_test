const isLinux = process.platform === 'linux'
const file = isLinux ? '/dev/stdin' : '../../input.txt';
const input = require('fs')
  .readFileSync(file, 'utf-8')
  .trim()
  .split('\n');

const K = Number(input[0]);
const inequalitySigns = input[1].split(' ');
const NUMBER_RANGE = 10;

function solution(K, inequalitySigns) {
  let maximumNumber = -Infinity;
  let minimumNumber = Infinity;

  for (let i = 0; i < NUMBER_RANGE; i += 1) {
    const number = getNumber(String(i), inequalitySigns, K);
    maximumNumber = getMaximumNumber(number.maximumNumber, maximumNumber);
    minimumNumber = getMinimumNumber(number.minimumNumber, minimumNumber);
  }
  return `${maximumNumber}\n${minimumNumber}`;
}

function getNumber(start, inequalitySigns, length) {
  const visited = new Array(NUMBER_RANGE).fill(false);
  const stack = [start];
  visited[start] = true;

  let maximumNumber = -Infinity;
  let minimumNumber = Infinity;

  while (stack.length !== 0) {
    const number = stack.pop();
    for (let i = 0; i < NUMBER_RANGE; i += 1) {
      if (!number.includes(i)) visited[i] = false;
      else visited[i] = true;
    }

    if (number.length - 1 === length) {
      maximumNumber = getMaximumNumber(number, maximumNumber);
      minimumNumber = getMinimumNumber(number, minimumNumber);
    }

    const index = number.length - 1;
    if (inequalitySigns[index] === '<') {
      for (let i = Number(number[index]) + 1; i < NUMBER_RANGE; i += 1) {
        if (!visited[i]) {
          visited[i] = true;
          stack.push(`${number}${i}`)
        }
      }
    } else {
      for (let i = number[index]; i > -1; i -= 1) {
        if (!visited[i]) {
          visited[i] = true;
          stack.push(`${number}${i}`)
        }
      }
    }
  }

  return { maximumNumber, minimumNumber };
}

function getMaximumNumber(numberA, numberB) {
  return (numberA > numberB ? numberA : numberB);
}

function getMinimumNumber(numberA, numberB) {
  return (numberA < numberB ? numberA : numberB);
}

console.log(solution(K, inequalitySigns));