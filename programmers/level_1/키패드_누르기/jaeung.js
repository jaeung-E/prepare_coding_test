function solution(numbers, hand) {
  const answer = [];
  let leftPosition = [3, 0];
  let rightPosition = [3, 2];

  for (const number of numbers) {
    const quotient = parseInt(number / 3);
    const remainder = number % 3;

    if (remainder === 0 && number !== 0) {
      answer.push("R");
      rightPosition = [quotient - 1, 2];
      continue;
    } else if (remainder === 1) {
      answer.push("L");
      leftPosition = [quotient, 0];
      continue;
    }

    const targetPosition = number !== 0 ? [quotient, 1] : [3, 1];
    const leftDistance =
      Math.abs(leftPosition[0] - targetPosition[0]) +
      Math.abs(leftPosition[1] - targetPosition[1]);

    const rightDistance =
      Math.abs(rightPosition[0] - targetPosition[0]) +
      Math.abs(rightPosition[1] - targetPosition[1]);

    if (leftDistance < rightDistance) {
      answer.push("L");
      leftPosition = [...targetPosition];
    } else if (leftDistance > rightDistance) {
      answer.push("R");
      rightPosition = [...targetPosition];
    } else {
      if (hand === "right") {
        answer.push("R");
        rightPosition = [...targetPosition];
      } else {
        answer.push("L");
        leftPosition = [...targetPosition];
      }
    }
  }

  return answer.join("");
}
