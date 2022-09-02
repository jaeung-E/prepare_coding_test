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

  let leftFinger = '*';
  let rightFinger = '#';


  for (const number of numbers) {
    if (leftPad.includes(number)) {
      leftFinger = number;
      answer += 'L';
    } else if (rightPad.includes(number)) {
      rightFinger = number;
      answer += 'R';
    } else {
      const leftDistance = Math.abs(keypad[leftFinger][0] - keypad[number][0]) + Math.abs(keypad[leftFinger][1] - keypad[number][1]);
      const rightDistance = Math.abs(keypad[rightFinger][0] - keypad[number][0]) + Math.abs(keypad[rightFinger][1] - keypad[number][1]);

      if (leftDistance < rightDistance) {
        answer += 'L';
        leftFinger = number;
      } else if (leftDistance > rightDistance) {
        answer += 'R';
        rightFinger = number;
      } else {
        if (hand[0] === 'l') {
          answer += 'L';
          leftFinger = number;
        } else {
          answer += 'R';
          rightFinger = number;
        }
      }
    }
  }
  return answer;
}

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right"));``