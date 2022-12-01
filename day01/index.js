const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

let elves = data.split("\n\n");

elves = elves.map((e) => {
  return e.split("\n").reduce((a, b) => a + parseInt(b), 0);
});

console.log("part 1:", elves.sort((a, b) => b - a)[0]);
console.log(
  "part 2:",
  elves
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0)
);
