import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  setTimeout(() => {

    res.send('666')
  }, 3000)
})

app.listen(3100, () => {
  console.log('启动服务3100')
})

