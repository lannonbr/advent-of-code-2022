const fs = require("fs");
const get = require("lodash.get");
const data = fs.readFileSync("./input.txt").toString().split("\n");

const dirTree = {
  "/": {},
};

let cursor = ["/"];

for (let line of data) {
  if (line.startsWith("$")) {
    // commands
    if (line.includes("cd")) {
      const newDir = line.split("$ cd ")[1];
      if (newDir === "..") {
        cursor.pop();
      } else if (newDir === "/") {
        cursor = ["/"];
      } else {
        cursor.push(newDir);
      }
      // console.log(`now in ${cursor.join("/")}`);
    } else if (line.includes("ls")) {
      // console.log("ls");
      continue;
    }
  } else {
    // ls output
    if (line.startsWith("dir")) {
      const pos = get(dirTree, cursor.join("."));
      const newDir = line.split("dir ")[1];
      pos[newDir] = {};
    } else {
      const [size, fileName] = line.split(" ");
      const pos = get(dirTree, cursor.join("."));
      pos[fileName] = size;
    }
  }
}

// console.log(dirTree);

let sizes = new Map();
function sumDirSize(dirName, dir) {
  let size = 0;
  for (const f of Object.entries(dir)) {
    if (!sizes.has(f[0]) && typeof f[1] === "object") {
      sizes.set(dirName + "/" + f[0], 0);
    }
    if (typeof f[1] === "object") {
      const dirSize = sumDirSize(dirName + "/" + f[0], f[1]);
      size += dirSize;
    } else {
      size += parseInt(f[1]);
    }
  }
  sizes.set(dirName, size);

  return size;
}

const totalSum = sumDirSize("/", dirTree["/"]);
// console.log(sizes);

const smallDirs = [...sizes.entries()].filter(
  ([_dirName, size]) => size <= 100_000
);
// console.log(smallDirs);
console.log(
  "Part 1 soln:",
  smallDirs.reduce((a, b) => a + b[1], 0)
);

// PART 2

const totalFSSize = 70000000;
const neededUnusedSpace = 30000000;
const usedSpace = totalSum;

const sortedDirs = [...sizes.entries()].sort((a, b) => a[1] - b[1]);

for (let [_dirName, dirSize] of sortedDirs) {
  let currUnusedSpace = totalFSSize - usedSpace;
  currUnusedSpace += dirSize;
  if (currUnusedSpace >= neededUnusedSpace) {
    console.log("Part 2 soln:", dirSize);
    break;
  }
}
