# 文档说明

## websocket连接

1. 连接地址需要后端提供，

下面是接口鉴权示例，需要引入`enc-base64-min.js` `hmac-sha256.js`
```js示例
const API_KEY = 'xxx'
const API_SECRET = 'xxx'
function getWebsocketUrl() {
  return new Promise((resolve, reject) => {
    var apiKey = API_KEY
    var apiSecret = API_SECRET
    var url = 'wss://tts-api.xfyun.cn/v2/tts'
    var host = location.host
    var date = new Date().toGMTString()
    var algorithm = 'hmac-sha256'
    var headers = 'host date request-line'
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/tts HTTP/1.1`
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
    var signature = CryptoJS.enc.Base64.stringify(signatureSha)
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
    var authorization = btoa(authorizationOrigin)
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
    resolve(url)
  })
}
```

## 兼容性

1. 流式接口需要浏览器支持websocket
2. 录音/播放需要浏览器支持webAudioAPI及相关API，兼容性请查看：https://www.caniuse.com/#search=Web%20Audio%20API
3. 本例中使用Blob+`<a download='xxx' href='xxx'></a>`这种方式下载，有兼容性问题，请自行考量
4. demo中使用了es6的语法，

## 数据格式转换

1. 了解[ArreyBuffer](http://es6.ruanyifeng.com/#docs/arraybuffer)

2. [代码](/data/transcode.js)


## 下载pcm/wav

1. 将音频数据转成16bit ArrayBuffer，命名为audioBuffer

2. 下载pcm
```
  let blob = new Blob([audioBuffer], {
    type: 'audio/pcm',
  })
  let defaultName = new Date().getTime()
  let node = document.createElement('a')
  node.href = window.URL.createObjectURL(blob)
  node.download = `${defaultName}.pcm`
  node.click()
  node.remove()
```
ps: `<a download='xxx' href='xxx'></a>`这种下载方式有兼容性问题，部分浏览器不支持，

3. 下载wav
  1. 将pcm的数据添加wav头，得到数据wavData
  2. 下载
  ```js
  let blob = new Blob([wavData], {
    type: 'audio/wav',
  })
  let defaultName = new Date().getTime()
  let node = document.createElement('a')
  node.href = window.URL.createObjectURL(blob)
  node.download = `${defaultName}.wav`
  node.click()
  node.remove()
  ```
  
4. [代码](/data/download.js)

## 浏览器播放音频流

1. base64解码，数据格式转换，升采样……，得到float 32bit的数组audioData

2. 创建音频处理环境
`let audioContext = new (window.AudioContext || window.webkitAudioContext)`

3. 创建空白AudioBuffer以便用于填充数据，
`let audioBuffer = audioContext.createBuffer(1, bufferLength, sampleRate)`

4. 向audioBuffer填充数据
```
  let nowBuffering = audioBuffer.getChannelData(0)
  if (audioBuffer.copyToChannel) {
    audioBuffer.copyToChannel(new Float32Array(audioData), 0, 0)
  } else {
    for (let i = 0; i < audioData.length; i++) {
      nowBuffering[i] = audioData[i]
    }
  }
```

5. 播放数据
```
  bufferSource = audioCtx.createBufferSource()
  bufferSource.buffer = audioBuffer
  bufferSource.connect(audioContext.destination)
  bufferSource.start()
```

6. 停止播放`bufferSource.stop()`

## 部署到服务器
1. 决定部署到服务器的文件夹。
如果是根目录直接运行第二步，
如果非根目录，如：test，请将build/config中的build.assetsPublicPath改为/test/，然后运行第二步
2. 打开cmd，进入demo目录，执行如下命令
 ```
 npm install
 npm run build
 ```
 3. 将第二步编译后的dist文件夹中的内容（非dist）复制到指定的文件夹
