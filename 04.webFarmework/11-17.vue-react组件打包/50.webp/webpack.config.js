const path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin'); // webpack打包时，提供html

module.exports = {
  entry: "./src/app.jsx",
  mode: "production",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // library: 'MyComponent',
    // libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, //jsx交给babel-loader去做
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              "@babel/preset-env",
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']//表示在import 文件时文件后缀名可以不写
  },
  plugins: [
    // 配置 打包时使用index.html作为模板打包，会把script标签直接打进去
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ],
  // 启动运行时服务
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
}