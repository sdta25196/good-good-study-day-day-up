# 文件切片上传下载demo

切片上传，可以实现断点续传，也可以使上传更快。

## 流程1

* 前端发送第一个文件，带有文件的 hash（md5标识），全部的切片数量，第一片切片。
* 后端收到请求，使用 hash 去验证文件是否存在，以及已经保存的切片数量。返回对应的响应，通知前端。
  * 如果已经保存了全部切片，就可以执行合并切片的操作了。
* 前端收到第一个请求的响应后，根据返回的信息进行后续的推送。
  * 如果响应为完成，则结束。

## 流程2 - 此demo实现方式

* 前端分片，直接发送并发把所有的切片发送给后端
* 待全部请求完成后发送合并请求 - 包含每个文件的hash, 方便后端验证文件是否存在。

