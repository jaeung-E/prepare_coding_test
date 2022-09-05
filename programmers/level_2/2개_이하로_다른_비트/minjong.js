// https://school.programmers.co.kr/learn/courses/30/lessons/77885#

function solution(numbers) {
  var answer = [];

  for (const number of numbers) {
    if (number % 2 === 0) {
      answer.push(number + 1);
    } else {
      const binary = number.toString(2).split('');
      const reverseZeroIndex = [...binary].reverse().findIndex(char => char === '0');
      let zeroIndex = null;

      if (reverseZeroIndex === -1) {
        binary.unshift('0');
        zeroIndex = 0;
      } else {
        zeroIndex = binary.length - reverseZeroIndex - 1;
      }

      binary[zeroIndex] = '1';
      if (binary[zeroIndex + 1] === '1') binary[zeroIndex + 1] = '0';

      answer.push(parseInt(binary.join(''), 2));
    }
  }
  
  return answer;
}