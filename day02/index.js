const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

/**
 * A Rock
 * X Rock
 *
 * B Paper
 * Y Paper
 *
 * C Scissors
 * Z Scissors
 *
 * win = rock scissors
 * win = paper rock
 * win = scissors paper
 *
 * C X
 * A Y
 * B Z
 */

let n = data
  .split("\n")
  .map((a) => {
    if (a == "A Y") {
      return 6 + 2;
    } else if (a == "C X") {
      return 6 + 1;
    } else if (a == "B Z") {
      return 6 + 3;
    } else if (a == "A X") {
      return 3 + 1;
    } else if (a == "B Y") {
      return 3 + 2;
    } else if (a == "C Z") {
      return 3 + 3;
    } else if (a == "A Z") {
      return 0 + 3;
    } else if (a == "B X") {
      return 0 + 1;
    } else if (a == "C Y") {
      return 0 + 2;
    }
  })
  .reduce((acc, b) => acc + b, 0);

console.log(n);
