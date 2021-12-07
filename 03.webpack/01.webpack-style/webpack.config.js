// webpack的配置文件
const path = require("path")
const cssExtract = require("mini-css-extract-plugin")
const htmlPlugin = require("html-webpack-plugin")
module.exports = {
  entry: {
    main: "./src/index.js",
  }, // 入口
  output: { //出口
    filename: "[name].js", //出口文件名 
    path: path.resolve(__dirname, "./dist"), //出口文件夹路径
    // publicPath: "https://www.baidu.com"  // 打包出的文件被引用时的前缀路径
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ]
      },
      {
        test: /\.less$/,
        use: [
          cssExtract.loader, //css抽离文件 使用插件自带的loader
          // "style-loader",   // 引入style的情况下 使用style-loader处理style标签
          "css-loader",     // 处理css
          "postcss-loader", // 样式的babel
          "less-loader",   //  处理less
        ]
      }
    ]
  },
  plugins: [
    new htmlPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }), //html模板
    new cssExtract({
      filename: "[name].css",
    }), //样式文件抽离
  ]
}