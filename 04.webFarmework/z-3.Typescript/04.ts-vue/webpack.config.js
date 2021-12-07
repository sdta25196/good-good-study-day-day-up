const path = require("path");
module.exports = {
  entry: {
    index: "./src/index.ts"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']//表示在import 文件时文件后缀名可以不写
  },
  output: {
    filename: "bundle.[name].js",
    path: path.resolve(__dirname, "dist")
  }
}