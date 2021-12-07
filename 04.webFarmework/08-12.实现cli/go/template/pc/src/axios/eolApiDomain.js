// 处理ie浏览器请求多个/问题
function handlerProduction(url) {
  if (process.env.NODE_ENV === "development") {
    url = '/' + url
  }
  return url
}
const dev = {
  uriPath: 'api-zhijiao-52-dev/api',
  api: handlerProduction('api.42.dev.eol.com.cn/web/api'), //测试线api平台
  staticZj: handlerProduction('static-zhijiao.52.dev.eol.com.cn'), //静态资源
}

const release = {
}


module.exports = process.env.REACT_APP_API_MODEL === "DEV" ? dev : release
