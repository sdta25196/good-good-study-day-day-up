import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('666')
})

app.listen(3100, () => {
  console.log('启动服务3100')
})

