const fs = require("fs");
let data = fs.readFileSync("./test.txt")
console.log(data);
console.log(data.toString());
fs.readFile("./test.txt",(err,data)=>{
  console.log(data);
  console.log(data.toString());
})