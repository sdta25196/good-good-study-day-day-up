const path = require('path')
const fs = require('fs')
const crypto = require("crypto") //使用crypto
const content = fs.readFileSync(path.resolve(__dirname, '../a.js'), 'utf-8') //读取a.js

const hash = crypto.createHash("sha1").update(content).digest("hex")


console.log(hash)