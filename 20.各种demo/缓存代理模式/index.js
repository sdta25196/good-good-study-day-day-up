// async版本
function cacheProxy() {
  const cache = {}
  return async (key) => {
    if (key in cache) {
      return cache[key]
    } else {
      cache[key] = await fetch(key).then(res => res.json())
      return cache[key]
    }
  }
}

const cacheApi = cacheProxy()

const res = cacheApi("https://static-gkcx.eol.cn/www/2.0/json/coop/info.json")
res.then(e => {
  console.log(e)
})

// cacheApi("https://static-gkcx.eol.cn/www/2.0/json/coop/info.json")
// cacheApi("https://static-gkcx.eol.cn/www/2.0/json/operate/pc/34/65.json")
// cacheApi("https://static-gkcx.eol.cn/www/2.0/json/operate/pc/34/65.json")
// cacheApi("https://static-gkcx.eol.cn/www/2.0/json/operate/2/34/3.json")

// callback版本
function cacheProxy() {
  const cache = {}
  return (key, callback) => {
    if (key in cache) {
      callback(cache[key])
    } else {
      fetch(key).then(res => res.json()).then(res => {
        callback(cache[key] = res)
      })
    }
  }
}

const cacheApi = cacheProxy()

cacheApi("https://static-gkcx.eol.cn/www/2.0/json/coop/info.json", (e) => {
  console.log(e);
})
// cacheApi("https://static-gkcx.eol.cn/www/2.0/json/coop/info.json")
// cacheApi("https://static-gkcx.eol.cn/www/2.0/json/operate/pc/34/65.json")
// cacheApi("https://static-gkcx.eol.cn/www/2.0/json/operate/pc/34/65.json")
// cacheApi("https://static-gkcx.eol.cn/www/2.0/json/operate/2/34/3.json")
