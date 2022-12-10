const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString().split("\n");

let registerX = 1;

let cycle = 1;

let pic = ["", "", "", "", "", ""];
let row = 0;

function draw() {
  if (
    registerX === (cycle - 1) % 40 ||
    registerX + 1 === (cycle - 1) % 40 ||
    registerX - 1 === (cycle - 1) % 40
  ) {
    pic[row] += "#";
  } else {
    pic[row] += " ";
  }
  if (cycle % 40 === 0) {
    row++;
  }
}

for (let line of data) {
  draw();
  if (line.startsWith("noop")) {
    cycle++;
  } else if (line.startsWith("addx")) {
    cycle += 1;
    draw();
    cycle += 1;
    registerX += parseInt(line.split("addx ")[1]);
  }
}

console.log(pic);
