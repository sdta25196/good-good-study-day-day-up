import {resolve} from 'path'
// 工作路径
console.log("cwd", process.cwd())


// 相对->绝对
console.log( resolve(process.cwd()) )
console.log( resolve("./package.json") )

// 当前文件所在的目录
console.log(__dirname)
console.log("01.ts", resolve(__dirname, "../basic/01.ts"))


// 改变工作路径
process.chdir(resolve(__dirname))