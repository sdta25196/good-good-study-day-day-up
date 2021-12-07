const path = require("path")
module.exports = {
  entry: {
    main: "./src/index.js",
  }, // 入口
  output: { //出口
    filename: "[name].js", //出口文件名 
    path: path.resolve(__dirname, "./dist"), //出口文件夹路径
  },
  mode: "development",
  resolveLoader: { //webpack使用的loader的路径
    modules: ["node_modules", "../"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          // loader: require("path").resolve(__dirname, "../replace-loader.js"),
          loader: "replace-loader",
          options: {
            name: "很猛"
          }
        }
      },
    ]
  },
}