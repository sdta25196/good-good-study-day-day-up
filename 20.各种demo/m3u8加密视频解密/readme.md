## 运行
  打开 public\index.html

## 记录

* 下载视频的m3u8文件，在网络请求中找到即可
* 下载m3u8中所有的ts文件，在浏览器F12中确定ts文件地址。
* 下载m3u8文件中找到的`EXT-X-KEY`字段后面跟着的`URI`字段中的网络地址，把这个地址内容下载到本地，然后使用本地地址替换掉URI的网络内容
  * `URI="https://xxxx.xxx\v1"` => `URI="C:\\Users\\Administrator\\v1"`
* 使用video.js播放m3u8即可
* 需要使用跨域浏览器

index.html:

```html
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="https://unpkg.com/video.js/dist/video-js.min.css" rel="stylesheet">
  <script src="https://unpkg.com/video.js@8.3.0/dist/video.min.js"></script>
</head>

<body>
  <video id="my-video" width="320" height="240" controls>
    <source src="./voddrm.token.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9~eyJ0eXBlIjoiRHJ.m3u8" type="application/x-mpegURL">
    您的浏览器不支持 HTML5 video 标签。
  </video>

  <script>
    const player = videojs('my-video');
  </script>
</body>

</html>
```

下载文件代码:

```js
import fetch from 'cross-fetch'
import fs from 'fs'

let c = 'https://cloudvideo.kaoyan.cn/99deab72vodtransgzp1252645828/c05dc435243791580017482388/12_2_10.ts?rlimit=3&sign=a34a6ed791e87d6118a5036ecb2e08b4&t=6453b0c5&us=14bc84a027'

fetch(c).then(res => res.buffer()).then(res => {
  fs.writeFileSync('12_2_10.ts', res)
})
```


## 方法二

使用ffmpeg，参阅[我的博客](https://www.900t.cn) -> ffmpeg 文章