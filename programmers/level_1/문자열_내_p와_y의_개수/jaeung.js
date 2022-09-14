function solution(s) {
  const str = s.toLowerCase().split("");
  let countP = 0;
  let countY = 0;

  str.forEach((char) => {
    char === "p" && ++countP;
    char === "y" && ++countY;
  });

  return countP === countY ? true : false;
}

// 코드는 간결하나 성능 떨어짐
/* 
function solution(s){
    const str = s.toLowerCase().split('');
    const pArr = str.filter((char) => char === 'p');
    const yArr = str.filter((char) => char === 'y');

    return pArr.length === yArr.length ? true : false;
} 
*/
