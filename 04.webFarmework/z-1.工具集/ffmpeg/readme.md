## FFmpeg

A complete, cross-platform solution to record, convert and stream audio and video.

一个完整的、跨平台的解决方案，记录、转换音频和视频

## 安装

[win安装地址](https://www.gyan.dev/ffmpeg/builds/)，下载安装包解压后，配置 环境变量-用户变量 指向解压后的`bin`目录，然后测试`ffmpeg -version` 命令，确认安装成功即可。

> 环境变量设置方法：右键我的电脑 -> 属性 -> 高级系统设置 -> 环境变量。在`用户变量`区域选择`Path`，点击编辑按钮，在其原始内容后输入ffmpeg的bin路径，例如`D:\ffmpeg-4.2.2-win64-static\bin`。

## FFmpeg的使用格式

FFmpeg 的命令行参数非常多，可以分成五个部分。

> ffmpeg {1} {2} -i {3} {4} {5}

上面命令中，五个部分的参数依次如下。

1. 全局参数
2. 输入文件参数
3. 输入文件
4. 输出文件参数
5. 输出文件

参数太多的时候，为了便于查看，ffmpeg 命令可以写成多行。

```shell
  ffmpeg \
  [全局参数] \
  [输入文件参数] \
  -i [输入文件] \
  [输出文件参数] \
  [输出文件]
```

下面是一个例子:

```shell
  ffmpeg \
  -y \ # 全局参数
  -c:a libfdk_aac -c:v libx264 \ # 输入文件参数
  -i input.mp4 \ # 输入文件
  -c:v libvpx-vp9 -c:a libvorbis \ # 输出文件参数
  output.webm # 输出文件
```

上面的命令将 mp4 文件转成 webm 文件，这两个都是容器格式。输入的 mp4 文件的音频编码格式是 aac，视频编码格式是 H.264；输出的 webm 文件的视频编码格式是 VP9，音频格式是 Vorbis。

如果不指明编码格式，FFmpeg 会自己判断输入文件的编码。因此，上面的命令可以简单写成下面的样子。

`ffmpeg -i input.avi output.mp4`

## 常用参数

* -c：指定编码器
* -c copy：直接复制，不经过重新编码（这样比较快）
* -c:v：指定视频编码器
* -c:a：指定音频编码器
* -i：指定输入文件
* -an：去除音频流
* -vn： 去除视频流
* -preset：指定输出的视频质量，会影响文件的生成速度，有以下几个可用的值 ultrafast, superfast, veryfast, faster, fast, medium, * slow, slower, veryslow。
* -y：不经过确认，输出时直接覆盖同名文件。

## 用法


**查看文件信息**

查看视频文件的元信息，比如编码格式和比特率，可以只使用-i参数。

`ffmpeg -i input.mp4`

上面命令会输出很多冗余信息，加上-hide_banner参数，可以只显示元信息。

`ffmpeg -i input.mp4 -hide_banner`

**转换编码格式**

转换编码格式（transcoding）指的是， 将视频文件从一种编码转成另一种编码。比如转成 H.264 编码，一般使用编码器libx264，所以只需指定输出文件的视频编码器即可。


`ffmpeg -i [input.file] -c:v libx264 output.mp4`

下面是转成 H.265 编码的写法。

`ffmpeg -i [input.file] -c:v libx265 output.mp4`

**转换容器格式**

转换容器格式（transmuxing）指的是，将视频文件从一种容器转到另一种容器。下面是 mp4 转 webm 的写法。

`ffmpeg -i input.mp4 -c copy output.webm`

上面例子中，只是转一下容器，内部的编码格式不变，所以使用-c copy指定直接拷贝，不经过转码，这样比较快。

**调整码率**

调整码率（transrating）指的是，改变编码的比特率，一般用来将视频文件的体积变小。下面的例子指定码率最小为964K，最大为3856K，缓冲区大小为 2000K。

```shell
  ffmpeg \
  -i input.mp4 \
  -minrate 964K -maxrate 3856K -bufsize 2000K \
  output.mp4
```

**改变分辨率**

下面是改变视频分辨率（transsizing）的例子，从 1080p 转为 480p 。

```shell
  ffmpeg \
  -i input.mp4 \
  -vf scale=480:-1 \
  output.mp4
```

**提取音频**

有时，需要从视频里面提取音频（demuxing），可以像下面这样写。

```shell
  ffmpeg \
  -i input.mp4 \
  -vn -c:a copy \
  output.aac
```
上面例子中，-vn表示去掉视频，-c:a copy表示不改变音频编码，直接拷贝。

**添加音轨**

添加音轨（muxing）指的是，将外部音频加入视频，比如添加背景音乐或旁白。

```shell
  ffmpeg \
  -i input.aac -i input.mp4 \
  output.mp4
```
上面例子中，有音频和视频两个输入文件，FFmpeg 会将它们合成为一个文件。

**截图**

下面的例子是从指定时间开始，连续对1秒钟的视频进行截图。

```shell
  ffmpeg \
  -y \
  -i input.mp4 \
  -ss 00:01:24 -t 00:00:01 \
  output_%3d.jpg
```

如果只需要截一张图，可以指定只截取一帧。

```shell
  ffmpeg \
  -ss 01:23:45 \
  -i input \
  -vframes 1 -q:v 2 \
  output.jpg
```
上面例子中，-vframes 1指定只截取一帧，-q:v 2表示输出的图片质量，一般是1到5之间（1 为质量最高）。

**裁剪**

裁剪（cutting）指的是，截取原始视频里面的一个片段，输出为一个新视频。可以指定开始时间（start）和持续时间（duration），也可以指定结束时间（end）。

`ffmpeg -ss [start] -i [input] -t [duration] -c copy [output]`

`ffmpeg -ss [start] -i [input] -to [end] -c copy [output]`

下面是实际的例子

`ffmpeg -ss 00:01:50 -i [input] -t 10.5 -c copy [output]`

`ffmpeg -ss 2.5 -i [input] -to 10 -c copy [output]`

上面例子中，-c copy表示不改变音频和视频的编码格式，直接拷贝，这样会快很多。

**为音频添加封面**

有些视频网站只允许上传视频文件。如果要上传音频文件，必须为音频添加封面，将其转为视频，然后上传。

下面命令可以将音频文件，转为带封面的视频文件。

```shell
  ffmpeg \
  -loop 1 \
  -i cover.jpg -i input.mp3 \
  -c:v libx264 -c:a aac -b:a 192k -shortest \
  output.mp4
```

上面命令中，有两个输入文件，一个是封面图片cover.jpg，另一个是音频文件input.mp3。-loop 1参数表示图片无限循环，-shortest参数表示音频文件结束，输出视频就结束。

**ffmpeg下载m3u8**

设置 referer

`-headers "referer: https://www.kaoyan.cn/" ` 

设置ua

`-user_agent "Mozilla/5.0 (Macintosh; Intel M ac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"` 

设置m3u8地址

`-i "https://cloudvideo.kaoyan.cn/99deab72vodtransgzp1252645828/dcc49b6c3270835010019251116/voddrm.token.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9~eyJ0eXBlIjoiRHJtVG9rZW4iLCJhcHBJZCI6MTI1MjY0NTgyOCwiZmlsZUlkIjoiMzI3MDgzNTAxMDAxOTI1MTExNiIsImN1cnJlbnRUaW1lU3RhbXAiOjAsImV4cGlyZVRpbWVTdGFtcCI6MjE0NzQ4MzY0NywicmFuZG9tIjowLCJvdmVybGF5S2V5IjoiIiwib3ZlcmxheUl2IjoiIiwiY2lwaGVyZWRPdmVybGF5S2V5IjoiIiwiY2lwaGVyZWRPdmVybGF5SXYiOiIiLCJrZXlJZCI6MCwic3RyaWN0TW9kZSI6MCwicGVyc2lzdGVudCI6IiIsInJlbnRhbER1cmF0aW9uIjowLCJmb3JjZUwxVHJhY2tUeXBlcyI6bnVsbH0~ApSBsErb-_HuL36CArqB3PZ0qEiZQyRhDtxR-epz51U.video_12_3.m3u8?rlimit=3&sign=044c06f1eef0d0ce811a85346bb532d6&t=64ca0a2c&us=dedce918ed"`

设置不转码

`-c copy`

设置输出路径

`test.mp4`

完整命令如下：

```shell
ffmpeg -headers "referer: https://www.kaoyan.cn/" -user_agent "Mozilla/5.0 (Macintosh; Intel M ac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36" -i "https://cloudvideo.kaoyan.cn/99deab72vodtransgzp1252645828/dcc49b6c3270835010019251116/voddrm.token.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9~eyJ0eXBlIjoiRHJtVG9rZW4iLCJhcHBJZCI6MTI1MjY0NTgyOCwiZmlsZUlkIjoiMzI3MDgzNTAxMDAxOTI1MTExNiIsImN1cnJlbnRUaW1lU3RhbXAiOjAsImV4cGlyZVRpbWVTdGFtcCI6MjE0NzQ4MzY0NywicmFuZG9tIjowLCJvdmVybGF5S2V5IjoiIiwib3ZlcmxheUl2IjoiIiwiY2lwaGVyZWRPdmVybGF5S2V5IjoiIiwiY2lwaGVyZWRPdmVybGF5SXYiOiIiLCJrZXlJZCI6MCwic3RyaWN0TW9kZSI6MCwicGVyc2lzdGVudCI6IiIsInJlbnRhbER1cmF0aW9uIjowLCJmb3JjZUwxVHJhY2tUeXBlcyI6bnVsbH0~ApSBsErb-_HuL36CArqB3PZ0qEiZQyRhDtxR-epz51U.video_12_3.m3u8?rlimit=3&sign=044c06f1eef0d0ce811a85346bb532d6&t=64ca0a2c&us=dedce918ed" -c copy test.mp4
```

## ffmpeg-wasm

ffmpeg官方提供了wasm文件，可以使我们在web端也使用这个能力。

[ffmpegwasm文档](https://ffmpegwasm.netlify.app/docs/overview)

在web端使用ffmpeg的优势：

* 安全性: 用户的数据只存在于他们的浏览器中，无需担心任何数据泄漏或网络延迟。
* 客户端计算: 现在可以将多媒体处理卸载到客户端，而不是托管服务器端服务器集群。
* 灵活: ffmpegWasm具有单线程和多线程内核，可以使用适合我们用例的任何一个。

## 更多 

* [win安装地址](https://www.gyan.dev/ffmpeg/builds/)

* [ffmpeg-wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)

