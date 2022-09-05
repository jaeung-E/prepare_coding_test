// 시간 초과
// function solution(numbers) {
//     numbers = numbers.map((number) => {
//         console.log(`${number}`)
//         const num = number;
//         console.log(`num: ${num.toString(2)}`)

//         while (true) {
//             const nextNumber = ++number;
//             const xor = BigInt(nextNumber) ^ BigInt(num);
//             const count = xor.toString(2).replaceAll('0', '').length;

//             console.log(nextNumber.toString(2))
//             if (count <= 2 && count >= 1) return nextNumber;
//         }
//     });

//     return numbers;
// }

function solution(numbers) {
  const answer = [];

  numbers.forEach((number) => {
    const isEven = number % 2 === 0;

    if (isEven) {
      answer.push(number + 1);
    } else {
      const binary = number.toString(2);
      let newBinary = binary.padStart(binary.length + 1, "0");
      const index = newBinary.lastIndexOf("01");

      newBinary =
        newBinary.slice(0, index) +
        "10" +
        newBinary.slice(index + 2, newBinary.length);
      answer.push(parseInt(newBinary, 2));
    }
  });

  return answer;
}
