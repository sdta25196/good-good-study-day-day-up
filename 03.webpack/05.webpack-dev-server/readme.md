# webpack-dev-server
  > npm i webpack-dev-server@3 -D
  * 启动命令由```webpack```切换成```webpack-dev-server```
  * webpack配置文件添加
  ```
    devServer: {
      contentBase: "./dist",
      open: true,
      port: 3000
    }
  ```
# sourceMap
  * webpack配置文件 添加
  > // none 不开启。 inline-source-map map直接生成到文件内部 //source-map 单独生成map文件 其他看官网
  ```
    devtool: "source-map",
  ```