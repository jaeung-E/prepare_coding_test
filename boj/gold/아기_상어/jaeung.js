const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\r\n");
const [[N], ...grids] = input.map((str) => str.split(" ").map(Number));

solution(N, grids);

function solution(N, grids) {
  let time = 0;
  let feedStack = 0;
  let sharkSize = 2;

  while (true) {
    let feed = null;

    outer: for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        const isShark = grids[x][y] === 9;

        if (isShark) {
          feed = searchFeed([x, y], N, sharkSize, grids);
        }

        if (feed) {
          const [feedX, feedY, distance] = feed;
          grids[feedX][feedY] = 9;
          grids[x][y] = 0;
          feedStack++;
          time += distance;

          if (feedStack === sharkSize) {
            sharkSize++;
            feedStack = 0;
          }

          break outer;
        }
      }
    }

    if (!feed) break;
  }

  console.log(time);
}

function searchFeed(position, N, sharkSize, grids) {
  const distance = Array.from(Array(N), () => Array(N).fill(0));
  const feedList = [];
  const queue = [[...position]];
  const [sharkX, sharkY] = position;
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  distance[sharkX][sharkY] = 1;

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const isFeed = grids[x][y] < sharkSize && grids[x][y] !== 0;

    if (isFeed) {
      feedList.push([x, y, distance[x][y] - 1]);
    }

    dx.forEach((_, index) => {
      const nx = x + dx[index];
      const ny = y + dy[index];
      const isMove = isBound(nx, ny, N) && grids[nx][ny] <= sharkSize;
      const isVisited = isBound(nx, ny, N) && distance[nx][ny] !== 0;

      if (isMove && !isVisited) {
        queue.push([nx, ny]);
        distance[nx][ny] = distance[x][y] + 1;
      }
    });
  }

  feedList.sort(comparator);

  return feedList.length > 0 ? feedList.shift() : null;
}

function isBound(x, y, N) {
  if (x >= 0 && y >= 0 && x < N && y < N) return true;

  return false;
}

function comparator(a, b) {
  const [xA, yA, DistanceA] = a;
  const [xB, yB, DistanceB] = b;

  if (DistanceA === DistanceB) {
    if (xA === xB) return yA - yB;

    return xA - xB;
  }

  return DistanceA - DistanceB;
}
