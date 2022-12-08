const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

const trees = data.split("\n").map((line) => line.split(""));

let gridSize = trees.length;

function isEdge(x, y) {
  return [0, gridSize - 1].includes(x) || [0, gridSize - 1].includes(y);
}

function seeEdge(x, y) {
  // W
  for (let x0 = x - 1; x0 >= 0; x0--) {
    if (trees[x][y] <= trees[x0][y]) {
      break;
    }
    if (x0 === 0 && trees[x][y] > trees[x0][y]) {
      return true;
    }
  }

  // E
  for (let x0 = x + 1; x0 < gridSize; x0++) {
    if (trees[x][y] <= trees[x0][y]) {
      break;
    }
    if (x0 === gridSize - 1 && trees[x][y] > trees[x0][y]) {
      return true;
    }
  }

  // S
  for (let y0 = y + 1; y0 < gridSize; y0++) {
    if (trees[x][y] <= trees[x][y0]) {
      break;
    }
    if (y0 === gridSize - 1 && trees[x][y] > trees[x][y0]) {
      return true;
    }
  }

  // N
  for (let y0 = y - 1; y0 >= 0; y0--) {
    if (trees[x][y] <= trees[x][y0]) {
      break;
    }
    if (y0 === 0 && trees[x][y] > trees[x][y0]) {
      return true;
    }
  }

  return false;
}

let tallBois = 0;

for (let x = 0; x < gridSize; x++) {
  for (let y = 0; y < gridSize; y++) {
    if (isEdge(x, y)) {
      tallBois++;
    } else if (seeEdge(x, y)) {
      tallBois++;
    }
  }
}

console.log(tallBois);
