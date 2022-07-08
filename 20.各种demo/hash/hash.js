const path = require('path')
const fs = require('fs')
const crypto = require("crypto")
const content = fs.readFileSync(path.resolve(__dirname, '../a.js'), 'utf-8')
const hash = crypto.createHash("sha1").update(content).digest("hex")

console.log(hash)