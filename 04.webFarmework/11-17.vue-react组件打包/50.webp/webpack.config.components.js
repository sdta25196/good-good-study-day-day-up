const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

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
    path: path.resolve(__dirname, 'components'),
    library: {
      // name: 'MyComponent',
      // type: 'umd',
      type: 'amd-require',
    },
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
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
}