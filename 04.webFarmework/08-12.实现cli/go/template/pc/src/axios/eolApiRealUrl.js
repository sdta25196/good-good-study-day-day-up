import realUrl from './eolApi'
// 生产环境下，url添加 https://
// 如果是正式环境使用测试线，url添加 http://
function isProduction(url) {
  if (process.env.NODE_ENV !== "production") return url
  return process.env.REACT_APP_API_MODEL === "DEV" ? `http://${url}` : `https://${url}`
}

// 根据path获取真实url
function getRealUrl(path, params = []) {
  return isProduction(realUrl[path](params))
}

export default getRealUrl