function solution(places) {
  const answer = [];

  for (const place of places) {
    let flag = true;

    for (const [x, line] of place.entries()) {
      for (const [y, cell] of line.split("").entries()) {
        if (cell === "P" && !checkAround(x, y, place)) {
          flag = false;
          answer.push(flag);
          break;
        }
      }

      if (!flag) break;
    }

    if (!flag) continue;
    answer.push(flag);
  }

  return answer.map((bool) => Number(bool));
}

function checkAround(x, y, place) {
  const dx = [0, 0, 1, 2, 1, 1, 0, 0];
  const dy = [2, 1, 1, 0, 0, -1, -2, -1];

  for (let i = 0; i < dx.length; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (isBound(nx, ny, place) && place[nx][ny] === "P") {
      if (!isBlock([x, y], [nx, ny], place)) {
        return false;
      }
    }
  }

  return true;
}

function isBound(x, y, place) {
  if (x >= 0 && y >= 0 && x < place.length && y < place[0].length) return true;
  return false;
}

function isBlock(arrA, arrB, place) {
  let boolean = true;
  const [ax, ay] = arrA;
  const [bx, by] = arrB;
  const maxY = Math.max(ay, by);
  const distance = Math.abs(ax - bx) + Math.abs(ay - by);

  if (distance < 2) return false;

  if (ax === bx && ay !== by) {
    boolean = place[ax][maxY - 1] !== "X" ? false : true;
  } else if (ay === by && ax !== bx) {
    boolean = place[ax + 1][ay] !== "X" ? false : true;
  } else {
    boolean = place[ax][by] === "X" && place[bx][ay] === "X" ? true : false;
  }

  return boolean;
}
