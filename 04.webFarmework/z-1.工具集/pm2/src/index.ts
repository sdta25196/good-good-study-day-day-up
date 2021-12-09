import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express()

const port = 3011

app.get('/', (req, res) => {
  // let content = fs.readFileSync(path.resolve(__dirname, 'index.html'))
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})