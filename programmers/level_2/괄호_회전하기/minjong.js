function solution(s) {
  let answer = 0;
  outer: for (let i = 0; i < s.length; i += 1) {
      const bracket = s.slice(i) + s.slice(0, i)
      const stack = [];
      
      for (const char of bracket) {
          if (['[', '(', '{'].includes(char)) {
              stack.push(char);
          } else {
              const value = stack.pop();
              if (char === ']' && value !== '[') continue outer;
              else if (char === '}' && value !== '{') continue outer;
              else if (char === ')' && value !== '(') continue outer;
          }
      }
      if (stack.length === 0) answer += 1;
  }
  return answer;
}