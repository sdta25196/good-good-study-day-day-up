### 搭建webpack项目
  * "autoprefixer": "^10.2.6",  // css前缀补全，需要搭配package.json中的browserslist
  * "css-loader": "^4.3.0",     // css处理器
  * "cssnano": "^5.0.6",        // css压缩
  * "html-webpack-plugin": "^4.5.2", // html自动生成
  * "less": "^4.1.1",                // less
  * "less-loader": "^4.1.0",         // less处理器
  * "mini-css-extract-plugin": "^1.3.9", // css抽离文件，与style-loader二选一
  * "postcss": "^8.3.2",                 // css相关处理器的使用
  * "postcss-loader": "^4.2.0",          // css相关处理器的使用,使用这个才能使用autoprefixer\cssnano等,需要配置postcss.config.js  
  * "style-loader": "^2.0.0",    // style元素生成器
  * "webpack": "^4.43.0",       // webpack
  * "webpack-cli": "^3.3.12"     // webpack-cli