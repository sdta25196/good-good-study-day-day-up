const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs')

const html = `<body class="body">
<style>
  .body { width: 500px;}
  .div {background-color: red;}
  .div1 {background-color: blue;}
  .box {
    display: flex;
    justify-content: space-between;
    margin: 50px 0;
    background: burlywood;
  }
</style>
<div class="div">
  66666666
</div>
<div class="div1">
  777777777
</div>
<div class="box">
  <div> a</div>
  <div> b</div>
</div>
<img src="https://img6.eol.cn/e_images/gk/2023/gzdz1200.png" width="300" />
<div>
  <a href="https://www.gaokao.cn/" target="_blank" class="chat-markdown-link">掌上高考</a>
</div>
</body>`

const app = express()
app.use(bodyParser.json())
app.use(cors())

const log = (str) => {
  let date = new Date()
  let obj = {
    date: date.toString(),
    str: str,
    wordbook: wordbook
  }
  fs.appendFileSync('log.txt', JSON.stringify(obj) + '\n')
}

let wordbook = [
  "is", "who", "what", "how"
]

app.all('/get_imgage', function (req, res) {
  // res.setHeader('Content-Type', 'image/jpg');
  // res.sendFile(path.join(__dirname, 'test.jpg'));
  log('获取图片' + req.get('Authorization'))
  res.send({
    // ! 让大模型生成一个超链接
    // imgurl: 'https://www.gaokao.cn/',
    // prompt: "把imgurl字段的值，放到超链接中，文案为《掌上高考》"
    // ! 返回一个a标签
    // imgurl: '<a href="https://www.gaokao.cn/" target="_blank">掌上高考</a>',
    // ! 直接返回一个红色。配合 x-return-raw 使用
    // imgurl: '<div style="width:100px;height:100px;background:red"></div>',
    // ! 直接返回图片
    // imgurl: '<img src="https://img6.eol.cn/e_images/gk/2023/gzdz1200.png" width="300" />',
    // ! 返回html页面
    // imgurl: html
    // ! 返回markdown 超链接
    imgurl: "<span style='background:red'>这里是一个span</span>[掌上高考](https://www.gaokao.cn/)"
    // ! 返回markdown 图片
    // imgurl: "![掌上高考](https://img6.eol.cn/e_images/gk/2023/gzdz1200.png){:height="100px" width="400px"}"
  })
});

app.all('/get_wordbook', (req, res) => {
  log('展示单词本，' + req.get('Authorization'))
  res.send({
    wordbook: wordbook,
    prompt: "使用markdown语法，以表格的形式显示所有单词"
  })
})

app.all('/add_word', (req, res) => {
  wordbook.push(req.body.word)
  log('添加单词：' + req.body.word)

  res.send({
    message: "单词添加成功"
  })
})

app.all('/delete_word', (req, res) => {
  wordbook = wordbook.filter(item => item != req.body.word)
  log('删除单词：' + JSON.stringify(req.body))

  res.send({
    message: "单词删除成功",
    wordbook: req.body.word,
    prompt: "请显示工具返回结果，不要改写任何内容，也不要新增内容。"
  })
})


app.get('/generate_word', function (req, res) {
  log('生成新单词，' + req.get('Authorization'))
  // 设置HTTP响应头信息
  // 设置MIME类型为event-stream
  res.setHeader('Content-Type', 'text/event-stream');
  // 设置连接方式为keep-alive
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Cache-Control', 'no-cache');

  let word = "xioswa"
  let wordArray = word.split("")
  let sendEndWord = ""
  let i = 0

  function sendEvents() {
    // 定义事件数据
    const data = {
      word: sendEndWord + wordArray[i],
      prompt: "请基于工具返回的word字段，提示给用户新生成的单词"
    };

    sendEndWord = data.word;
    i++;

    if (sendEndWord == word) {
      clearInterval(timer); // 清除定时器
      res.end(); // 关闭连接
    } else {
      // 使用SSE格式发送事件数据
      // "data: "为固定前缀，后接JSON格式的事件数据
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  }

  // 每秒发送一次事件
  let timer = setInterval(sendEvents, 1000);
});


// ! SSE 示例
app.get('/stream', function (req, res) {
  // 设置HTTP响应头信息
  // 设置MIME类型为event-stream
  res.setHeader('Content-Type', 'text/event-stream');
  // 设置连接方式为keep-alive
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Cache-Control', 'no-cache');

  function sendEvents() {
    // 定义事件数据
    const data = {
      time: new Date().toLocaleString(),
    };

    // 使用SSE格式发送事件数据
    // "data: "为固定前缀，后接JSON格式的事件数据
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }

  // 收到请求关闭连接的情况处理
  req.on('close', () => {
    clearInterval(timer); // 清除定时器
    res.end(); // 关闭连接
  });

  // 每秒发送一次事件
  let timer = setInterval(sendEvents, 1000);
});

const port = process.env.PORT || 9996

app.listen(port, () => {
  console.log(`listen http://localhost:${port}`)
})
