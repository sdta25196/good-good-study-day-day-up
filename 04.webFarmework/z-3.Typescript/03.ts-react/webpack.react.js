const path = require("path");
const htmlwebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: {
    index: "./src/ReactHello.tsx"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 3020
  },
  plugins: [
    new htmlwebpackPlugin({
      template: path.resolve(__dirname, "template.html")
    })
  ]
}