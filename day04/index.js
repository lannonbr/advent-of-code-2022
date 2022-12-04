const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

function intersects(a, b) {
  return new Set([...a].filter((i) => b.has(i)));
}

const eqSet = (xs, ys) =>
  xs.size === ys.size && [...xs].every((x) => ys.has(x));

const lines = data
  .split("\n")
  .map((line) =>
    line
      .split(",")
      .map((section) => section.split("-").map((c) => +c))
      .map((cs) => {
        let arr = [];
        for (let i = cs[0]; i <= cs[1]; i++) {
          arr.push(i);
        }
        return new Set(arr);
      })
  )
  .map((cs) => [cs[0], cs[1], intersects(cs[0], cs[1])]);

console.log(
  "part 1:",
  lines.filter((cs) => {
    return eqSet(cs[0], cs[2]) || eqSet(cs[1], cs[2]);
  }).length
);
console.log(
  "part 2:",
  lines.filter((cs) => {
    return cs[2].size > 0;
  }).length
);
