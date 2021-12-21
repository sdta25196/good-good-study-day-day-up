const express = require('express')

const app = new express()

// @description : 处理跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/android', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendfile(require('path').resolve(__dirname, 'android.html'))
})
app.get('/ios', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendfile(require('path').resolve(__dirname, 'ios.html'))
})
app.get('/download', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendfile(require('path').resolve(__dirname, 'download.html'))
})

app.get('/file', (req, res) => {
  res.download(require('path').resolve(__dirname, 'VR播放器.apk'))
})

app.listen(3000, () => {
  console.log(`listen http://localhost:${3000}`)
})
