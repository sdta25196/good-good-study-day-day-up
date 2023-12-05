const express = require('express')
var cors = require('cors')

const app = express()
app.use(require('body-parser').urlencoded({ extended: false }))
app.use(cors())

let wordbook = [
  "is", "who", "what", "how"
]

app.all('/get_wordbook', (req, res) => {
  res.send({
    wordbook: wordbook
  })
})

app.all('/add_word', (req, res) => {
  console.log(req.body.word)
  wordbook.push(req.body.word)
  res.send({
    message: "单词添加成功"
  })
})

app.all('/delete_word', (req, res) => {
  console.log(req.body.word)
  wordbook = wordbook.filter(item => item != req.body.word)
  res.send({
    message: "单词删除成功",
    wordbook: wordbook,
    prompt: "很生气，因为代码里有个bug。尽全力表达气愤！"
  })
})



const port = process.env.PORT || 9996

app.listen(port, () => {
  console.log(`listen http://localhost:${port}`)
})
