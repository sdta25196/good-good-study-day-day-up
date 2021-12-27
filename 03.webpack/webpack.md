### entry
- 打包文件的入口，会以此入口文件开始，把相关联的文件全部打包
- 可以设置多个

### output
- 打包文件的输出路径

### loader 
- 写在module.rules中
- webpack自身只能处理js文件
- 使用各种各样的loader，可以让webpack能够打包各种其他的类型的文件

### plugins
- 写在plugins中
- 扩展webpack能力
- 压缩、HMR、等


### .npmrc文件,配置项目统一使用源
  ```js
    registry = https://registry.npm.taobao.org/
  ```
### webpack 环境搭建
  * 初始化 npm init -y
  * ```npm i webpack webpack-cli -D```  建议局部安装，全局安装会影响到不同项目间使用不同版本的webpack

### webpack 启动  
  > 4.x版本可以0配置启动,0配置的默认配置是入口src/index.js 出口是./dist/main
  * npx webpack 
  * npm run dev (在package.json中scripts字段里配置 "dev": "webpack")
### weboack 配置文件
  * 根目录中创建 webpack.config.js
    > 核心配置：entry、output、mode、loader、plugin、chunk、module、bundle
##### webpack 配置文件改名,自定义配置文件名
  > 自定义配置文件 叫做 xxx.config.js
  ```javascript
    webpack --config xxx.config.js
  ```
##### entry(入口)、output(出口)
  * 默认使用 ```./src/index.js```
  * 字符串形式,单一入口，通常单页面应用使用
    ```javascript
      {
        entry: "./src/index.js", //单一入口，单一出口
        output: { //出口
          filename: "main.js", 
          path: require("path").resolve(__dirname, "./dist")
        }
      }
    ```
  * 对象形式 ,可用在多页面应用，也可单一使用
    ```javascript
      {
        entry{
          main: "./src/index.js" //entry的key：main代表输出的文件名 是可以随便定义的，需要在output中对应使用[name]占位符
          main1: "./src/index1.js" //如果有多入口文件 就可以设置多可
        },
        output: { //出口
          //[name]占位符，以entry的key为准 
          //[hash]占位符，文件名后面拼hash值 [hash:n] 代表截取几位hash值
          filename: "[name]-[hash].js", 
          path: require("path").resolve(__dirname, "./dist")
        }
      }
    ```
##### mode(打包模式)
  * production 生产模式会使用内置插件进行压缩，会设置process.evn.NODE_ENV为production
  * development 开发模式会设置process.evn.NODE_ENV为development, 会明确chunks名称
  * none 啥也不干
  ```javascript
    {
      mode:"production" //development production none
    }
  ```
##### loader(扩展支持模块)
  > webpack默认支持js模块，使用loader来让webpack支持对应的模块文件
   ```javascript
    {
      // 配置css文件使用css-loader去处理 需要先安装 npm i css-loader -D
      // 配置style-loader 会根据js动态创建style标签把css-loader处理的css文件给html使用
      module:{
        rules:[
          {
            test:/\.css$/,
            // use:"css-loader", //单独使用css-loader，仅正确处理css文件
            use:[   //使用多个loader去处理一种类型文件，loader使用顺序为倒序
              "style-loader",
              "css-loader",
            ]
          }
        ]
      }
    }
  ```
##### plugin(插件,功能扩展)
  * npm i html-webpack-plugin -D 自动生成html的插件
   ```javascript
   const htmlPlugin = require("html-webpack-plugin")
    {
      module:{
      },
      plugins:[
        new htmlPlugin({  //使用html插件
          template: "./src/index.html",
          filename: "index.html",
          chunk:["index"]  //指定index.html引入哪个入口js(使用哪个代码块),
        }), 
        // 如果多页面应用 多次实例化插件即可
        new htmlPlugin({  //使用html插件
          template: "./src/test.html",
          filename: "test.html",
          chunk:["test"]  //指定index.html引入哪个入口js(使用哪个代码块),
        }) 
      ]
    }
  ```
##### module(模块)
##### chunk(代码块)
##### bundle
  > 通过webpack编译后生成的文件叫做bundle文件
  > dist目录中生成的文件都是bundle文件
##### bundle与chunk的关系
  入口文件由一个或多个模块组成，每个模块文件被编译成为chunk。多个依赖关系模块就成为了chunks。
  bundle文件中生成一个自执行函数，参数就是chunks。（以key-val的形式传入，每个chunk就是一个key-val）

##### 配置webpack使用的loader的路径
  ```
    resolveLoader: { 
      modules: ["node_modules", "../myloader/"] // 数组第一项给第三方loader使用，第二项可以放自定义的loader路径
    },
  ```
### 多页面打包通用方案
  * src下新建多目录，每个目录下有js.html有index.js(此为约定)
  * 使用函数去处理这些目录，在webpack配置中生成entry与html插件即可
  
### sourceMap 
  > 源代码与打包后代码的关系影射
  ```
    // webpack.config.js
    {
      // none 不开启。 inline-source-map map直接生成到文件内部 //source-map 单独生成map文件
      devtool: "source-map", 
    }

  ```

  
## 优化方案

  * bundle analysis 打包分析
    * [bundle analysis](https://github.com/webpack-contrib/webpack-bundle-analyzer)
  * code coverage 代码覆盖率
    * [google 官方文档](https://developers.google.com/web/updates/2017/04/devtools-release-notes)
    * [参考资料](https://blog.logrocket.com/using-the-chrome-devtools-new-code-coverage-feature-ca96c3dddcaf/)
  * magic comments 魔法注释
    * [webpack 魔法注释](https://webpack.js.org/api/module-methods/#magic-comments)
  * prefeching/preloading 预加载
    * [webpack 预加载](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules)
  * code splitting 代码分割
    * [webpack 代码分割](https://webpack.js.org/guides/code-splitting/)
    * [react 代码分割](https://reactjs.org/docs/code-splitting.html)
  * lazy loading 懒加载(按需加载)
    * [webpack 懒加载](https://webpack.js.org/guides/lazy-loading/)
    * [react 懒加载](https://reactjs.org/docs/code-splitting.html#reactlazy)
  * babel, babel-polyfill与babel-runtime
  * tree shaking 摇树, 或者叫剪枝
  * sourcemap 源码映射配置
    * [sourcemap配置](https://webpack.js.org/configuration/devtool/#devtool)


## webpack拆包，拆到多少算合适？
  拆包的目的一部分是按需加载，一部分是减少初始chunk的下载压力，单纯把一个大的包拆分成多个小包并不是最合理的，这里也要看http协议版本。
  http1的协议版本，有请求数量的队列限制（6个），http2\3 就没有了。是并行发送请求的。

  此外还有几个关键性的指标可以作为参考：
  * fcp 1.8s内
  * lcp2.8s内
  * fid 100ms
  * cls < 0.1

  google 提出的RAIL指标

  * Focus on the user. - 以用户为中心

  * Respond to user input in under 100 ms. - 100ms内响应用户输入

  * Produce a frame in under 10 ms when animating or scrolling. - 10ms内生成动画帧或滚动

  * Maximize main thread idle time. - 最大化空闲时间 （js任务50ms内）

  * Load interactive content in under 5000 ms. - 加载交互内容在5000毫秒以下。