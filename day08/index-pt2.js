const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

const trees = data.split("\n").map((line) => line.split(""));

let gridSize = trees.length;

function calcScenicScore(x, y) {
  // W
  let w0 = 0;
  for (let x0 = x - 1; x0 >= 0; x0--) {
    if (trees[x][y] <= trees[x0][y]) {
      w0++;
      break;
    }
    if (x0 === 0 && trees[x][y] > trees[x0][y]) {
      w0++;
      break;
    }
    w0++;
  }

  // E
  let e0 = 0;
  for (let x0 = x + 1; x0 < gridSize; x0++) {
    if (trees[x][y] <= trees[x0][y]) {
      e0++;
      break;
    }
    if (x0 === gridSize - 1 && trees[x][y] > trees[x0][y]) {
      e0++;
      break;
    }
    e0++;
  }

  // S
  let s0 = 0;
  for (let y0 = y + 1; y0 < gridSize; y0++) {
    if (trees[x][y] <= trees[x][y0]) {
      s0++;
      break;
    }
    if (y0 === gridSize - 1 && trees[x][y] > trees[x][y0]) {
      s0++;
      break;
    }
    s0++;
  }

  // N
  let n0 = 0;
  for (let y0 = y - 1; y0 >= 0; y0--) {
    if (trees[x][y] <= trees[x][y0]) {
      n0++;
      break;
    }
    if (y0 === 0 && trees[x][y] > trees[x][y0]) {
      n0++;
      break;
    }
    n0++;
  }

  return n0 * e0 * s0 * w0;
}

let maxScenicScore = 0;

// no edges for you
for (let x = 1; x < gridSize - 1; x++) {
  for (let y = 1; y < gridSize - 1; y++) {
    let scenicScore = calcScenicScore(x, y);
    if (scenicScore > maxScenicScore) {
      maxScenicScore = scenicScore;
    }
  }
}

console.log(maxScenicScore);
