const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

const lines = data.split("\n");

let surface = 0;

for (let line of lines) {
  let [x0, y0, z0] = line.split(",").map((num) => parseInt(num));
  for (let x of [-1, 1]) {
    let newPoint = [x0 + x, y0, z0].join(",");

    if (!lines.includes(newPoint)) {
      surface++;
    }
  }
  for (let y of [-1, 1]) {
    let newPoint = [x0, y0 + y, z0].join(",");

    if (!lines.includes(newPoint)) {
      surface++;
    }
  }
  for (let z of [-1, 1]) {
    let newPoint = [x0, y0, z0 + z].join(",");

    if (!lines.includes(newPoint)) {
      surface++;
    }
  }
}

console.log(surface);
