function solution(s) {
  let binaryString = s;
  let zeros = 0;
  let cycle = 0;

  while (binaryString !== "1") {
    const arr = binaryString.split("").filter((char) => char !== "0");
    zeros += binaryString.length - arr.length;
    binaryString = arr.length.toString(2);
    cycle++;
  }

  return [cycle, zeros];
}
