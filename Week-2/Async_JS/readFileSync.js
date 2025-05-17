const fs = require("fs");

const contents = fs.readFileSync("Async_JS/a.txt", "utf-8");
console.log(contents);

const contents2 = fs.readFileSync("Async_JS/b.txt", "utf-8");
console.log(contents2);