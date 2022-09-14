function solution(s) {
  let answer = 0;

  for (const _ of s) {
    if (isCorrect(s)) answer++;

    s = s.slice(1) + s[0];
  }

  return answer;
}

function isCorrect(string) {
  const stack = [];
  const arr = string.split("");
  const poll = arr.shift();
  const bracket = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  if (!bracket[poll]) return false;

  stack.push(poll);

  for (const i of Object.keys(arr)) {
    const peek = stack[stack.length - 1];
    const closeBracket = bracket[peek];

    if (closeBracket === arr[i]) {
      stack.pop();
      continue;
    }

    stack.push(arr[i]);
  }

  return !stack.length ? true : false;
}
