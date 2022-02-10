import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from '../src/App'
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {

  const Page = <App></App>

  const content = renderToString(Page)

  res.send(`
  <html>
    <head>
      <title>ssr</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="bundle.js"></script>
    </body>
  </html>
  `)
})

app.listen(3000, () => {
  console.log('start:ssr at 3000')
})
