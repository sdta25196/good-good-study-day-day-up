// ssr相关配置
require('@babel/register')({
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    [
      "@babel/preset-react",
    ]
  ]
});

const express = require('express')
const path = require('path')
const fs = require('fs')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { default: App } = require('./App');
const { default: SSR } = require('./SSR');

const app = express()
app.use('/static', express.static(path.resolve(__dirname, '../build')))

app.get('*', (req, res) => {
  let str = fs.readFileSync(path.resolve(__dirname, "../index.html"), 'utf-8')
  if (req.query.ssr) {
    if (req.path === '/ssr') {
      str = str.replace("{{ssr}}", ReactDOMServer.renderToString(React.createElement(SSR, {})))
      res.send(str)
    }
    if (req.path === '/') {
      str = str.replace("{{ssr}}", ReactDOMServer.renderToString(React.createElement(App, {})))
      res.send(str)
    }

  } else {
    res.send(str)
  }
})

const port = process.env.PORT || 3003

app.listen(port, () => {
  console.log(`listen @${port}`)
})
