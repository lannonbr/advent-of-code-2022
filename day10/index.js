const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString().split("\n");

let registerX = 1;

let cycle = 1;

const signals = [20, 60, 100, 140, 180, 220];
let signalSums = 0;

function checkForSignalSum() {
  if (signals.includes(cycle)) {
    signalSums += cycle * registerX;
  }
}

for (let line of data) {
  checkForSignalSum();
  if (line.startsWith("noop")) {
    cycle++;
  } else if (line.startsWith("addx")) {
    cycle += 1;
    checkForSignalSum();
    cycle += 1;
    registerX += parseInt(line.split("addx ")[1]);
  }
}

console.log(signalSums);
