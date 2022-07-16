const express = require('express')
const path = require('path')
const fs = require('fs')
var cors = require('cors')

const app = express()
app.use(cors())

const rootPath = './public'
app.use(express.static(rootPath))

app.get('/download', function (req, res, next) {
  var name = "a.txt";// 待下载的文件名
  var f = fs.createReadStream('./public/' + name);
  res.writeHead(200, {
    'Content-Type': 'application/force-download',
    'Content-Disposition': 'attachment; filename=' + name
  });
  f.pipe(res);
});


app.get('*', (req, res) => {
  let str = fs.readFileSync(path.resolve(rootPath, "./index.html"), 'utf-8')
  res.send(str)
})

const port = process.env.PORT || 9999

app.listen(port, () => {
  console.log(`listen http://localhost:${port}`)
})
