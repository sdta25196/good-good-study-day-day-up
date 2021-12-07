// const http = require('http')
// const fs = require('fs')

// const server = http.createServer(function(req, res) {
//   fs.readFile(__dirname + '/data.txt', (err, data) => {
//     res.writeHead(200,{
//       "content-type": "text/plain;charset=utf-8"
//     })
//     res.end(data)
//   })
// })
// server.listen(3000)

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const { url } = req;
  console.log(process.env.NODE_ENV);
  // console.log(url);
  // console.log(__dirname);
  const stream = fs.createReadStream(__dirname + '/data.txt')
  res.writeHead(200, {
    "content-type": "text/plain;charset=utf-8"
  })
  if (url == "/333.png") {
    // throw new Error("是是是是")
    // console.log(stream);
  }
  stream.pipe(res)
})
server.listen(3000)