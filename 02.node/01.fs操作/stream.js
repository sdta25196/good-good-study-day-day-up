const fs = require("fs")
const rs = fs.ReadStream("./aaa123.js")
const ws = fs.WriteStream("./aaa123 copy.js")
rs.pipe(ws)