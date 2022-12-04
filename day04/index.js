const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

function intersects(xs, ys) {
  return new Set([...xs].filter((x) => ys.has(x)));
}

const eqSet = (xs, ys) =>
  xs.size === ys.size && [...xs].every((x) => ys.has(x));

const lines = data
  .split("\n")
  .map((line) =>
    line
      .split(",")
      .map((section) => section.split("-").map((number) => +number))
      .map((set) => {
        let arr = [];
        for (let i = set[0]; i <= set[1]; i++) {
          arr.push(i);
        }
        return new Set(arr);
      })
  )
  .map((sets) => [sets[0], sets[1], intersects(sets[0], sets[1])]);

console.log(
  "part 1:",
  lines.filter((sets) => {
    return eqSet(sets[0], sets[2]) || eqSet(sets[1], sets[2]);
  }).length
);
console.log(
  "part 2:",
  lines.filter((sets) => {
    return sets[2].size > 0;
  }).length
);
