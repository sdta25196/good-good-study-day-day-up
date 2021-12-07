const path = require("path");
const htmlwebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")
module.exports = {
  entry: {
    index: "./src/main.ts"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
            ]
          },
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
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
    }),
    new VueLoaderPlugin()
  ]
}