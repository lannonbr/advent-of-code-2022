const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

const moves = data.split("\n").map((line) => line.split(" "));
console.log(moves);

let hPos = [0, 0];
let tPos = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

let xDelta = 0;
let yDelta = 0;

const tPosPoints = new Set();

for (let move of moves) {
  xDelta = 0;
  yDelta = 0;

  let [dir, count] = move;
  count = parseInt(count);

  if (dir === "L") {
    xDelta = -1;
  } else if (dir === "R") {
    xDelta = 1;
  } else if (dir === "U") {
    yDelta = 1;
  } else if (dir === "D") {
    yDelta = -1;
  }

  for (let i = 0; i < count; i++) {
    hPos[0] += xDelta;
    hPos[1] += yDelta;

    for (let i = 0; i < 9; i++) {
      if (i === 0) {
        tPos[i] = calculateTPos(hPos, tPos[i]);
      } else {
        tPos[i] = calculateTPos(tPos[i - 1], tPos[i]);
      }
    }

    tPosPoints.add(tPos[8].join(","));
  }
  console.log(hPos, tPos);
  console.log("\n");
}

console.log(tPosPoints.size);

function calculateTPos(hPos, tPos) {
  let newTPos = [...tPos];

  const xDiff = hPos[0] - tPos[0];
  const yDiff = hPos[1] - tPos[1];

  // on top / right next door
  if (
    (xDiff === 0 && yDiff === 0) ||
    (Math.abs(xDiff) === 1 && yDiff === 0) ||
    (xDiff === 0 && Math.abs(yDiff) === 1) ||
    (Math.abs(xDiff) === 1 && Math.abs(yDiff) === 1)
  ) {
    return newTPos;
  }

  // Straight
  if (xDiff === 2 && yDiff === 0) {
    newTPos[0] += 1;
  } else if (xDiff === -2 && yDiff === 0) {
    newTPos[0] -= 1;
  } else if (yDiff === 2 && xDiff === 0) {
    newTPos[1] += 1;
  } else if (yDiff === -2 && xDiff === 0) {
    newTPos[1] -= 1;
  }

  // Diagonals
  if (yDiff === 2 && xDiff === 1) {
    // up right
    newTPos[0] += 1;
    newTPos[1] += 1;
  } else if (yDiff === -2 && xDiff === 1) {
    // down right
    newTPos[0] += 1;
    newTPos[1] -= 1;
  } else if (xDiff === 2 && yDiff === 1) {
    // up right
    newTPos[0] += 1;
    newTPos[1] += 1;
  } else if (xDiff === -2 && yDiff === 1) {
    // up left
    newTPos[0] -= 1;
    newTPos[1] += 1;
  }

  if (yDiff === 2 && xDiff === -1) {
    // up right
    newTPos[0] -= 1;
    newTPos[1] += 1;
  } else if (yDiff === -2 && xDiff === -1) {
    // down right
    newTPos[0] -= 1;
    newTPos[1] -= 1;
  } else if (xDiff === 2 && yDiff === -1) {
    // up right
    newTPos[0] += 1;
    newTPos[1] -= 1;
  } else if (xDiff === -2 && yDiff === -1) {
    // up left
    newTPos[0] -= 1;
    newTPos[1] -= 1;
  }

  if (yDiff === 2 && xDiff === 2) {
    newTPos[0] += 1;
    newTPos[1] += 1;
  } else if (yDiff === 2 && xDiff === -2) {
    newTPos[0] -= 1;
    newTPos[1] += 1;
  } else if (yDiff === -2 && xDiff === 2) {
    newTPos[0] += 1;
    newTPos[1] -= 1;
  } else if (yDiff === -2 && xDiff === -2) {
    newTPos[0] -= 1;
    newTPos[1] -= 1;
  }

  return newTPos;
}
