const fs = require("fs")
try {
  // 删除一个文件
  fs.unlinkSync("aaa12.js")
} catch {

}
let source = `
  let a = 1;
  let b = 2;
  console.log(a+b);
`
// 写入一个文件
fs.writeFileSync("aaa123.js", source)

// 写入一个文件夹
fs.mkdir("aaa", (e) => {
  console.log(e);
})
// 删除一个文件夹，递归删除，包括内部文件
fs.rmdirSync("aaa", {
  recursive: true
})