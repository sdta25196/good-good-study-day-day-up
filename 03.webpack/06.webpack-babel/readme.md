# babel
  > yarn add babel-loader @babel/core -D
  * webpack配置文件新增loader
  ```js
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets:[  
                // 预设使用env方式处理语法。需要package.json配置目标浏览器browserslist
                "@babel/preset-env"
              ]
            }
          }
        }
      ]
    }
  ```
### presets(预设)
  * env
    > 原生js语法转化的处理
  * flow
    > flow支持的语法转化 flow to js
  * react
    > react支持的语法转化 react to js
  * typescript
    > typescript支持的语法转化 ts to js
### polyfill(垫片,生产依赖)
  > yarn add @babel/polyfill 
  > 用来处理js新特性的兼容问题
  * 在入口文件使用``` import '@babel/polyfill' ```
  #### polyfill按需加载
    > presets写法修改为数据的方式 新增useBuiltIns属性，如下：
    * entry 需要在入口文件引入一次import '@babel/polyfill'
    * usage 不需要import，全自动检测
    * false(默认),不会按需加载
    ```
      // wenpack配置文件
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: "babel-loader",
              options: {
                presets:[  
                  [
                    "@babel/preset-env",
                    {
                      targets: { //设置目标浏览器，不设置会使用package.json中的浏览器集合配置
                        edge: "17",
                        chrome: "67",
                      },
                      corejs: 2, //polyfill核心版本库
                      // entry 需要在入口文件引入一次import '@babel/polyfill'
                      // usage 不需要import，全自动检测
                      // false(默认),不会按需加载
                      useBuiltIns: "usage" 
                    }
                  ]
                ]
              }
            }
          }
        ]
      }
    ```
### 使用.babelrc 文件
  根目录下新建.babelrc文件 把babel配置放进去即可
  ```js
    // .babelrc
    {
      "presets":[  
        [
          "@babel/preset-env",
          {
            "targets": { //设置目标浏览器，不设置会使用package.json中的浏览器集合配置
              "edge": "17",
              "chrome": "67",
            },
            "corejs": 2, //polyfill核心版本库
            // entry 需要在入口文件引入一次import '@babel/polyfill'
            // usage 不需要import，全自动检测
            // false(默认),不会按需加载
            "useBuiltIns": "usage" 
          }
        ]
      ]
    }
  ```
  ```js
    // webpack.config.js
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader"
        }
      ]
    },
  ```