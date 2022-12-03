const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

let groupsOfThree = [];

let lines = data.split("\n");

for (let i = 0; i < lines.length / 3; i++) {
  groupsOfThree.push(lines.slice(i * 3, i * 3 + 3));
}

const priorities = groupsOfThree
  .map((group) => {
    for (let char of group[0]) {
      if (group[1].includes(char) && group[2].includes(char)) {
        return char;
      }
    }
  })
  .map((char) => {
    if (char.toLowerCase() === char) {
      // convert a-z ascii to 1 - 26
      return char.charCodeAt(0) - 96;
    } else {
      // convert A-Z ascii to 27 - 52
      return char.charCodeAt(0) - 65 + 27;
    }
  });

console.log(priorities.reduce((acc, a) => acc + a, 0));
