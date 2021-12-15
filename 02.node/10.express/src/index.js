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

app.get('/', (req, res) => {
  res.send('nb 我的哥')
})


app.listen(3003, () => {
  console.log(`listen http://localhost:${3003}`)
})
