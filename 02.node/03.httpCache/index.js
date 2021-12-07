updateTime = () => {
  this.timer = this.timer || setInterval(() => {
    this.time = new Date().toLocaleString();
  }, 1000)
  return this.time;
}

const http = require("http")
http.createServer((req, res) => {
  const { url } = req;
  if (url === "/") {
    res.end(`
    <html>
    HTML upDate tiem : ${updateTime()}
    <script src="main.js"></script>
    </html>
    `)
  } else if (url === "/main.js") {
    const content = `document.write("<br/> JS upDate tiem : ${updateTime()}")`
    // http 1.0 强制缓存方案，单位毫秒，如果客户端与服务端时间不一致就会出BUG
    res.setHeader("Expires", new Date(Date.now() + 10 * 1000).toUTCString())
    // http 1.1 强制缓存方案，与协商缓存 谁大听谁的，会覆盖Expires,单位秒
    res.setHeader("Cache-Control", "max-age=5")

    // http 1.1 协商缓存 - 文件最终修改时间
    // res.setHeader("Cache-Control", "no-cache")
    // res.setHeader("last-modified", new Date().toUTCString())
    // if (new Date(req.headers['if-modified-since']).getTime() + 3000 > Date.now()) {
    //   res.statusCode = 304
    //   res.end()
    //   return
    // }
    // http 1.1 协商缓存 - 文件内容概览hash对比
    // res.setHeader("Cache-Control", "no-cache")
    // const crypto = require("crypto")
    // const hash = crypto.createHash("sha1").update(content).digest("hex");
    // res.setHeader("Etag", hash)
    // if (req.headers["if-none-match"] === hash) {
    //   res.statusCode = 304
    //   res.end()
    //   return
    // }


    // 响应请求
    res.statusCode = 200
    res.end(content)
  } else if (url == "/favicon.ico") { res.end("") }
}).listen(3000, () => {
  console.log("http server run at http://localhost:3000");
})