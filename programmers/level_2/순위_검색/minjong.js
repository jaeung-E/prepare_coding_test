// https://school.programmers.co.kr/learn/courses/30/lessons/72412

// 기존 풀이 (효율성 통과 x)
function solution(info, query) {
  const database = {};

  info = info.map((value, index) => {
    const [lang, job, career, food, score] = value.split(' ');
    database[index] = { lang, job, career, food, score };
  });


  return query.map((value) => {
    const [lang, job, career, food, score] = value.replaceAll(' and ', ' ').split(' ');

    return Object.values(database).filter((row) => {
      if (+score > +row.score) {
        return false;
      }

      if (lang !== '-' && lang !== row.lang) {
        return false
      }

      if (job !== '-' && job !== row.job) {
        return false;
      }

      if (career !== '-' && career !== row.career) {
        return false;
      }

      if (food !== '-' && food !== row.food) {
        return false;
      }

      return true;
    }).length;
  });
}



// 다른 사람 풀이를 참고한 풀이
function solution(info, query) {
  const database = {};

  info.forEach((value) => {
    const data = value.split(' ');
    const score = +data.pop();
    const key = data.join('');

    key in database ? database[key].push(score) : database[key] = [score];
  });

  for (const data of Object.values(database)) {
    data.sort((a, b) => a - b);
  }

  return query.map((value) => {
    const wheres = value.split(/ and | |-/i).filter(v => v);

    let count = 0;
    const score = wheres.pop();
    const keys = Object.keys(database).filter(key => wheres.every(where => key.includes(where)));

    keys.forEach((key) => {
      const scores = database[key];

      let left = 0;
      let right = scores.length;
      while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (scores[mid] >= score) right = mid;
        else left = mid + 1;
      }

      count += database[key].length - left
    })

    return count;
  })
}