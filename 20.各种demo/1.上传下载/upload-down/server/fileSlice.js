const path = require('path')
const fs = require('fs')
const staticPath = path.resolve(__dirname, '../client/static/')

const name = 'a.txt'
// 判断该文件是否存在
const filePath = path.resolve(staticPath, name)
const file = fs.statSync(filePath)
console.log(file)