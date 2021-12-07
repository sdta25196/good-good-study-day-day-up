### http1.0 使用强制缓存 
  * expires 强制缓存，单位是毫秒，如果客户端跟服务端时间不一致的情况下，会出现bug，前台无法感知
  ```javascript
    // http 1.0 强制缓存方案，单位毫秒，如果客户端与服务端时间不一致就会出BUG
    res.setHeader("Expires", new Date(Date.now() + 10 * 1000).toUTCString())
  ```
### http1.1 使用强制缓存与协商缓存
  * max-age 强制缓存，单位秒，会覆盖expires, 与协商缓存间使用更大的一个，前台可感知
    ```javascript
      // http 1.1 强制缓存方案，与协商缓存 谁大听谁的，会覆盖Expires,单位秒
      res.setHeader("Cache-Control", "max-age=5")
    ```
  * last-modified 协商缓存 以后台设定的过期时间为准，前台无法感知
  ```javascript
      // http 1.1 协商缓存 - 文件最终修改时间
      res.setHeader("Cache-Control", "no-cache")
      res.setHeader("last-modified", new Date().toUTCString())
      if (new Date(req.headers['if-modified-since']).getTime() + 3000 > Date.now()) {
        res.statusCode = 304
        res.end()
        return
      }
    ```
  * Etag 协商缓存 以文件的最终修改时间为准，前台无法感知
    ```javascript
      // http 1.1 协商缓存 - 文件内容概览hash对比
      res.setHeader("Cache-Control", "no-cache")
      const crypto = require("crypto")
      const hash = crypto.createHash("sha1").update(content).digest("hex");
      res.setHeader("Etag", hash)
      if (req.headers["if-none-match"] === hash) {
        res.statusCode = 304
        res.end()
        return
      }
    ```