const path = require('path')

/**
*
* @author : 田源
* @date : 2021-12-18 16:36
* @description : 用来给组件打包的webpack配置
*
*/
module.exports = {
  entry: "./src/index.jsx", // index.jsx是一个需要打包的组件
  mode: "production",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MyComponent',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
}