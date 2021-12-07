const path = require("path")

module.exports = {
  entry: {
    index: "./src/index.js",
    index2: "./src/index2.js"
  }, // 入口
  output: { //出口
    filename: "[name].js", //出口文件名 
    path: path.resolve(__dirname, "./dist") //出口文件夹路径
  }
}