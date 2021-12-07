import path from 'path'
import fs, { writeFile, writeFileSync } from 'fs'
import {readFile} from 'fs/promises'


// 同步版本
// const content = fs.readFileSync(path.resolve(__dirname, "path.ts"), "utf8")

// 异步版本
// fs.readFile(path.resolve(__dirname, "path.ts"), "utf8", (err, data) => {
//   console.log(data)
// })

// 二进制读取
//  const buffer = fs.readFileSync(path.resolve(__dirname, "path.ts"))
//  console.log(buffer.toString("utf8"))

// Promise版本
// async function run(){
//   const content = await readFile(path.resolve(__dirname, "path.ts"), "utf8")
//   console.log(content)
// }
// run()

// writeFileSync(path.resolve(__dirname, 'a.log'), "hello world!!!!", "utf8")

// for(let i = 0; i < 100000; i++) {
//   fs.appendFileSync(path.resolve(__dirname, "a.log"), "hello world!", 'utf8')
// }

// 读取流
// const fin = fs.createReadStream(path.resolve(__dirname, 'a.log'), "utf8")


// fin.on("readable", () => {

//   let data 
//   while(data = fin.read()) {
//     console.log("read:", data)
//   }
// })

// 写入流
// const fout = fs.createWriteStream(path.resolve(__dirname, "b.log"), "utf8")
// fout.write("1\n")
// fout.write("2\n")
// fout.write("3\n")
// fout.pipe(fin)



