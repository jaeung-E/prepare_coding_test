// https://school.programmers.co.kr/learn/courses/30/lessons/42862

function solution(n, lost, reserve) {
    
  const students = Array.from({length: n}, (_, i) => {
      let sportswear = 1;
      
      if (lost.includes(i + 1)) {
          sportswear -= 1;
      }
      
      if (reserve.includes(i + 1)) {
          sportswear += 1;
      }
      
      return sportswear;
  });
  
  students.forEach((student, index) => {
      if (student >= 2) {
          if (students[index - 1] === 0 || students[index + 1] === 0) {
              if (students[index - 1] === 0) students[index - 1] += 1;
              else if (students[index + 1] === 0) students[index + 1] += 1;
              students[index] -= 1;
          }
      }
  });

  return students.filter(student => student >= 1).length;
}