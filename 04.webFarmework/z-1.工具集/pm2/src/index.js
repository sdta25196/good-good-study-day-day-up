let express = require('express')
let path = require('path')
let fs = require('fs')

const app = express()

const port = 3011

app.get('/', (req, res) => {
  // let content = fs.readFileSync(path.resolve(__dirname, 'index.html'))
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})