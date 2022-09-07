// https://school.programmers.co.kr/learn/courses/30/lessons/81302
// 40min

const DX = [1, -1, 0, 0];
const DY = [0, 0, 1, -1];

function check(place) {
  for (let row = 0; row < place.length; row += 1) {
    for (let col = 0; col < place[0].length; col += 1) {

      const seat = place[row][col];

      if (seat === 'X') continue;

      let count = 0;

      for (let i = 0; i < 4; i += 1) {
        const nextRow = row + DX[i];
        const nextCol = col + DY[i];

        if (nextRow < 0 || nextRow >= place.length || nextCol < 0 || nextCol >= place.length) continue;

        if (place[nextRow][nextCol] === 'P') count += 1;
      }

      if ((seat === 'P' && count >= 1) || (seat === 'O' && count >= 2)) return 0
    }
  }
  return 1;
}

function solution(places) {
  return places.map(place => check(place));
}