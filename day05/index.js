const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

let [stacks, moves] = data.split("\n\n");

moves = moves.split("\n").map((line) => {
  let reg = /move\s(\d+)\sfrom\s(\d)\sto\s(\d)/gm;

  let matches = reg.exec(line);

  let [_, count, from, to] = matches;
  count = parseInt(count);
  from = parseInt(from);
  to = parseInt(to);

  return { count, from, to };
});

stacks = stacks.split("\n").reverse();

let numberOfStacks = parseInt(stacks[0].slice(-2, -1));

let stacksArr = Array(numberOfStacks);
for (let i = 0; i < numberOfStacks; i++) {
  stacksArr[i] = [];
}

stacks.slice(1).forEach((line, idx) => {
  for (let i = 0; i < numberOfStacks; i++) {
    if (line[1 + i * 4] !== " ") {
      stacksArr[i].push(line[1 + i * 4]);
    }
  }
});

for (let { count, from, to } of moves) {
  for (let i = 0; i < count; i++) {
    let temp = stacksArr[from - 1].pop();
    stacksArr[to - 1].push(temp);
  }
}

console.log(stacksArr.map((stack) => stack.at(-1)).join(""));
