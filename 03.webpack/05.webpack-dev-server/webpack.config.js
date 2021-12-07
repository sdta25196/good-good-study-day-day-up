// webpack的配置文件
const path = require("path")
const htmlPlugin = require("html-webpack-plugin")
module.exports = {
  entry: {
    main: "./src/index.js",
  }, // 入口
  output: { //出口
    filename: "js/[name].js", //出口文件名 
    path: path.resolve(__dirname, "./dist"), //出口文件夹路径
  },
  mode: "development",
  module: {
    rules: [
    ]
  },
  plugins: [
    new htmlPlugin({
      template: "./src/index.html",
      filename: "index.html"
    })
  ],
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 3000
  }
}