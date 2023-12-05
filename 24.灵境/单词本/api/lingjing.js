const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs')

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

app.all('/get_wordbook', (req, res) => {
  log('展示单词本')
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

const port = process.env.PORT || 9996

app.listen(port, () => {
  console.log(`listen http://localhost:${port}`)
})
