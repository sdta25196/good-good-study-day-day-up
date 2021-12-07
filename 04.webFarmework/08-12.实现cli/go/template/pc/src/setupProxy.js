const { createProxyMiddleware } = require('http-proxy-middleware')
const proxys = require('./axios/eolApiDomain')
module.exports = function (app) {
  for (let [_, proxy] of Object.entries(proxys)) {
    app.use(
      createProxyMiddleware(proxy, {
        target: `http:/${proxy}`,
        // target: proxy.startsWith("/api.") ? `http:/${proxy}` : `https:/${proxy}`,
        secure: false,
        changeOrigin: true,
        pathRewrite: (path, _) => path.replace(proxy, '')
      })
    )
  }
}