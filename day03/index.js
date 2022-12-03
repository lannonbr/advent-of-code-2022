const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

let priorities = data
  .split("\n")
  .map((line) => {
    let firstHalf = line.slice(0, line.length / 2);
    let secondHalf = line.slice(line.length / 2);

    for (let char of firstHalf) {
      if (secondHalf.includes(char)) {
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
