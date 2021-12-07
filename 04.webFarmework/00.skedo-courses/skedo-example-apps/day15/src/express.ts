import express from 'express'

const app = express()


app.get('/page/:id', (req, res) => {
  const id = req.params.id 
  res.send("success")
})

app.listen(3006, () => {
  console.log('success')
})