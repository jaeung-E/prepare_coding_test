function solution(v) {
  const position = {
    x: {},
    y: {},
  };

  v.forEach((arr) => {
    const [x, y] = arr;
    position["x"][x] ? position["x"][x]++ : (position["x"][x] = 1);
    position["y"][y] ? position["y"][y]++ : (position["y"][y] = 1);
  });

  const x = findKey(position["x"], 1);
  const y = findKey(position["y"], 1);

  return [x, y];
}

function findKey(object, value) {
  return Number(Object.keys(object).find((key) => object[key] === value));
}
