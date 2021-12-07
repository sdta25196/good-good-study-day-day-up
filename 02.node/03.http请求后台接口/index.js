const http = require('http')
const https = require('https')
const fs = require("fs")
const querystring = require('querystring')

http.createServer((req, res) => {
  const { url } = req;
  if (url === "/") {
    fs.readFile(`www/index.html`, (err, data) => {
      res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8',
      })
      res.end(data)
    })
  }
  if (url === "/getinfo") {
    const options = new URL('https://static-gkcx.eol.cn/www/2.0/json/operate/pc/11/65.json');
    // 请求后台数据
    const req1 = https.request(options, res1 => {
      console.log(`状态码: ${res1.statusCode}`)
      res1.on('data', data => {
        // console.log(JSON.parse(data.toString(), null, 2));
        // let r = JSON.parse(data.toString());
        // console.log(r.data.img["1"].img_mess[0].img_title1);
        // let c = r.data.img["1"].img_mess[0].img_title1;
        res.writeHead(200, {
          // 'Content-Type': 'text/plain;charset=utf-8',
          'Content-Type': 'application/json',
        })
        res.end(data.toString())
      })
    })
    req1.on('error', error => {
      console.error(error)
    })
    req1.end()
  }
  if (url.startsWith("/getReq")) {
    let s = new URL(url, "http://localhost:3000/")
    console.log(s.searchParams.get("str"));
  }
  if (url.startsWith("/postReq")) {
    let arr = []
    req.on('data', buffer => {
      arr.push(buffer);	//创建一个数组，把每次传递过来的数据保存
    });

    req.on('end', () => {
      let buf = Buffer.concat(arr);	//使用concat把数据连接起来
      let c = querystring.parse(buf.toString())
      console.log(c);
      res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8',
      })
      res.end("我收到了这个参数：" + buf.toString())
    })
  }
}).listen(3000, () => {
  console.log("服务启动 http://localhost:3000");
})