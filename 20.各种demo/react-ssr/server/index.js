import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { StaticRouter } from "react-router-dom"

import App from '../src/App'
const app = express()

app.use(express.static('public'))

app.get('*', (req, res) => {

  const content = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  )

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
