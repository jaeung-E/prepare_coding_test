function solution(numbers, hand) {
  let answer = '';
  const keypad = {
    1: [0, 0], 2: [0, 1], 3: [0, 2],
    4: [1, 0], 5: [1, 1], 6: [1, 2],
    7: [2, 0], 8: [2, 1], 9: [2, 2],
    '*': [3, 0], 0: [3, 1], '#': [3, 2]
  }

  const leftPad = [1, 4, 7];
  const rightPad = [3, 6, 9];

let leftFinger = keypad['*'];
  let rightFinger = keypad['#'];


  for (const number of numbers) {
    if (leftPad.includes(number)) {
      leftFinger = keypad[number];
      answer += 'L';
    } else if (rightPad.includes(number)) {
      rightFinger = keypad[number];
      answer += 'R';
    } else {
        const target = keypad[number];
      const leftDistance = Math.abs(leftFinger[0] - target[0]) + Math.abs(leftFinger[1] - target[1]);
      const rightDistance = Math.abs(rightFinger[0] - target[0]) + Math.abs(rightFinger[1] - target[1]);

      if (leftDistance < rightDistance) {
        answer += 'L';
        leftFinger = keypad[number];
      } else if (leftDistance > rightDistance) {
        answer += 'R';
        rightFinger = keypad[number];
      } else {
        if (hand[0] === 'l') {
          answer += 'L';
          leftFinger = keypad[number];
        } else {
          answer += 'R';
          rightFinger = keypad[number];
        }
      }
    }
  }
  return answer;
}

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right"));``