const http = require("http")
const fs = require("fs")

const server = http.createServer((req, res) => {
  const { url, method, headers } = req
  if (url == "/" && method == "GET") {
    console.log(process.env.NODE_ENV);
    fs.readFile("test.html", (err, stats) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain;charset=utf-8"
        })
        res.end("500，错错错")
      }
      res.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8"
      })
      res.end(stats)
    })
    // } else if (headers.accept.indexOf("image/*") !== -1) { //处理图片
    //   fs.createReadStream("." + url).pipe(res)
  }
  if (url == "/closeServer") {
    res.writeHead(200, {
      "Content-Type": "text/plain;charset=utf-8"
    })
    res.end(process.pid + "程序关闭")
    process.kill(process.pid, 'SIGTERM')
  }
})

server.listen(3001, () => {
  console.log("http server run at http://localhost:3001");
})
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('进程已终止')
  })
})