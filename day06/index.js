const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString();

let chars = data.split("");

// pt 1
for (let i = 3; i < chars.length; i++) {
  const s = new Set(chars.slice(i - 3, i + 1));
  if (s.size === 4) {
    console.log(i + 1);
    break;
  }
}

// pt 2
for (let i = 13; i < chars.length; i++) {
  const s = new Set(chars.slice(i - 13, i + 1));
  if (s.size === 14) {
    console.log(i + 1);
    break;
  }
}
