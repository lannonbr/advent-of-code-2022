const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

let monkeyRules = data.split("\n\n").map((monkey) => {
  const lines = monkey.split("\n");

  let monkeyNum = parseInt(lines[0].split("Monkey ")[1].split(":")[0]);
  let startingItems = lines[1]
    .split("Starting items: ")[1]
    .split(", ")
    .map((num) => parseInt(num));
  let op = lines[2].split("Operation: ")[1].split("new = ")[1];
  op = op.split(" ");
  let test = parseInt(lines[3].split("Test: divisible by ")[1]);
  let trueThrow = parseInt(lines[4].split("to monkey ")[1]);
  let falseThrow = parseInt(lines[5].split("to monkey ")[1]);

  return {
    monkeyNum,
    items: startingItems,
    op,
    test,
    trueThrow,
    falseThrow,
    inspects: 0,
  };
});

for (let i = 1; i <= 20; i++) {
  monkeyRules = runRound(monkeyRules);
}

let inspects = monkeyRules.map((monkey) => {
  return { num: monkey.monkeyNum, inspects: monkey.inspects };
});

inspects = inspects.sort((a, b) => b.inspects - a.inspects);

console.log(inspects[0].inspects * inspects[1].inspects);

function runRound(state) {
  for (let monkey of state) {
    for (let item of monkey.items) {
      monkey.inspects++;
      let op = monkey.op;

      if (op[1] === "*") {
        if (op[2] === "old") {
          item = item * item;
        } else {
          item = item * parseInt(op[2]);
        }
      } else if (op[1] === "+") {
        if (op[2] === "old") {
          item = item + item;
        } else {
          item = item + parseInt(op[2]);
        }
      }

      item = Math.floor(item / 3);

      if (item % monkey.test === 0) {
        state[monkey.trueThrow].items.push(item);
      } else {
        state[monkey.falseThrow].items.push(item);
      }
    }
    monkey.items = [];
  }

  return state;
}
